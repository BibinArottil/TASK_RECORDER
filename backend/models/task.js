import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task_no: {
    type: String,
    required: true,
    trim: true,
  },
  time_hour: {
    type: Number,
    required: true,
    trim: true,
  },
  time_minutes: {
    type: Number,
    required: true,
    trim: true,
  },
  total_hours: {
    type: Number,
    default: 0,
    trim: true,
  },
  notes: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const taskModel = mongoose.model("Task", taskSchema);
