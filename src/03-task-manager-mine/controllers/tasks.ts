import { RequestHandler } from "express";

const getAllTasks: RequestHandler = (req, res) => {
  res.status(200).json({ data: "get all tasks" });
};
const createTask: RequestHandler = (req, res) => {
  res.status(201).json({ data: "created task" });
};
const getTask: RequestHandler = (req, res) => {
  res.status(200).json({ data: "get single task" });
};
const updateTask: RequestHandler = (req, res) => {
  res.status(200).json({ data: "update task" });
};
const deleteTask: RequestHandler = (req, res) => {
  res.status(200).json({ data: "delete task" });
};

export { createTask, deleteTask, getAllTasks, getTask, updateTask };
