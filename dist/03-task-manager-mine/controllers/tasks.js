"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.getTask = exports.getAllTasks = exports.deleteTask = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task_1.default.find({});
        res.status(200).json({ tasks });
    }
    catch (error) {
        res.status(500).json({ msg: "Something went wrong!" });
    }
};
exports.getAllTasks = getAllTasks;
const createTask = async (req, res) => {
    try {
        const task = await Task_1.default.create(req.body);
        res.status(201).json({ task });
    }
    catch (error) {
        res.status(500).json({ msg: "Something went wrong!" });
    }
};
exports.createTask = createTask;
const getTask = async (req, res) => {
    try {
        let { id: taskID } = req.params;
        const task = await Task_1.default.findById(taskID);
        if (!task) {
            return res.status(404).json({ msg: "task not found" });
        }
        res.status(200).json({ task });
    }
    catch (error) {
        res.status(500).json({ msg: "Something went wrong!" });
    }
};
exports.getTask = getTask;
const updateTask = async (req, res) => {
    try {
        let { id: taskID } = req.params;
        const task = await Task_1.default.findByIdAndUpdate(taskID, req.body, { new: true });
        if (!task) {
            return res.status(404).json({
                msg: `couldn't update task,because task not found with id ${taskID}`,
            });
        }
        res.status(200).json({ task });
    }
    catch (error) {
        res.status(500).json({ msg: "Something went wrong!" });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        let { id: taskID } = req.params;
        const task = await Task_1.default.findByIdAndDelete(taskID);
        if (!task) {
            return res.status(404).json({
                msg: `couldn't delete task,because task not found with id ${taskID}`,
            });
        }
        res.status(200).end();
    }
    catch (error) {
        res.status(500).json({ msg: "Something went wrong!" });
    }
};
exports.deleteTask = deleteTask;
