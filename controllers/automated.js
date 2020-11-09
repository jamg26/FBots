const mongoose = require("mongoose");
const Automated = mongoose.model("automated");

exports.addAutomated = async (req, res, next) => {
  try {
    const response = await new Automated({
      ...req.body,
      author: req.user._id,
    }).save();
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
  next();
};

exports.getAutomated = async (req, res, next) => {
  try {
    const response = await Automated.find({ author: req.user._id });
    res.send(response);
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateAutomated = async (req, res, next) => {
  try {
    const response = await Automated.findByIdAndUpdate(req.body._id, req.body);
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
  next();
};

exports.deleteAutomated = async (req, res, next) => {
  try {
    const response = await Automated.findByIdAndDelete(req.body._id);
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
  next();
};
