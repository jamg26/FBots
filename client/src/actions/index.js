import axios from "axios";
import { message } from "antd";

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post("/api/signup", formProps);
    dispatch({ type: "AUTH_USER", payload: response.data.token });
    //localStorage.setItem("token", response.data.token);
    callback();
  } catch (error) {
    dispatch({ type: "AUTH_ERROR", payload: "Email is in use" });
  }
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post("/api/signin", formProps);
    dispatch({ type: "AUTH_USER", payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    message.info(`Signed in.`);
  } catch (error) {
    dispatch({ type: "AUTH_ERROR", payload: "Invalid login credentials" });
    message.error(`Invalid email/password.`);
  }
  callback();
};

export const signout = () => {
  localStorage.removeItem("token");
  message.info(`Signed out.`);
  return {
    type: "AUTH_USER",
    payload: "",
  };
};
