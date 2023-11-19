import { taskModel } from "../models/task.js";

export const addTask = async (req, res) => {
  try {
    const { task_no, time_hour, time_minutes } = req.body.values;
    const existTask = await taskModel.findOne({ task_no: task_no });
    const htmlString = String(req.body.note);
    const match = htmlString.match(/<p>(.*?)<\/p>/);
    const notes = match ? match[1] : null;

    if (existTask) {
      res.json({ message: "This task already exists", state: false });
    } else {
      taskModel.create({
        task_no,
        time_hour,
        time_minutes,
        notes,
      });
    }
    res.status(200).json({ message: "New task submitted", state: true });
  } catch (error) {
    console.log(error.message);
  }
};
