const mongoose = require("mongoose");
const Pages = mongoose.model("pages");

exports.getPages = async (req, res, next) => {
  const response = await Pages.find({ author: req.user._id });
  res.send(response);
};

exports.addPage = async (req, res, next) => {
  try {
    const response = await new Pages({
      ...req.body,
      author: req.user._id,
    }).save();
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
  next();
};

exports.deletePage = async (req, res, next) => {
  try {
    const response = await Pages.findByIdAndDelete(req.body._id);
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
  next();
};

exports.updatePage = async (req, res, next) => {
  try {
    const response = await Pages.findByIdAndUpdate(req.body._id, req.body);
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
  next();
};
