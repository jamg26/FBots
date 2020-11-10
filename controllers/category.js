const mongoose = require("mongoose");
const Category = mongoose.model("category");

exports.addCategory = async (req, res, next) => {
  try {
    const category = await new Category({
      ...req.body,
      author: req.user._id,
    }).save();
    res.send(category);
  } catch (error) {
    res.status(400).send(error.message);
  }
  next();
};

exports.getCategory = async (req, res, next) => {
  const id = req.user._id;
  try {
    const category = await Category.find({ author: req.user._id });
    res.send(category);
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.body._id, req.body);
    res.send(category);
  } catch (error) {
    res.status(400).send(error.message);
  }
  next();
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.body._id);
    res.send(category);
  } catch (error) {
    res.status(400).send(error.message);
  }
  next();
};