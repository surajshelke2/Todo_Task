const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const app = express();
const dotenv = require("dotenv");

app.use(express.json());
app.use(cookieParser());
module.exports = app;
dotenv.config({
  path: "./data/config.env",
});

app.use(
  cors({
    origin:[process.env.FRONTEND_URI],
    methods:["GET",'PUT','DELETE','POST'],
    credentials:true

  })
)
const userRouter = require("./router/user");
const taskRouter = require("./router/task");
const { errormiddleware } = require("./middleware/error");



app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});

app.use(errormiddleware);
