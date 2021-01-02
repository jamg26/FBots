const mongoose = require("mongoose");
const Order = mongoose.model("orders");
const sendMessage = require("../messenger/send_text");
const sendReceipt = require("../messenger/send_receipt");
const Pages = mongoose.model("pages");

exports.getOrders = async (req, res, next) => {
  try {
    const response = await Order.find({
      author: req.user._id,
      removed: { $ne: true },
    });

    const total = await Order.aggregate([
      {
        $match: {
          author: mongoose.Types.ObjectId(req.user._id),
          removed: { $ne: true },
        },
      },
      { $group: { _id: null, sum: { $sum: "$price" } } },
    ]);

    const paid = await Order.aggregate([
      {
        $match: {
          author: mongoose.Types.ObjectId(req.user._id),
          removed: { $ne: true },
          $and: [{ $or: [{ status: "PAID" }, { status: "SHIPPED" }] }],
        },
      },
      { $group: { _id: null, sum: { $sum: "$price" } } },
    ]);

    const cancelled = await Order.aggregate([
      {
        $match: {
          author: mongoose.Types.ObjectId(req.user._id),
          removed: { $ne: true },
          status: "CANCELLED",
        },
      },
      { $group: { _id: null, sum: { $sum: "$price" } } },
    ]);

    const shipped = await Order.aggregate([
      {
        $match: {
          author: mongoose.Types.ObjectId(req.user._id),
          removed: { $ne: true },
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
    console.log("ERROR GET_ORDER", error.message);
  }
};

exports.searchOrder = async (req, res, next) => {
  // SEARCH BY ID
  try {
    if (req.body.id) {
      const response = await Order.find({
        _id: req.body.id,
        author: req.user._id,
      }).cache({
        key: req.user._id,
      });
      //console.log("=>>", response);
      res.send(response);
    } else {
      // SEARCH IF EMPTY
      const response = await Order.find({ author: req.user._id }).cache({
        key: req.user._id,
      });
      //console.log("=>>", response);
      res.send(response);
    }
  } catch (error) {
    // SEARCH BY PAGE
    const response = await Order.find({
      page_name: req.body.id,
      author: req.user._id,
    })
      .collation({
        locale: "en",
        strength: 2,
      })
      .cache({
        key: req.user._id,
      });

    if (response.length) {
      res.send(response);
      return;
    } else {
      // SEARCH BY CUSTOMER
      const response = await Order.find({
        order_by: req.body.id,
        author: req.user._id,
      })
        .collation({
          locale: "en",
          strength: 2,
        })
        .cache({
          key: req.user._id,
        });

      res.send(response);
    }
  }
};

exports.updateOrder = async (req, res, next) => {
  const { status, order_thread, type } = req.body;
  // const setting = await Settings.findOne({ author: req.user._id });
  try {
    const response = await Order.findByIdAndUpdate(req.body._id, req.body);
    res.send(response);
    next();
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
};

exports.removeOrder = async (req, res, next) => {
  const { _id } = req.body;
  const order = await Order.findById(_id);
  order.removed = true;
  await order.save();
  res.send(order);
};

exports.getOrderRange = async (req, res, next) => {
  const { from, to } = req.body;
  const orders = await Order.find({
    createdAt: {
      $gte: new Date(from),
      $lte: new Date(to),
    },
  });
  res.send(orders);
};
