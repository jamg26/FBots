import axios from "axios";
import { message } from "antd";

export const getOrders = () => async (dispatch) => {
  const response = await axios.get("/api/orders");
  dispatch({ type: "GET_ORDERS", payload: response.data.data.reverse() });
  dispatch({ type: "GET_ORDERS_STATS", payload: response.data.stats });
};

export const searchOrder = (id) => async (dispatch) => {
  let ID = id;
  if (id?.includes("#")) ID = ID.replace("#", "");
  const response = await axios.post("/api/orders/search", { id: ID });
  if (id) {
    return dispatch({
      type: "GET_ORDERS",
      payload: response.data ? response.data.reverse() : null,
    });
  }
  dispatch({ type: "GET_ORDERS", payload: response.data.reverse() });
};

export const updateOrder = (record, data) => async (dispatch) => {
  await axios.put("/api/orders", { ...record, ...data });
  message.info("Updated.");
};

export const removeOrder = (record) => async (dispatch) => {
  await axios.delete("/api/orders", { data: record });
  message.info("Removed.");
};

// export const updateAutomated = (record, formProps) => async (dispatch) => {
//   await axios.put("/api/automated", {
//     ...record,
//     ...formProps,
//   });
//   message.info(`Updated.`);
// };

// export const deleteAutomated = (formProps) => async (dispatch) => {
//   await axios.delete("/api/automated", {
//     data: formProps,
//   });
//   message.info(`Deleted.`);
// };
