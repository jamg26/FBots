const mongoose = require("mongoose");
const Order = mongoose.model("orders");
const Page = mongoose.model("pages");
const Settings = mongoose.model("settings");
const sendMessage = require("../messenger/send_text");
const sendReceipt = require("../messenger/send_receipt");


exports.paymentSuccess = async (req, res, next) => {
    const order = await Order.findOne({gcash_ref: req.body.request_id});
    const page = await Page.findOne({pageid: order.pageid});
      order.status = "PAID";
      await order.save();
      res.send(
        `Success! Thank you for your order. You may close this browser.`
      );
      sendReceipt(order.order_thread, order, page.pagetoken);
      sendMessage(
        order.order_thread,
        `Thank you for your order.`,
        page.pagetoken
      );

}
