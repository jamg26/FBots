const express = require("express");
const http = require("http");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
require("./services/cache");
require("./models/pages");
require("./models/user");
require("./models/category");
require("./models/product");
require("./models/automated");
require("./models/settings");
require("./models/orders");
require("./models/customer");
const router = require("./router");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// App Setup
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
router(app);
require("./facebook")(app);
//

if (["production"].includes(process.env.NODE_ENV)) {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log("Server is Listening on: ", port);
