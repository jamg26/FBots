import axios from "axios";
import { message } from "antd";

export const addAutomated = (formProps) => async (dispatch) => {
  await axios.post("/api/automated", formProps);
  message.info(`Record added.`);
};

export const getAutomated = () => async (dispatch) => {
  const response = await axios.get("/api/automated");
  dispatch({ type: "GET_AUTOMATED", payload: response.data.reverse() });
};

export const updateAutomated = (record, formProps) => async (dispatch) => {
  await axios.put("/api/automated", {
    ...record,
    ...formProps,
  });
  message.info(`Updated.`);
};

export const deleteAutomated = (formProps) => async (dispatch) => {
  await axios.delete("/api/automated", {
    data: formProps,
  });
  message.info(`Deleted.`);
};
