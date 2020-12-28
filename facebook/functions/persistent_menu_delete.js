module.exports = (psid, token) => {
  var axios = require("axios");

  var config = {
    method: "delete",
    url: `https://graph.facebook.com/v9.0/me/custom_user_settings?psid=${psid}&params=[%22persistent_menu%22]&access_token=${token}`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
