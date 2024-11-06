const Task = require("../models/taskModel");
const User = require("../models//usersModel");

const createTask = async (req, res) => {
  try {
    const {
      taskId,
      taskName,
      description,
      assignedTo,
      attachments,
      status,
      dueDate,
    } = req.body;

    const newTask = new Task({
      taskId,
      taskName,
      description,
      assignedTo,
      attachments,
      status,
      dueDate,
    });

    await newTask.save();

    return res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error creating task",
      error: err.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    return res.status(200).json({
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error fetching tasks",
      error: err.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findOne({ taskId });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task fetched successfully",
      task,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error fetching task",
      error: err.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { taskName, description, assignedTo, attachments, status, dueDate } =
      req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { taskId },
      {
        taskName,
        description,
        assignedTo,
        attachments,
        status,
        dueDate,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error updating task",
      error: err.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findOneAndDelete({ taskId });

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error deleting task",
      error: err.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
