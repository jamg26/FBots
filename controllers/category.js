const mongoose = require("mongoose");
const Category = mongoose.model("category");

exports.addCategory = async (req, res, next) => {
  const { role } = req.user;
  if (role === "test")
    return res
      .status(400)
      .send("Saving changes is not permitted with the test user.");
  try {
    const category = await new Category({
      ...req.body,
      author: req.user._id,
    }).save();
    res.send(category);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.find({ author: req.user._id }).cache({
      key: req.user._id,
    });
    res.send(category);
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateCategory = async (req, res, next) => {
  const { role } = req.user;
  if (role === "test")
    return res
      .status(400)
      .send("Saving changes is not permitted with the test user.");
  try {
    const category = await Category.findByIdAndUpdate(req.body._id, req.body);
    res.send(category);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const { role } = req.user;
  if (role === "test")
    return res
      .status(400)
      .send("Saving changes is not permitted with the test user.");
  try {
    const category = await Category.findByIdAndDelete(req.body._id);
    res.send(category);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};
