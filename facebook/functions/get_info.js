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
    console.log("CANT GET INFO:", psid, token);
    console.log("ERROR GET_INFO: ", error.message);
    return {
      first_name: "-",
      last_name: "-",
      profile_pic: "-",
    };
  }
};
