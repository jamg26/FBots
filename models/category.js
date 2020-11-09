const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product required."],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    image_url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);
