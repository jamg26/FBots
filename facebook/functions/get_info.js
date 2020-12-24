const axios = require("axios");
const getToken = require("./page_token");
module.exports = async (psid) => {
  try {
    const token = await getToken();
    return await axios.get(
      `https://graph.facebook.com/${psid}?fields=first_name,last_name,profile_pic&access_token=${token}`
    );
  } catch (error) {
    //console.log("ERROR GET_INFO: ", error.message);
  }
};
