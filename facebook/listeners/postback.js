const sendMessage = require("../functions/message/send_text");
const sendHome = require("../functions/generic_home");
const sendProducts = require("../functions/generic_products");
const mongoose = require("mongoose");
const Product = mongoose.model("product");
const { db } = require("../temp_db");
const getInfo = require("../functions/get_info");
const { getCategories, getProducts } = require("../controllers");
const getAuthor = require("../functions/page_author");
const persistentMenu = require("../functions/persistent_menu");

module.exports = async (senderID, payload) => {
  const categories = await getCategories();
  const user = await getInfo(senderID);
  const author = await getAuthor();
  const { first_name, last_name } = user.data;

  function send(msg) {
    sendMessage(senderID, msg);
  }

  if (payload === "Show Menu") {
    sendHome(senderID);
  }

  if (payload === "GET_STARTED_PAYLOAD") {
    persistentMenu(senderID);
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

    db.orders.push({
      sender: senderID,
      product: productName,
      price: price,
      image_url: image_url,
    });

    send(`Please send your phone so we can contact you.`);
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
        send(`Sorry no item on this category.`);
      }
    });
  } catch (error) {
    send(`Sorry no item on this category.`);
  }
};
