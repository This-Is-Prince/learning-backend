import { RequestHandler } from "express";

const getALlTasks: RequestHandler = (req, res) => {
  console.log("get all tasks");
  res.send("get all tasks");
};
const createTask: RequestHandler = (req, res) => {
  console.log("create task");
  res.json(req.body);
};
const getTask: RequestHandler = (req, res) => {
  console.log("get single task");
  let { id } = req.params;
  res.json({ id });
};
const updateTask: RequestHandler = (req, res) => {
  console.log("update task");
  res.send("update task");
};
const deleteTask: RequestHandler = (req, res) => {
  console.log("delete task");
  res.send("delete task");
};
export { createTask, deleteTask, getALlTasks, getTask, updateTask };
