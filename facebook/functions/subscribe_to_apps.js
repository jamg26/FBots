var axios = require("axios");
var qs = require("qs");

module.exports = (pageid, token) => {
  var data = qs.stringify({
    object: "page",
  });
  var config = {
    method: "post",
    url: `https://graph.facebook.com/v3.2/${pageid}/subscribed_apps?access_token=${token}&subscribed_fields=messages,messaging_postbacks`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
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
