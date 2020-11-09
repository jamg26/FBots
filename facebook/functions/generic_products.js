const callSendAPI = require("./message/call_send_api");

module.exports = (recipientId, products) => {
  var messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: products.map((product) => {
            return {
              title: `P${product.price} - ${product.name}`,
              subtitle: product.description,
              //item_url: "https://www.oculus.com/en-us/rift/",
              image_url: product.image_url
                ? product.image_url
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png",
              buttons: [
                {
                  type: "postback",
                  title: "ORDER",
                  payload: `ORDER#${product.name}#${product.price}#${product.image_url}`,
                },
                {
                  type: "postback",
                  title: "MORE INFO",
                  payload: `INFO#${product.description}`,
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
