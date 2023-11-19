import { Router } from "express";
import { addTask } from "../controllers/addTask.js";
import { taskList } from "../controllers/home.js";
import { editTask, subTaskView, submit } from "../controllers/editTask.js";

const task = Router();

task.route("/home").get(taskList);
task.route("/add-task").post(addTask);
task.route("/sub-task/:id").get(subTaskView);
task.route("/edit-task").post(editTask);
task.route("/submit/:id").post(submit);

export default task;
