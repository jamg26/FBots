const Product = require("../models/product");
const Category = require("../models/category");
const Automated = require("../models/automated");
const getAuthor = require("./functions/page_author");

exports.getProducts = async () => {
  try {
    const author = await getAuthor();
    return await Product.find({ author: author });
  } catch (error) {}
};

exports.getCategories = async () => {
  try {
    const author = await getAuthor();
    return await Category.find({ author: author });
  } catch (error) {}
};

exports.getAutomated = async () => {
  try {
    const author = await getAuthor();
    return await Automated.find({ author: author });
  } catch (error) {}
};
