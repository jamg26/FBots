const axios = require("axios");
const getToken = require('../functions/page_token')
module.exports = async (id) => {
  const token = await getToken();
  const url = `https://graph.facebook.com/v8.0/me/messages?access_token=${token}`;
  return axios.post(url, {
    recipient: {
      id: id,
    },
    sender_action: "mark_seen",
  });
};