import axios from "axios";
import { message } from "antd";

export const addProduct = (formProps) => async (dispatch) => {
  await axios.post("/api/product", formProps);
  message.info(`Product added.`);
};

export const getProduct = () => async (dispatch) => {
  const response = await axios.get("/api/product");
  dispatch({
    type: "GET_PRODUCTS",
    payload: response.data.reverse(),
  });
};

export const updateProduct = (record, formProps) => async (dispatch) => {
  await axios.put("/api/product", {
    ...record,
    ...formProps,
  });
  message.info(`Product updated.`);
};

export const deleteProduct = (formProps) => async (dispatch) => {
  await axios.delete("/api/product", {
    data: formProps,
  });
  message.info(`Product deleted.`);
};
