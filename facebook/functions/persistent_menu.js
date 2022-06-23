var axios = require("axios");

module.exports = async (token) => {
  var data = JSON.stringify({
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
    url: `https://graph.facebook.com/v9.0/me/messenger_profile?access_token=${token}`,
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
      console.log(error, "ERROR: ADD_PERSISTENT_MENU");
    });
};
