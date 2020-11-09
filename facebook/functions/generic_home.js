const callSendAPI = require("./message/call_send_api");
const { getProducts, getCategories } = require("../controllers");

module.exports = async (recipientId) => {
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

  callSendAPI(messageData);
};
