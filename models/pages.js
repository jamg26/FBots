const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pagesSchema = new Schema(
  {
    page_id: {
      type: String,
    },
    token: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pages", pagesSchema);
