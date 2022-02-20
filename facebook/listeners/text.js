const sendMessage = require("../functions/message/send_text");
const mongoose = require("mongoose");
const Product = mongoose.model("product");
const Pages = mongoose.model("pages");
const Settings = mongoose.model("settings");
const Customer = mongoose.model("customer");
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
const checkName = require("../functions/check_name");

module.exports = async (senderID, messageText, pageID) => {
  const author = await getAuthor();
  const user = await getInfo(senderID);

  function requestName() {
    send(
      "You cannot place an order without your info. Please enter your name."
    );
    db.fullname.add(senderID);
  }

  function send(msg) {
    sendMessage(senderID, msg);
  }

  if (db.fullname.has(senderID)) {
    const isValidName = await checkName(messageText);
    const page = await Pages.findOne({ pageid: pageID });

    if (isValidName) {
      db.fullname.delete(senderID);
      const customer = new Customer({
        name: messageText,
        psid: senderID,
        page: page._id,
        pageid: pageID,
      });
      send(
        `Thanks ${messageText}, your info has been saved. Please place an order again.`
      );
      await customer.save();
      db.orders = db.orders
        .map((d, i) => (d.sender !== senderID ? d : null))
        .filter((o) => o);
      return sendHome(senderID, pageID);
    }
    return send(`I think you sent an invalid name. Please try again.`);
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
    const page = await Pages.findOne({ pageid: temp_db.page_id });
    const settings = await Settings.findOne({ author: page.author });

    const customer = await Customer.findOne({
      pageid: pageID,
      psid: senderID,
    });

    try {
      if (!customer.name) return requestName();
    } catch (error) {
      return requestName();
    }

    db.orders.forEach(async (s) => {
      if (s.sender === senderID) {
        const shippingFee = s.price * 0.07 >= 120 ? s.price * 0.07 : 120;

        const order = new Order({
          order_by: user.first_name
            ? `${user.first_name} ${user.last_name}`
            : customer.name,
          order_thread: senderID,
          price: s.price,
          product: s.product,
          product_description: s.description,
          product_image: s.image_url,
          contact: messageText,
          // image_url: user.profile_pic,
          author: author,
          pageid: temp_db.page_id,
          page_name: page.pagename,
          shipping_fee: shippingFee.toFixed(2),
        });

        await order.save();

        send(
          `Thank you! Your order has been listed, please wait for our call.`
        );

        try {
            if (settings.stripe_public) {
                send(
                    `If you wish to pay immediately for faster transaction.\n\nProceed to payment page: ${process.env.BASE_URL}/stripe/${temp_db.page_id}/${order._id}/${settings.stripe_public}`
                );
            }
        } catch (error) {
            console.log('Skipping stripe payment.');
        }

        try {
            if (settings.emails) smtpOrder(settings.emails, order);
        } catch (error) {
            console.log('Skipping emails notification');
        }
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

  if (
    messageText.toLowerCase() === "menu" ||
    messageText.toLowerCase() === "show menu"
  ) {
    sendHome(senderID, pageID);
  }

  const response = await Automated.find({
    $text: { $search: messageText },
    author: author,
  });

  if (response.length !== 0) {
    let resp = response[Math.floor(Math.random() * response.length)].response;

    const customer = await Customer.findOne({
      pageid: pageID,
      psid: senderID,
    });

    if (resp.includes("{name}")) {
      try {
        resp = resp.replace(
          "{name}",
          user.first_name
            ? `${user.first_name} ${user.last_name}`
            : customer.name
            ? customer.name
            : ""
        );
      } catch (error) {
        resp = resp.replace("{name}", "");
      }
    }

    if (resp.includes("{first_name}")) {
      resp = resp.replace("{first_name}", "");
    }
    if (resp.includes("{last_name}")) {
      resp = resp.replace("{last_name}", "");
    }

    send(resp);
  }
};
