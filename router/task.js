const express = require("express");
const {
  addTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controller/task");
const isAuthenticated = require("../middleware/auth");

const router = express.Router();

router.post("/add", isAuthenticated, addTask);

router.get("/getAll", isAuthenticated, getTask);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

module.exports = router;
