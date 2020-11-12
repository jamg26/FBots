const mongoose = require("mongoose");
const Order = mongoose.model("orders");
const sendMessage = require("../messenger/send_text");
const sendReceipt = require("../messenger/send_receipt");
const Pages = mongoose.model("pages");

exports.getOrders = async (req, res, next) => {
  //const id = req.user._id;
  try {
    const response = await Order.find({ author: req.user._id });
    const total = await Order.aggregate([
      { $match: { author: mongoose.Types.ObjectId(req.user._id) } },
      { $group: { _id: null, sum: { $sum: "$price" } } },
    ]);
    const paid = await Order.aggregate([
      {
        $match: {
          author: mongoose.Types.ObjectId(req.user._id),
          $and: [{ $or: [{ status: "PAID" }, { status: "SHIPPED" }] }],
        },
      },
      { $group: { _id: null, sum: { $sum: "$price" } } },
    ]);
    const cancelled = await Order.aggregate([
      {
        $match: {
          author: mongoose.Types.ObjectId(req.user._id),
          status: "CANCELLED",
        },
      },
      { $group: { _id: null, sum: { $sum: "$price" } } },
    ]);
    const shipped = await Order.aggregate([
      {
        $match: {
          author: mongoose.Types.ObjectId(req.user._id),
          status: "SHIPPED",
        },
      },
      { $group: { _id: null, sum: { $sum: "$price" } } },
    ]);

    const orders = {
      total: total[0] ? total[0].sum.toFixed(2) : 0,
      paid: paid[0] ? paid[0].sum.toFixed(2) : 0,
      cancelled: cancelled[0] ? cancelled[0].sum.toFixed(2) : 0,
      shipped: shipped[0] ? shipped[0].sum.toFixed(2) : 0,
    };

    res.send({ stats: orders, data: response });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

exports.searchOrder = async (req, res, next) => {
  //const id = req.user._id;
  try {
    if (req.body.id) {
      const response = await Order.findById(req.body.id);
      res.send(response);
    } else {
      const response = await Order.find();
      res.send(response);
    }
  } catch (error) {
    res.send(null);
  }
};

exports.updateOrder = async (req, res, next) => {
  const { status, order_thread, type } = req.body;
  // const setting = await Settings.findOne({ author: req.user._id });
  try {
    const response = await Order.findByIdAndUpdate(req.body._id, req.body);
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }

  const page = await Pages.findOne({ pageid: req.body.pageid });
  if (type === "status") {
    sendMessage(
      order_thread,
      `Your order #${req.body._id} has been ${
        status === "PAID"
          ? "paid"
          : status === "SHIPPED"
          ? "shipped"
          : status === "CANCELLED"
          ? "cancelled"
          : ""
      }`,
      page.pagetoken
    );
    if (status === "PAID") {
      sendReceipt(order_thread, req.body, page.pagetoken);
    }
    if (status === "SHIPPED") {
      sendMessage(order_thread, `Thank you for your order.`, page.pagetoken);
    }
  }

  next();
};
