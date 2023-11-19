import mongoose from "mongoose";

const subTaskSchema = mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  sub_task: [
    {
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
      notes: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

export const subTask = mongoose.model("SubTask", subTaskSchema);
