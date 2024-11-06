const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, default: "" },
  comments: [
    {
      commentId: { type: String, required: true },
      commentText: { type: String, required: true },
      status: {
        type: String,
        enum: ["pending", "completed", "in-progress"],
        default: "pending",
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
