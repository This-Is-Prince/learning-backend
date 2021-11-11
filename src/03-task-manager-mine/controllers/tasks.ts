import { RequestHandler } from "express";
import Task from "../models/Task";

const getAllTasks: RequestHandler = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!" });
  }
};
const createTask: RequestHandler = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!" });
  }
};
const getTask: RequestHandler = async (req, res) => {
  try {
    let { id: taskID } = req.params;
    const task = await Task.findById(taskID);
    if (!task) {
      return res.status(404).json({ msg: "task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!" });
  }
};
const updateTask: RequestHandler = async (req, res) => {
  try {
    let { id: taskID } = req.params;
    const task = await Task.findByIdAndUpdate(taskID, req.body, { new: true });
    if (!task) {
      return res.status(404).json({
        msg: `couldn't update task,because task not found with id ${taskID}`,
      });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!" });
  }
};
const deleteTask: RequestHandler = async (req, res) => {
  try {
    let { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete(taskID);
    if (!task) {
      return res.status(404).json({
        msg: `couldn't delete task,because task not found with id ${taskID}`,
      });
    }
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

export { createTask, deleteTask, getAllTasks, getTask, updateTask };
