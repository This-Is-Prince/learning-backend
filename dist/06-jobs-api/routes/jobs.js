"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobs_1 = require("../controllers/jobs");
const router = (0, express_1.Router)();
router.route("/").post(jobs_1.createJob).get(jobs_1.getAllJobs);
router.route("/:id").get(jobs_1.getJob).delete(jobs_1.deleteJob).patch(jobs_1.updateJob);
exports.default = router;
