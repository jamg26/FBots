const axios = require("axios");
const subscribe = require("../facebook/functions/subscribe_to_apps");

exports.getFbTokens = async (req, res, next) => {
  const { accessToken, userID } = req.body.authResponse;

  const long_token = await axios.get(
    `https://graph.facebook.com/v9.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FB_APP_ID}&client_secret=${process.env.FB_APP_SECRET}&fb_exchange_token=${accessToken}`
  );

  const { access_token } = long_token.data;

  // try if no api limits
  try {
    const data = await axios.get(
      `https://graph.facebook.com/v9.0/${userID}/accounts?access_token=${access_token}` //&limit=3
    );

    res.send(data.data.data);

    data.data.data.forEach(async (page) => {
      subscribe(page.id, page.access_token);
    });
  } catch (error) {
    // when api limits get only 3 pages
    try {
      const data = await axios.get(
        `https://graph.facebook.com/v9.0/${userID}/accounts?access_token=${access_token}&limit=3`
      );

      res.send(data.data.data);

      data.data.data.forEach(async (page) => {
        subscribe(page.id, page.access_token);
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};
