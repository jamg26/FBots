const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product required."],
    },
    description: String,
    price: {
      type: Number,
      required: [true, "Price required."],
    },
    category: String,
    image_url: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    enabled: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
