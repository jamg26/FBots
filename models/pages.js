const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pagesSchema = new Schema(
  {
    pageid: {
      type: String,
    },
    pagetoken: {
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
