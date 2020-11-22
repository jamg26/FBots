module.exports = function (app, requireAuth, Category, cleanCache) {
  app.get("/api/category", requireAuth, Category.getCategory);
  app.post("/api/category", requireAuth, Category.addCategory, cleanCache);
  app.put("/api/category", requireAuth, Category.updateCategory, cleanCache);
  app.delete("/api/category", requireAuth, Category.deleteCategory, cleanCache);
};
