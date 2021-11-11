"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_1 = require("../controllers/tasks");
const router = (0, express_1.Router)();
router.route("/").get(tasks_1.getAllTasks).post(tasks_1.createTask);
router.route("/:id").get(tasks_1.getTask).patch(tasks_1.updateTask).delete(tasks_1.deleteTask);
exports.default = router;
