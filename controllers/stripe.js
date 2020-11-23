const mongoose = require("mongoose");
const Order = mongoose.model("orders");
const Page = mongoose.model("pages");
const Settings = mongoose.model("settings");
const sendMessage = require("../messenger/send_text");
const sendReceipt = require("../messenger/send_receipt");

exports.createSession = async (req, res, next) => {
  const { pageid, orderid } = req.body;
  const page = await Page.findOne({ pageid });
  const settings = await Settings.findOne({ author: page.author });
  const stripe = require("stripe")(settings.stripe_secret);
  const order = await Order.findById(orderid);
  if (order.status === "NOT_PAID") {
    const TOTAL_AMOUNT = Math.round((order.price + order.shipping_fee) * 100);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      payment_intent_data: {
        description: `FACEBOOK PAYMENT`,
        metadata: {
          PAGE_ID: pageid,
          ORDER_ID: orderid,
          SHIPPING_FEE: `PHP ${order.shipping_fee}`,
        },
      },
      line_items: [
        {
          price_data: {
            currency: "php",
            product_data: {
              name: order.product,
            },
            unit_amount: TOTAL_AMOUNT,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.BASE_URL}/payments/stripe/success/{CHECKOUT_SESSION_ID}/${orderid}/${pageid}`,
      cancel_url: "https://facebook.com/",
    });
    order.stripe_session = session.id;
    await order.save();
    res.json({ id: session.id });
  }
  if (order.status === "PAID") {
    res.send({ status: "This order is already paid." });
  }
};

exports.paymentSuccess = async (req, res, next) => {
  const page = await Page.findOne({ pageid: req.params.pageid });
  const settings = await Settings.findOne({ author: page.author });
  const stripe = require("stripe")(settings.stripe_secret);

  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    if (session.payment_status === "paid") {
      const order = await Order.findById(req.params.orderid);
      const page = await Page.findOne({ pageid: req.params.pageid });
      if (order.stripe_session === req.params.id) {
        if (order.status !== "PAID" && order.status !== "SHIPPED") {
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
        } else {
          res.send(
            `Success! Thank you for your order. You may close this browser.`
          );
        }
      } else {
        res.send("Invalid order.");
      }
    }
  } catch (error) {
    console.log(error.message);
    res.send("Invalid session.");
  }
};
