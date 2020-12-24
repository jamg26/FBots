module.exports = (token) => {
  var axios = require("axios");
  var data = JSON.stringify({
    get_started: { payload: "GET_STARTED_PAYLOAD" },
  });

  var config = {
    method: "post",
    url: `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${token}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      console.log("GET_STARTED_BUTTON:", token);
    })
    .catch(function (error) {
      console.log(error);
    });
};
