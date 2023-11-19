import { taskModel } from "../models/task.js";

export const taskList = async (req, res) => {
  try {
    const list = await taskModel.find();
    res.json({ list });
  } catch (error) {
    console.log(error.message);
  }
};
