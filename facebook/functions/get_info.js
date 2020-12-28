const axios = require("axios");
const getToken = require("./page_token");
module.exports = async (psid) => {
  try {
    const token = await getToken();
    const user = await axios.get(
      `https://graph.facebook.com/${psid}?fields=first_name,last_name,profile_pic&access_token=${token}`
    );
    console.log(user.data);
    const { first_name, last_name, profile_pic } = user.data;
    return {
      first_name: first_name ? first_name : "-",
      last_name: last_name ? last_name : "-",
      profile_pic: profile_pic ? profile_pic : "-",
    };
  } catch (error) {
    console.log("ERROR GET_INFO: ", error.message);
  }
};
