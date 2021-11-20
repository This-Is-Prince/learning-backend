"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJob = exports.getJob = exports.deleteJob = exports.getAllJobs = exports.createJob = void 0;
const Jobs_1 = __importDefault(require("../models/Jobs"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
// Get all jobs
const getAllJobs = async (req, res) => {
    const jobs = await Jobs_1.default.find({ createdBy: req.user.userId }).sort("createdAt");
    res.status(http_status_codes_1.StatusCodes.OK).json({ jobs, count: jobs.length });
};
exports.getAllJobs = getAllJobs;
// Get single job
const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId }, } = req;
    const job = await Jobs_1.default.findOne({
        _id: jobId,
        createdBy: userId,
    });
    if (!job) {
        throw new errors_1.NotFoundError(`No job with id ${jobId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ job });
};
exports.getJob = getJob;
// Create single job
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Jobs_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ job });
};
exports.createJob = createJob;
// Update Job
const updateJob = async (req, res) => {
    const { body: { company, position }, user: { userId }, params: { id: jobId }, } = req;
    if (company === "" || position === "") {
        throw new errors_1.BadRequestError(`Company or Position Fields can't be empty`);
    }
    const job = await Jobs_1.default.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true });
    if (!job) {
        throw new errors_1.NotFoundError(`No Job with id ${jobId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ job });
};
exports.updateJob = updateJob;
// Delete Job
const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId }, } = req;
    const job = await Jobs_1.default.findOneAndRemove({
        _id: jobId,
        createdBy: userId,
    });
    if (!job) {
        throw new errors_1.NotFoundError(`No Job with id ${jobId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ job });
};
exports.deleteJob = deleteJob;
