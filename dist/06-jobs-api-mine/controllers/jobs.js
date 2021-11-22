"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJob = exports.updateJob = exports.getAllJobs = exports.deleteJob = exports.createJob = void 0;
const getAllJobs = async (req, res) => {
    res.send("get all jobs");
};
exports.getAllJobs = getAllJobs;
const getJob = async (req, res) => {
    res.send("get job");
};
exports.getJob = getJob;
const createJob = async (req, res) => {
    res.send("create job");
};
exports.createJob = createJob;
const updateJob = async (req, res) => {
    res.send("update job");
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    res.send("delete job");
};
exports.deleteJob = deleteJob;
