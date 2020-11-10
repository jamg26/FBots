const mongoose = require("mongoose");
const Product = mongoose.model("product");
exports.addProduct = async (req, res, next) => {
  try {
    const product = await new Product({
      ...req.body,
      author: req.user._id,
    }).save();
    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
  next();
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ author: req.user._id });
    res.send(products);
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.body._id, req.body);
    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
  next();
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.body._id);
    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
  next();
};