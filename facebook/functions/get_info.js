const axios = require("axios");
const getToken = require("./page_token");
module.exports = async (psid) => {
  const token = await getToken();
  try {
    const user = await axios.get(
      `https://graph.facebook.com/${psid}?fields=first_name,last_name,profile_pic&access_token=${token}`
    );
    console.log("GET_INFO:", psid);
    return user.data;
  } catch (error) {
    console.log(
      "ERROR_GET_INFO:",
      psid,
      token,
      `https://graph.facebook.com/${psid}?fields=first_name,last_name,profile_pic&access_token=${token}`
    );
    return {
      first_name: "-",
      last_name: "-",
      profile_pic: "-",
    };
  }
};
