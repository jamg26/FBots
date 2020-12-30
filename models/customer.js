const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: String,
    email: String,
    contact: String,
    psid: String,
    page: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pages",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", customerSchema, "customer");
