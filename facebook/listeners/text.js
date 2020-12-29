const sendMessage = require("../functions/message/send_text");
const mongoose = require("mongoose");
const Product = mongoose.model("product");
const Pages = mongoose.model("pages");
const Settings = mongoose.model("settings");
const { db, page_id } = require("../temp_db");
const temp_db = require("../temp_db");
const genericProducts = require("../functions/generic_products");
const Automated = require("../../models/automated");
const Order = require("../../models/orders");
const getInfo = require("../functions/get_info");
const getAuthor = require("../functions/page_author");
const getToken = require("../functions/page_token");
const smtpOrder = require("../../services/mailer/order");
const sendHome = require("../functions/generic_home");

module.exports = async (senderID, messageText) => {
  const author = await getAuthor();
  const user = await getInfo(senderID);
  //const { first_name, last_name, profile_pic } = user;

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
    console.log("======TEMP ORDERS", db.orders);
    const page = await Pages.findOne({ pageid: temp_db.page_id });
    const settings = await Settings.findOne({ author: page.author });
    console.log("======PAGE && SETTINGS VALUES", page, settings);
    db.orders.some(async (s) => {
      if (s.sender === senderID) {
        console.log("======THE CUSTOMER HAS ORDER IN TEMP_DB", s, senderID);
        const shippingFee = s.price * 0.07 >= 120 ? s.price * 0.07 : 120;

        const order = new Order({
          order_by: `${user.first_name} ${user.last_name}`,
          order_thread: senderID,
          price: s.price,
          product: s.product,
          product_description: s.description,
          product_image: s.image_url,
          contact: messageText,
          image_url: user.profile_pic,
          author: author,
          pageid: temp_db.page_id,
          page_name: page.pagename,
          shipping_fee: shippingFee.toFixed(2),
        });

        await order.save();

        console.log("======ORDER HAS BEEN SAVED TO DATABASE", order);
        send(
          `Thank you ${user.first_name}. Your order has been listed, please wait for our call.`
        );
        //send(`Your order ID is #${order._id}.`);
        if (settings.stripe_public) {
          send(
            `If you wish to pay immediately for faster transaction.\n\nProceed to payment page: ${process.env.BASE_URL}/stripe/${temp_db.page_id}/${order._id}/${settings.stripe_public}`
          );
        }
        if (settings.emails) smtpOrder(settings.emails, order);

        console.log("======END OF ORDER");
      }

      // removing in array of orders
      db.orders = db.orders
        .map((d, i) => (d.sender !== senderID ? d : null))
        .filter((o) => o);
    });
  }

  if (messageText === "DELETE PERSISTENT_MENU") {
    const token = await getToken();
    require("../functions/persistent_menu_delete")(token);
    send(`Persistent menu is deleted.`);
  }

  if (messageText === "menu" || messageText === "show menu") {
    sendHome(senderID);
  }

  const response = await Automated.find({
    $text: { $search: messageText },
    author: author,
  });

  if (response.length !== 0) {
    let resp = response[Math.floor(Math.random() * response.length)].response;
    if (resp.includes("{first_name}"))
      resp = resp.replace("{first_name}", user.first_name);
    if (resp.includes("{last_name}"))
      resp = resp.replace("{last_name}", user.last_name);
    send(resp);
  }
};
