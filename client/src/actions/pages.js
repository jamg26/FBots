import axios from "axios";
import { message } from "antd";

export const getPages = () => async (dispatch) => {
  const response = await axios.get("/api/pages");
  dispatch({
    type: "GET_PAGES",
    payload: response.data.reverse(),
  });
};

export const addPage = (formProps) => async (dispatch) => {
  await axios.post("/api/pages", formProps);
  message.info(`Page added.`);
};

export const deletePage = (formProps) => async (dispatch) => {
  await axios.delete("/api/pages", {
    data: formProps,
  });
  message.info(`Deleted.`);
};

export const updatePage = (record, formProps) => async (dispatch) => {
  await axios.put("/api/pages", {
    ...record,
    ...formProps,
  });
  message.info(`Updated.`);
};
