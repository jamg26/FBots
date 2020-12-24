const mongoose = require("mongoose");
const Settings = mongoose.model("settings");
const Pages = mongoose.model("pages");
const temp_db = require("../temp_db");

module.exports = async () => {
  //const settings = await Settings.findOne({ page_id: temp_db.page_id });
  try {
    const page = await Pages.findOne({ pageid: temp_db.page_id });
    return page.author;
  } catch (error) {
    console.log("ERROR PAGE_AUTHOR: NOT FOUND:", temp_db.page_id);
  }
};
