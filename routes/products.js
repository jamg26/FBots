module.exports = function (app, requireAuth, Product, cleanCache) {
  app.get("/api/product", requireAuth, Product.getProducts);
  app.post("/api/product", requireAuth, Product.addProduct, cleanCache);
  app.put("/api/product", requireAuth, Product.updateProduct, cleanCache);
  app.delete("/api/product", requireAuth, Product.deleteProduct, cleanCache);
};
