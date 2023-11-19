import mongoose from "mongoose";
import { subTask } from "../models/subTask.js";
import { taskModel } from "../models/task.js";

export const editTask = async (req, res) => {
  try {
    const { time_hour, time_minutes } = req.body.values;
    const htmlString = String(req.body.note);
    const match = htmlString.match(/<p>(.*?)<\/p>/);
    const notes = match ? match[1] : null;
    const id = req.body.taskId;
    const existTask = await subTask.findOne({
      taskId: new mongoose.Types.ObjectId(id),
    });
    if (existTask) {
      await subTask.findByIdAndUpdate(existTask._id, {
        $push: {
          sub_task: {
            time_hour: time_hour,
            time_minutes: time_minutes,
            notes: notes,
          },
        },
      });
      res.json({ message: "Task updated", state: true });
    } else {
      subTask.create({
        taskId: id,
        sub_task: [
          {
            time_hour,
            time_minutes,
            notes,
          },
        ],
      });
    }
    res.json({ message: "Sub task created", state: true });
  } catch (error) {
    console.log(error.message);
  }
};

export const subTaskView = async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = await subTask.findOne({
      taskId: new mongoose.Types.ObjectId(taskId),
    });
    res.json({ taskData: taskData });
  } catch (error) {
    console.log(error.message);
  }
};

export const submit = async (req, res) => {
  try {
    const id = req.params.id;
    const hours = req.body.hours;
    await taskModel.findByIdAndUpdate(id, {
      $set: { total_hours: hours, completed: true },
    });
    res.json({ message: "Task completed", state: true });
  } catch (error) {
    console.log(error.message);
  }
};
