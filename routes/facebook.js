module.exports = function (app, Facebook) {
  app.post("/api/facebook/pageTokens", Facebook.getFbTokens);
};
