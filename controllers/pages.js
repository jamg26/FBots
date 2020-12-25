const mongoose = require("mongoose");
const Pages = mongoose.model("pages");
const getStartedButton = require("../facebook/functions/get_started_button");

exports.getPages = async (req, res, next) => {
  const response = await Pages.find({ author: req.user._id }).cache({
    key: req.user._id,
  });
  res.send(response);
};

exports.addPage = async (req, res, next) => {
  const { pagetoken, pageid } = req.body;

  const exist = await Pages.find({ pageid });
  if (exist.length > 0) {
    return res
      .status(400)
      .send("The selected page is already linked on this or other account.");
  }

  try {
    const response = await new Pages({
      ...req.body,
      author: req.user._id,
    }).save();
    getStartedButton(pagetoken);
    res.send(response);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deletePage = async (req, res, next) => {
  try {
    const response = await Pages.findByIdAndDelete(req.body._id);
    res.send(response);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updatePage = async (req, res, next) => {
  try {
    const response = await Pages.findByIdAndUpdate(req.body._id, req.body);
    res.send(response);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};
