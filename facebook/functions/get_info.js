const axios = require("axios");
const getToken = require("./page_token");
module.exports = async (psid) => {
  const token = await getToken();
  try {
    const user = await axios.get(
      `https://graph.facebook.com/${psid}?fields=first_name,last_name,profile_pic&access_token=${token}`
    );
    return user.data;
  } catch (error) {
    return {
      first_name: "-",
      last_name: "-",
      profile_pic: "-",
    };
  }
};
