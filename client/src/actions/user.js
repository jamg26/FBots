import axios from "axios";
import { message } from "antd";

export const getUsers = () => async (dispatch) => {
  const response = await axios.get("/api/users");
  dispatch({ type: "GET_USERS", payload: response.data });
};

export const getCurrentUser = () => async (dispatch) => {
  const response = await axios.get("/api/current_user");
  dispatch({ type: "GET_USERS_CURRENT", payload: response.data });
};

export const signup = (formProps) => async (dispatch) => {
  try {
    await axios.post("/api/signup", formProps);
    message.info("Account created.");
  } catch (error) {
    message.info(error.response.data.error);
  }
};

export const deleteUser = (formProps) => async (dispatch) => {
  try {
    await axios.delete("/api/users", { data: formProps });
    message.info("Account deleted.");
  } catch (error) {
    message.info(error.response.data.error);
  }
};
