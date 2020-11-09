const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const automatedSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, "Question required."],
    },
    response: {
      type: String,
      required: [true, "Response required."],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    image_url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("automated", automatedSchema, "automated");
