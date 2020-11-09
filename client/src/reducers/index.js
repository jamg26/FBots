import { combineReducers } from "redux";
import auth from "./auth";
import category from "./category";
import products from "./product";
import automated from "./automated";
import settings from "./settings";
import orders from "./orders";
import users from "./users";

export default combineReducers({
  auth,
  category,
  products,
  automated,
  settings,
  orders,
  users,
});
