module.exports = function (app, requireAuth, requireSignIn, Authentication) {
  app.post("/api/signin", requireSignIn, Authentication.signin);
  app.post("/api/signup", requireAuth, Authentication.signup);
};
