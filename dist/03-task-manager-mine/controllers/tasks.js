"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.getTask = exports.getAllTasks = exports.deleteTask = exports.createTask = void 0;
const getAllTasks = (req, res) => {
    res.status(200).json({ data: "get all tasks" });
};
exports.getAllTasks = getAllTasks;
const createTask = (req, res) => {
    res.status(201).json({ data: "created task" });
};
exports.createTask = createTask;
const getTask = (req, res) => {
    res.status(200).json({ data: "get single task" });
};
exports.getTask = getTask;
const updateTask = (req, res) => {
    res.status(200).json({ data: "update task" });
};
exports.updateTask = updateTask;
const deleteTask = (req, res) => {
    res.status(200).json({ data: "delete task" });
};
exports.deleteTask = deleteTask;
