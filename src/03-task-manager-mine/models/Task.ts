import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

export default mongoose.model("Task", taskSchema);
