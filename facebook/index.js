const sendTextMessage = require("./functions/message/send_text");
const markSeen = require("./actions/markseen");
const temp_db = require("./temp_db");

//handlers
const textHandler = require("./listeners/text");
const postbackHandler = require("./listeners/postback");

module.exports = async (app) => {
  // Webhook validation
  app.get("/api/webhook", function (req, res) {
    console.log(process.env.VERIFY_TOKEN);
    if (
      req.query["hub.mode"] === "subscribe" &&
      req.query["hub.verify_token"] === process.env.VERIFY_TOKEN
    ) {
      console.log("Validating webhook");
      res.status(200).send(req.query["hub.challenge"]);
    } else {
      console.error(
        "Failed validation. Make sure the validation tokens match."
      );
      res.sendStatus(403);
    }
  });

  // Display the web page
  //   app.get("/", function (req, res) {
  //     // res.writeHead(200, { "Content-Type": "text/html" });
  //     // res.write(messengerButton);
  //     // res.end();
  //     res.send("Hello");
  //   });

  // Message processing
  app.post("/api/webhook", function (req, res) {
    var data = req.body;
    // Make sure this is a page subscription
    if (data.object === "page") {
      // Iterate over each entry - there may be multiple if batched
      try {
        data.entry.forEach(function (entry) {
          var pageID = entry.id;
          var timeOfEvent = entry.time;
          temp_db.page_id = pageID;

          // Iterate over each messaging event
          entry.messaging.forEach(function (event) {
            if (event.message) {
              receivedMessage(event);
            } else if (event.postback) {
              receivedPostback(event);
            } else {
              console.log("Webhook received unknown event: ", event);
            }
          });
        });
      } catch {}

      // Assume all went well.
      //
      // You must send back a 200, within 20 seconds, to let us know
      // you've successfully received the callback. Otherwise, the request
      // will time out and we will keep trying to resend.
      res.sendStatus(200);
    }
  });

  // Incoming events handling
  function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    // console.log(
    //   "Received message for user %d and page %d at %d with message:",
    //   senderID,
    //   recipientID,
    //   timeOfMessage
    // );
    // console.log(JSON.stringify(message));

    var messageId = message.mid;

    var messageText = message.text;
    var messageAttachments = message.attachments;

    //console.log(event);
    markSeen(senderID);
    if (messageText) {
      textHandler(senderID, messageText);
    } else if (messageAttachments) {
      sendTextMessage(senderID, "Message with attachment received");
    }
  }

  function receivedPostback(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfPostback = event.timestamp;

    // The 'payload' param is a developer-defined field which is set in a postback
    // button for Structured Messages.
    var payload = event.postback.payload;

    // console.log(
    //   "Received postback for user %d and page %d with payload '%s' " + "at %d",
    //   senderID,
    //   recipientID,
    //   payload,
    //   timeOfPostback
    // );

    // When a postback is called, we'll send a message back to the sender to
    // let them know it was successful
    postbackHandler(senderID, payload);
  }
};
