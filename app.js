const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Install using: npm install cors
const { signString } = require("./utils/tools");
const createOrder = require("./service/createOrderService");

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS Configuration (Allow requests from the Vite + React frontend)
const allowedOrigins = [
  "https://telebirr-dawe.onrender.com",
  "http://localhost:3000", // Optional: For local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "X-API-KEY",
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Access-Control-Request-Method",
    ],
  })
);

// Route definitions
app.post("/create/order", function (req, res) {
  createOrder.createOrder(req, res);
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof TypeError && err.message.includes("Missing parameter name")) {
    return res.status(400).json({ 
      error: "Invalid route path configuration",
      details: err.message 
    });
  }
  next(err);
});

// Start the server
const serverPort = 8081;
app.listen(serverPort, function () {
  console.log("Server started, port: " + serverPort);
});
