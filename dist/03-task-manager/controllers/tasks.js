"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.getTask = exports.getALlTasks = exports.deleteTask = exports.createTask = void 0;
const getALlTasks = (req, res) => {
    console.log("get all tasks");
    res.send("get all tasks");
};
exports.getALlTasks = getALlTasks;
const createTask = (req, res) => {
    console.log("create task");
    res.json(req.body);
};
exports.createTask = createTask;
const getTask = (req, res) => {
    console.log("get single task");
    let { id } = req.params;
    res.json({ id });
};
exports.getTask = getTask;
const updateTask = (req, res) => {
    console.log("update task");
    res.send("update task");
};
exports.updateTask = updateTask;
const deleteTask = (req, res) => {
    console.log("delete task");
    res.send("delete task");
};
exports.deleteTask = deleteTask;
