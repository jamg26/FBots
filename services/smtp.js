const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function main(to, subject, htmlBody) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "email-smtp.ap-southeast-1.amazonaws.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "AKIAUZVA36XMTLLOYUAA", // "AKIASYTUQMBE3LWDVWV5", //, (10k per day)
      pass: "BC8rVFpNAok7n7EY+pIE7bjHX9rrMgeGE6x3RZJeWoZ2", // "BDIPOQuy+CUiQKlilFq+nSV3It6LnI7pnqs6QbrErUW2", //,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FBots 🛒" <ecommercebotph@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    // text: "Hello world?", // plain text body
    html: htmlBody, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
