const mongoose = require("mongoose");
const Users = mongoose.model("user");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await Users.find();
    res.send(users);
  } catch (error) {
    res.send(error.message);
  }
};

exports.deleteUser = async (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(422).send({ error: "Not allowed to delete user." });
  try {
    const users = await Users.findByIdAndDelete(req.body._id);
    res.send(users);
  } catch (error) {
    res.send(error.message);
  }
};
