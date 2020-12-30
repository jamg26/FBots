const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: String,
    email: String,
    contact: String,
    psid: String,
    pageid: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", customerSchema, "customer");
