module.exports = (psid, token) => {
  var axios = require("axios");

  var config = {
    method: "delete",
    url:
      "https://graph.facebook.com/v9.0/me/custom_user_settings?psid=4756531387705423&params=[%22persistent_menu%22]&access_token=EAAFdW6ZBVyp0BAAnpwGcutHIlOxDUu5af8qbj9qpbRfOCkpOIUf2TOxL74qZCX2u6hXONa8GQZBOZCfQ9rJ5urY0FwBMp8RoI3ETy35GgoZBdSgak7jxetZATVWGxVg4VuQeyZBz6m2ZBNjOZAUjFAYw0JgqGzpBSPoZC2ayoEO7S6TFeKtFgWeI9UmVVFnM0CqE8ZD",
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
