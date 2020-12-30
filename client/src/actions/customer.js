import axios from "axios";
import { message } from "antd";

export const getCustomers = () => async (dispatch) => {
  const customers = await axios.get("/api/customers");
  dispatch({ type: "GET_CUSTOMERS", payload: customers.data.reverse() });
};

export const removeCustomer = (data) => async (dispatch) => {
  await axios.delete("/api/customers", { data: data });
  message.info(`Removed.`);
};
