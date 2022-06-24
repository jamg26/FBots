const sendMessage = require("../functions/message/send_text");
const sendHome = require("../functions/generic_home");
const sendProducts = require("../functions/generic_products");
const mongoose = require("mongoose");
const Product = mongoose.model("product");
const { db } = require("../temp_db");
const { getCategories, getProducts } = require("../controllers");
const getAuthor = require("../functions/page_author");

module.exports = async (senderID, payload, pageID) => {
  const categories = await getCategories();
  const author = await getAuthor();

  function send(msg) {
    sendMessage(senderID, msg);
  }

  if (payload === "Show Menu") {
    sendHome(senderID, pageID);
  }

  if (payload === "GET_STARTED_PAYLOAD") {
    sendHome(senderID, pageID);
  }

  if (payload === "Search Product") {
    db.search.add(senderID);
    send("Please enter your desired product.");
  }

  if (payload === "SEARCH_PRODUCT") {
    db.search.add(senderID);
    send("Please enter your desired product.");
  }

  if (payload.includes("ORDER")) {
    const payload_data = payload.split("#");

    const productName = payload_data[1];
    const price = payload_data[2];
    const image_url = payload_data[3];
    const product_id = payload_data[4];

    const product = await Product.findById(product_id);
    if (product.enabled === false) {
        return send(`Sorry, this product is not available.`);
    }
    if(product.quantity <= 0) {
        return send(`Sorry, this product is out of stock.`);
    }

    // removing in array of orders
    db.orders = db.orders
      .map((d, i) => (d.sender !== senderID ? d : null))
      .filter((o) => o);
    db.orders.push({
      sender: senderID,
      product: productName,
      price: price,
      image_url: image_url,
      _id: product._id
    });

    send(
      `You are about to order ${productName}.\n\nType confirm or put your username to verify the order.`
    );
  }

  if (payload.includes("INFO")) {
    const description = payload.split("#")[1];
    send(description);
  }

  try {
    categories.forEach(async (cat) => {
      if (cat.name === payload) {
        const products = await Product.find({
          category: payload,
          author: author,
        });
        if (products.length !== 0) return sendProducts(senderID, products);
        send(`Sorry no item in this category.`);
      }
    });
  } catch (error) {
    send(`Sorry no item in this category.`);
  }
};
