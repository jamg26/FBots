var axios = require("axios");
const token = require("./page_token");

module.exports = async (psid) => {
  const accessToken = await token();

  var data = JSON.stringify({
    psid: psid,
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          { type: "postback", title: "Show Menu", payload: "Show Menu" },
        ],
      },
    ],
  });

  var config = {
    method: "post",
    url: `https://graph.facebook.com/v9.0/me/custom_user_settings?access_token=${accessToken}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      //console.log(error);
    });
};
