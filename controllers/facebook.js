const axios = require("axios");
const subscribe = require("../facebook/functions/subscribe_to_apps");

exports.getFbTokens = async (req, res, next) => {
  console.log("trigger");
  const { accessToken, userID } = req.body.authResponse;
  try {
    const data = await axios.get(
      `https://graph.facebook.com/${userID}/accounts?access_token=${accessToken}`
    );

    res.send(data.data.data);

    data.data.data.forEach(async (page) => {
      subscribe(page.id, page.access_token);
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
