const mongoose = require("mongoose");
const Customer = mongoose.model("customer");
const Pages = mongoose.model("pages");

exports.getCustomers = async (req, res, next) => {
  try {
    const pages = await Pages.find({ author: req.user._id });
    const query = pages.map((page) => {
      return { pageid: page.pageid };
    });

    const customers = await Customer.find({
      $or: query,
    }).populate("page");

    res.send(customers);
  } catch (error) {
    res.send([]);
  }
};

exports.removeCustomer = async (req, res, next) => {
  console.log(req.body);
  const customer = await Customer.findByIdAndDelete(req.body._id);
  console.log(customer);
  res.send(customer);
};
