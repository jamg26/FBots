const mongoose = require("mongoose");
const Automated = mongoose.model("automated");

exports.addAutomated = async (req, res, next) => {
  const { role } = req.user;
  if (role === "test")
    return res
      .status(400)
      .send("Saving changes is not permitted with the test user.");
  try {
    const response = await new Automated({
      ...req.body,
      author: req.user._id,
    }).save();
    res.send(response);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAutomated = async (req, res, next) => {
  try {
    const response = await Automated.find({ author: req.user._id }).cache({
      key: req.user._id,
    });
    res.send(response);
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateAutomated = async (req, res, next) => {
  const { role } = req.user;
  if (role === "test")
    return res
      .status(400)
      .send("Saving changes is not permitted with the test user.");
  try {
    const response = await Automated.findByIdAndUpdate(req.body._id, req.body);
    res.send(response);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteAutomated = async (req, res, next) => {
  const { role } = req.user;
  if (role === "test")
    return res
      .status(400)
      .send("Saving changes is not permitted with the test user.");
  try {
    const response = await Automated.findByIdAndDelete(req.body._id);
    res.send(response);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};
