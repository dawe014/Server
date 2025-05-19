const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // ✅ Import cors package

const app = express();
const { signString } = require("./utils/tools");
const createOrder = require("./service/createOrderService");

// ✅ Use cors middleware with your frontend's domain
app.use(cors({
  origin: "https://telebirr-dawe.onrender.com", // 👈 Replace with your actual frontend domain
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  credentials: true // optional, only needed if you're using cookies or auth headers
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/create/order", function (req, res) {
  createOrder.createOrder(req, res);
});

// start server
let serverPort = 8081;
app.listen(serverPort, function () {
  console.log("server started, port:" + serverPort);
});
