const express = require("express");
const bodyParser = require("body-parser");
const { signString } = require("./utils/tools");
const createOrder = require("./service/createOrderService");

const app = express(); // ✅ Only declare once

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handle preflight CORS requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, PUT, DELETE"
  );
  res.sendStatus(200);
});

// Apply CORS headers to all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, PUT, DELETE"
  );
  res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
  next();
});

app.post("/create/order", function (req, res) {
  createOrder.createOrder(req, res);
});

// Start the server
const serverPort = 8081;
app.listen(serverPort, function () {
  console.log("server started, port:" + serverPort);
});
