module.exports = function (app, requireAuth, Orders, cleanCache) {
  app.get("/api/orders", requireAuth, Orders.getOrders);
  app.post("/api/orders/search", requireAuth, Orders.searchOrder);
  app.post("/api/orders/range", requireAuth, Orders.getOrderRange);
  app.put("/api/orders", requireAuth, Orders.updateOrder, cleanCache);
  app.delete("/api/orders", requireAuth, Orders.removeOrder, cleanCache);
};
