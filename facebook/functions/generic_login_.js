const callSendAPI = require("./message/call_send_api");

module.exports = (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: `Facebook Login`,
              subtitle: "OAuth",
              image_url: `${process.env.BASE_URL}/logo.png`,
              buttons: [
                {
                  type: "web_url",
                  title: "ALLOW",
                  url: `${process.env.BASE_URL}/oauth/fb`,
                  webview_height_ratio: "FULL",
                  //messenger_extensions: "true",
                  // fallback_url: "https://08124d3fce72.ngrok.io/",
                },
              ],
            },
          ],
        },
      },
    },
  };

  callSendAPI(messageData);
};
