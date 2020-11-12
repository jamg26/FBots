const mongoose = require("mongoose");
const Settings = mongoose.model("settings");
const Pages = mongoose.model("pages");
const temp_db = require("../temp_db");

module.exports = async () => {
  //const settings = await Settings.findOne({ page_id: temp_db.page_id });
  const page = await Pages.findOne({ pageid: temp_db.page_id });
  return page.author;
};
