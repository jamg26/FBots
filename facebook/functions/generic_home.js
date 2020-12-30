const callSendAPI = require("./message/call_send_api");
const sendMessage = require("../functions/message/send_text");
const { getProducts, getCategories } = require("../controllers");
const { db } = require("../temp_db");
const mongoose = require("mongoose");
const Customer = mongoose.model("customer");
const Page = mongoose.model("pages");
const getInfo = require("../functions/get_info");

module.exports = async (recipientId, pageID) => {
  function requestName() {
    send("Hello, please send your name to continue.");
    db.fullname.add(recipientId);
  }

  function send(msg) {
    sendMessage(recipientId, msg);
  }

  const categories = await getCategories();

  var messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: categories.map((cat) => {
            return {
              title: cat.name,
              subtitle: "Category",
              //item_url: "https://www.oculus.com/en-us/rift/",
              image_url: cat.image_url
                ? cat.image_url
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png",
              buttons: [
                {
                  type: "postback",
                  title: "show",
                  payload: cat.name,
                },
              ],
            };
          }),
        },
      },
    },
  };

  const user = await getInfo(recipientId);
  if (!user.first_name) {
    const page = await Page.findOne({ pageid: pageID });
    const customer = await Customer.find({ page: page._id });
    if (!customer.length) return requestName();
  }

  callSendAPI(messageData);
};
