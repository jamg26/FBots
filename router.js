//controllers
const Authentication = require("./controllers/authentication");
const Category = require("./controllers/category");
const Product = require("./controllers/product");
const Settings = require("./controllers/settings");
const Automated = require("./controllers/automated");
const Orders = require("./controllers/orders");
const Users = require("./controllers/users");
const Pages = require("./controllers/pages");
const Stripe = require("./controllers/stripe");

const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });

module.exports = function (app) {
  //auth
  app.post("/api/signin", requireSignIn, Authentication.signin);
  app.post("/api/signup", requireAuth, Authentication.signup);
  // app.post("/api/signout", (req, res) => req.session.destroy());
  //category
  app.post("/api/category", requireAuth, Category.addCategory);
  app.get("/api/category", requireAuth, Category.getCategory);
  app.put("/api/category", requireAuth, Category.updateCategory);
  app.delete("/api/category", requireAuth, Category.deleteCategory);
  //product
  app.get("/api/product", requireAuth, Product.getProducts);
  app.post("/api/product", requireAuth, Product.addProduct);
  app.put("/api/product", requireAuth, Product.updateProduct);
  app.delete("/api/product", requireAuth, Product.deleteProduct);
  //settings
  app.post("/api/settings/password", requireAuth, Settings.changePassword);
  app.post("/api/settings/logo", requireAuth, Settings.changeLogo);
  app.post("/api/settings/cover", requireAuth, Settings.changeCover);
  app.post("/api/settings/pageid", requireAuth, Settings.changePageId);
  app.post("/api/settings/token", requireAuth, Settings.changePageToken);
  app.post("/api/settings/pageName", requireAuth, Settings.changePageName);
  app.post(
    "/api/settings/stripePublic",
    requireAuth,
    Settings.changeStripePublic
  );
  app.post(
    "/api/settings/stripeSecret",
    requireAuth,
    Settings.changeStripeSecret
  );
  app.get("/api/settings", requireAuth, Settings.getSettings);
  //automated
  app.post("/api/automated", requireAuth, Automated.addAutomated);
  app.get("/api/automated", requireAuth, Automated.getAutomated);
  app.delete("/api/automated", requireAuth, Automated.deleteAutomated);
  app.put("/api/automated", requireAuth, Automated.updateAutomated);
  //orders
  app.get("/api/orders", requireAuth, Orders.getOrders);
  app.post("/api/orders/search", requireAuth, Orders.searchOrder);
  app.put("/api/orders", requireAuth, Orders.updateOrder);
  //users
  app.get("/api/users", requireAuth, Users.getUsers);
  app.delete("/api/users", requireAuth, Users.deleteUser);
  //pages
  app.get("/api/pages", requireAuth, Pages.getPages);
  app.post("/api/pages", requireAuth, Pages.addPage);
  app.delete("/api/pages", requireAuth, Pages.deletePage);
  app.put("/api/pages", requireAuth, Pages.updatePage);
  //stripe
  app.post("/payments/stripe/create", Stripe.createSession);
  app.get(
    "/payments/stripe/success/:id/:orderid/:pageid",
    Stripe.paymentSuccess
  );
};
