const callSendAPI = require("./call_send_api");

module.exports = (recipientId, messageText, token) => {
  var messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: messageText,
    },
  };

  callSendAPI(messageData, token);
};
