module.exports = function (app, requireAuth, Pages, cleanCache) {
  app.get("/api/pages", requireAuth, Pages.getPages);
  app.post("/api/pages", requireAuth, Pages.addPage, cleanCache);
  app.delete("/api/pages", requireAuth, Pages.deletePage, cleanCache);
  app.put("/api/pages", requireAuth, Pages.updatePage, cleanCache);
};
