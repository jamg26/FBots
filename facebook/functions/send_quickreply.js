const callSendAPI = require("./message/call_send_api");

module.exports = recipientId => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    messaging_type: "RESPONSE",
    message: {
      text: " .",
      quick_replies: [
        {
          content_type: "text",
          title: "Red",
          payload: "RED",
          //image_url: "http://example.com/img/red.png"
        }
      ]
    }
  };

  callSendAPI(messageData);
};
