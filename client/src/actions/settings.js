import axios from "axios";
import { message } from "antd";

export const changePassword = (newPassword) => async (dispatch) => {
  try {
    await axios.post("/api/settings/password", {
      newpass: newPassword,
    });
    message.info(`Password changed.`);
  } catch (error) {
    message.error(error.response.data);
  }
};

export const changeLogo = (url) => async (dispatch) => {
  await axios.post("/api/settings/logo", {
    logo_url: url,
  });
  message.info(`Logo changed.`);
};

export const changeCover = (url) => async (dispatch) => {
  await axios.post("/api/settings/cover", {
    cover_url: url,
  });
  message.info(`Cover changed.`);
};

export const changePageId = (id) => async (dispatch) => {
  await axios.post("/api/settings/pageid", {
    page_id: id,
  });
  message.info(`Page id changed.`);
};

export const changePageToken = (token) => async (dispatch) => {
  await axios.post("/api/settings/token", {
    token: token,
  });
  message.info(`Page token changed.`);
};

export const changePageName = (pageName) => async (dispatch) => {
  await axios.post("/api/settings/pageName", {
    pageName: pageName,
  });
  message.info(`Page name changed.`);
};

export const getSettings = () => async (dispatch) => {
  const settings = await axios.get("/api/settings");
  dispatch({ type: "GET_SETTINGS", payload: settings.data });
};

export const changeStripePublicKey = (key) => async (dispatch) => {
  await axios.post("/api/settings/stripePublic", {
    key,
  });
  message.info(`Stripe Public Key changed.`);
};

export const changeStripeSecretKey = (key) => async (dispatch) => {
  await axios.post("/api/settings/stripeSecret", {
    key,
  });
  message.info(`Stripe Secret Key changed.`);
};
