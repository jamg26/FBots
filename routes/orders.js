module.exports = function (app, requireAuth, Orders, cleanCache) {
  app.get("/api/orders", requireAuth, Orders.getOrders);
  app.post("/api/orders/search", requireAuth, Orders.searchOrder);
  app.put("/api/orders", requireAuth, Orders.updateOrder, cleanCache);
};
