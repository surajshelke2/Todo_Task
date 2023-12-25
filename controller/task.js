const { ErrorHandler } = require("../middleware/error");
const Task = require("../model/task");

const addTask = async (req, res,next) => {
  try {
    const { title, description, isCompleted } = req.body;

    console.log(req.body.user);

    const task = await Task.create({
      title,
      description,
      isCompleted,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task is Added !!",
    });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res,next) => {
  try {
    const task = await Task.find(req._id);

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req,res,next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task Not Found !!", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(201).json({
      success: true,
      message: "The is Updated !!",
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res,next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task Not Found !!", 404));

    await task.deleteOne();

    res.status(201).json({
      success: true,
      message: "The is deleted !!",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { addTask, getTask, updateTask, deleteTask };
