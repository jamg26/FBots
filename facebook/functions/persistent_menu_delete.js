module.exports = (token) => {
  var axios = require("axios");

  var data = JSON.stringify({ fields: ["persistent_menu"] });

  var config = {
    method: "delete",
    url: `https://graph.facebook.com/v9.0/me/messenger_profile?access_token=${token}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
