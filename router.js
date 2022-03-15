// routes
const settingsRoutes = require("./routes/settings");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/products");
const automatedRoutes = require("./routes/automated");
const orderRoutes = require("./routes/orders");
const usersRoutes = require("./routes/users");
const pagesRoutes = require("./routes/pages");
const stripeRoutes = require("./routes/stripe");
const facebookRoutes = require("./routes/facebook");
const customerRoutes = require("./routes/customers");
const gcashRoutes = require("./routes/gcash");

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
const Facebook = require("./controllers/facebook");
const Customer = require("./controllers/customers");
const Gcash = require("./controllers/gcash");

const passportService = require("./services/passport");
const passport = require("passport");

const cleanCache = require("./middlewares/cleanCache");
const cleanCacheAll = require("./middlewares/cleanCacheAll");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });

module.exports = function (app) {
  authRoutes(app, requireAuth, requireSignIn, Authentication);
  categoryRoutes(app, requireAuth, Category, cleanCache);
  productRoutes(app, requireAuth, Product, cleanCache);
  settingsRoutes(app, requireAuth, Settings, cleanCache);
  automatedRoutes(app, requireAuth, Automated, cleanCache);
  orderRoutes(app, requireAuth, Orders, cleanCache);
  usersRoutes(app, requireAuth, Users);
  pagesRoutes(app, requireAuth, Pages, cleanCache);
  customerRoutes(app, requireAuth, Customer);
  stripeRoutes(app, Stripe);
  facebookRoutes(app, Facebook);
  gcashRoutes(app, Gcash);
};
