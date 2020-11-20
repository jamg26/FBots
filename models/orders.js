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
    shipping_fee: Number,
    image_url: String,
    reason: String,
    pageid: String,
    page_name: String,
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
    stripe_session: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
