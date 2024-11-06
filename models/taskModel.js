const mongoose = require("mongoose");
const User = require("./userModel");

const taskSchema = new mongoose.Schema({
  taskId: { type: String, unique: true, required: true },
  taskName: { type: String, required: true },
  description: { type: String, required: false },
  assignedTo: [User.schema],
  attachments: [{ type: String }],
  status: {
    type: String,
    enum: ["not-started", "in-progress", "completed"],
    default: "not-started",
  },
  dueDate: { type: Date, required: false },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
