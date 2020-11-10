const sendMessage = require("../functions/message/send_text");
const mongoose = require("mongoose");
const Product = mongoose.model("product");
const { db } = require("../temp_db");
const genericProducts = require("../functions/generic_products");
const Automated = require("../../models/automated");
const Order = require("../../models/orders");
const getInfo = require("../functions/get_info");
const getAuthor = require("../functions/page_author");

module.exports = async (senderID, messageText) => {
  const author = await getAuthor();
  function send(msg) {
    sendMessage(senderID, msg);
  }

  if (db.search.has(senderID)) {
    db.search.delete(senderID);
    // send("Please wait while im searching for " + messageText);
    const products = await Product.find({
      $text: { $search: messageText },
      author: author,
    });

    if (products.length <= 0) {
      return send(`Unfortunately I can't find ${messageText}.`);
    }

    genericProducts(senderID, products);
  }
  if (db.orders.some((s) => s.sender === senderID)) {
    const user = await getInfo(senderID);
    const { first_name, last_name, profile_pic } = user.data;

    db.orders.some(async (s) => {
      if (s.sender === senderID) {
        const order = await new Order({
          order_by: `${first_name} ${last_name}`,
          order_thread: senderID,
          price: s.price,
          product: s.product,
          product_description: s.description,
          product_image: s.image_url,
          contact: messageText,
          image_url: profile_pic,
          author: author,
        }).save();
        send(
          `Thank you ${first_name}. Your order has been listed, please wait for our call.`
        );
        send(`Your order ID is #${order._id}.`);
        // if (senderID === "3345390415537828") return;
        // sendMessage(
        //   "3345390415537828",
        //   `${first_name} ${last_name} wants to order ${s.product} for P${s.price}`
        // );
      }
    });

    // removing in array of orders
    db.orders = db.orders
      .map((d, i) => (d.sender !== senderID ? d : null))
      .filter((o) => o);
  }

  const question = await Automated.find({
    $text: { $search: messageText },
    author: author,
  });
  if (question.length !== 0)
    send(question[Math.floor(Math.random() * question.length)].response);
};