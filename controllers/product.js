const mongoose = require("mongoose");
const Product = mongoose.model("product");
exports.addProduct = async (req, res, next) => {
  const { role } = req.user;
  if (role === "test")
    return res
      .status(400)
      .send("Saving changes is not permitted with the test user.");
  try {
    const product = await new Product({
      ...req.body,
      author: req.user._id,
    }).save();
    res.send(product);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      author: req.user._id,
    }).cache({
      key: req.user._id,
    });
    res.send(products);
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { role } = req.user;
  if (role === "test")
    return res
      .status(400)
      .send("Saving changes is not permitted with the test user.");
  try {
    const product = await Product.findByIdAndUpdate(req.body._id, req.body);
    res.send(product);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { role } = req.user;
  if (role === "test")
    return res
      .status(400)
      .send("Saving changes is not permitted with the test user.");
  try {
    const product = await Product.findByIdAndDelete(req.body._id);
    res.send(product);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};
