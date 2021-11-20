"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJob = exports.getJob = exports.deleteJob = exports.getAllJobs = exports.createJob = void 0;
// Get all jobs
const getAllJobs = async (req, res) => {
    res.send("get all jobs");
};
exports.getAllJobs = getAllJobs;
// Get single job
const getJob = async (req, res) => {
    res.send("get job");
};
exports.getJob = getJob;
// Create single job
const createJob = async (req, res) => {
    res.send("create job");
};
exports.createJob = createJob;
// Update Job
const updateJob = async (req, res) => {
    res.send("update job");
};
exports.updateJob = updateJob;
// Delete Job
const deleteJob = async (req, res) => {
    res.send("delete job");
};
exports.deleteJob = deleteJob;
