module.exports = function (app, requireAuth, Customers) {
  app.get("/api/customers", requireAuth, Customers.getCustomers);
  app.delete("/api/customers", requireAuth, Customers.removeCustomer);
};
