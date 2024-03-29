module.exports = function (app, requireAuth, Users) {
  app.get("/api/users", requireAuth, Users.getUsers);
  app.delete("/api/users", requireAuth, Users.deleteUser);
  app.get("/api/current_user", requireAuth, Users.getCurrentUser);
};
