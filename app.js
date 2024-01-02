const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const dotenv = require("dotenv");

const app = express();

// Load environment variables
dotenv.config({
  path: "./data/config.env",
});

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URI],
  methods: ["GET", "PUT", "DELETE", "POST"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routers
const userRouter = require("./router/user");
const taskRouter = require("./router/task");

// Routes
app.get("/", (req, res) => {
  res.send("Nice working");
});

// API Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

// Error Handling Middleware
const { errormiddleware } = require("./middleware/error");
app.use(errormiddleware);

module.exports = app;
