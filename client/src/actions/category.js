import axios from "axios";
import { message } from "antd";

export const addCategory = (formProps) => async (dispatch) => {
  await axios.post("/api/category", formProps);
  message.info(`Category added.`);
};

export const getCategory = () => async (dispatch) => {
  const response = await axios.get("/api/category");
  dispatch({ type: "GET_CATEGORY", payload: response.data.reverse() });
};

export const updateCategory = (record, formProps) => async (dispatch) => {
  await axios.put("/api/category", {
    ...record,
    ...formProps,
  });
  message.info(`Category updated.`);
};

export const deleteCategory = (formProps) => async (dispatch) => {
  await axios.delete("/api/category", {
    data: formProps,
  });
  message.info(`Category deleted.`);
};
