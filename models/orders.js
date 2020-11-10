const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    order_by: String,
    order_thread: String,
    price: Number,
    product: String,
    product_description: String,
    product_image: String,
    payment_method: String,
    image_url: String,
    reason: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      default: "NOT_PAID",
    },
    address: String,
    contact: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);