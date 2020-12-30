import { combineReducers } from "redux";
import auth from "./auth";
import category from "./category";
import products from "./product";
import automated from "./automated";
import settings from "./settings";
import orders from "./orders";
import users from "./users";
import pages from "./pages";
import facebook from "./facebook";
import customers from "./customers";

export default combineReducers({
  auth,
  category,
  products,
  automated,
  settings,
  orders,
  users,
  pages,
  facebook,
  customers,
});
