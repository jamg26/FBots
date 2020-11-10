const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new Schema(
  {
    cover_url: String,
    logo_url: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    page_id: {
      type: String,
    },
    token: {
      type: String,
    },
    pageName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("settings", settingsSchema);