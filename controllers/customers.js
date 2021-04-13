const mongoose = require("mongoose");
const Customer = mongoose.model("customer");
const Pages = mongoose.model("pages");

exports.getCustomers = async (req, res, next) => {
  try {
    const pages = await Pages.find({ author: req.user._id });
    const query = pages.map((page) => {
      return { page: page._id };
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
  const { role } = req.user;
  if (role === "test")
    return res
      .status(400)
      .send("Saving changes is not permitted with the test user.");
  const customer = await Customer.findByIdAndDelete(req.body._id);
  console.log(customer);
  res.send(customer);
};
