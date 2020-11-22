module.exports = function (app, requireAuth, Automated, cleanCache) {
  app.get("/api/automated", requireAuth, Automated.getAutomated);
  app.post("/api/automated", requireAuth, Automated.addAutomated, cleanCache);
  app.delete(
    "/api/automated",
    requireAuth,
    Automated.deleteAutomated,
    cleanCache
  );
  app.put("/api/automated", requireAuth, Automated.updateAutomated, cleanCache);
};
