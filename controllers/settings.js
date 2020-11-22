const mongoose = require("mongoose");
const User = mongoose.model("user");
const Settings = mongoose.model("settings");

exports.changePassword = async (req, res, next) => {
  if (req.user._id.toString() === "5f816be093acdc2baf5e149e")
    return res.status(401).send("You can't change pass the test user.");
  const user = await User.findById(req.user._id);
  user.password = req.body.newpass;
  user.save();
  res.send(user);
  next();
};

exports.changeLogo = async (req, res, next) => {
  const setting = await Settings.findOne({ author: req.user._id });
  console.log(setting, req.body);
  setting.logo_url = req.body.logo_url;
  setting.save();
  res.send(setting);
  next();
};

exports.changeCover = async (req, res, next) => {
  const setting = await Settings.findOne({ author: req.user._id });
  setting.cover_url = req.body.cover_url;
  setting.save();
  res.send(setting);
  next();
};

exports.changePageId = async (req, res, next) => {
  const setting = await Settings.findOne({ author: req.user._id });
  setting.page_id = req.body.page_id;
  setting.save();
  res.send(setting);
  next();
};

exports.changePageToken = async (req, res, next) => {
  const setting = await Settings.findOne({ author: req.user._id });
  setting.token = req.body.token;
  setting.save();
  res.send(setting);
  next();
};

exports.changePageName = async (req, res, next) => {
  const setting = await Settings.findOne({ author: req.user._id });
  setting.pageName = req.body.pageName;
  setting.save();
  res.send(setting);
  next();
};

exports.changeStripeSecret = async (req, res, next) => {
  const setting = await Settings.findOne({ author: req.user._id });
  setting.stripe_secret = req.body.key;
  setting.save();
  res.send(setting);
  next();
};

exports.changeStripePublic = async (req, res, next) => {
  const setting = await Settings.findOne({ author: req.user._id });
  setting.stripe_public = req.body.key;
  setting.save();
  res.send(setting);
  next();
};

exports.getSettings = async (req, res, next) => {
  const setting = await Settings.findOne({ author: req.user._id }).cache({
    key: req.user._id,
  });
  res.send(setting);
};
