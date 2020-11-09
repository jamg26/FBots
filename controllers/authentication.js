const jwt = require("jwt-simple");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const config = require("../config");
const Settings = mongoose.model("settings");

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
};

exports.signup = async (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(422).send({ error: "Not allowed to create user." });
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(422).send({ error: "Email is in use." });
    const user = await new User({ email, password }).save();
    await new Settings({
      author: user._id,
      logo_url: "",
      cover_url: "",
    }).save();
    res.send({ token: tokenForUser(user) });
  } catch (error) {
    res.send({ error });
  }
};

exports.signin = async (req, res, next) => {
  // user has already had their email and password authenticated
  // we just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};
