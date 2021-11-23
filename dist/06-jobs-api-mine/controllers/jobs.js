"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJob = exports.updateJob = exports.getAllJobs = exports.deleteJob = exports.createJob = void 0;
const Job_1 = __importDefault(require("../models/Job"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const getAllJobs = async (req, res) => {
    const jobs = await Job_1.default.find({ createdBy: req.user.userId }).sort("createdAt");
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "Successfully finds all jobs...",
        data: { jobs, count: jobs.length },
    });
};
exports.getAllJobs = getAllJobs;
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job_1.default.create(req.body);
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ msg: "Successfully created...", data: { job } });
};
exports.createJob = createJob;
const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId }, } = req;
    const job = await Job_1.default.findOne({ createdBy: userId, _id: jobId });
    if (!job) {
        throw new errors_1.NotFoundError(`No job with id ${jobId}...`);
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: "Successfully find a job...", data: { job } });
};
exports.getJob = getJob;
const updateJob = async (req, res) => {
    const { body: { company, position }, user: { userId }, params: { id: jobId }, } = req;
    if (company === "" || position === "") {
        throw new errors_1.BadRequest("Company or Position fields cannot be empty...");
    }
    const job = await Job_1.default.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true });
    if (!job) {
        throw new errors_1.NotFoundError(`No job with id ${jobId}...`);
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: "Successfully update a job...", data: { job } });
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId }, } = req;
    const job = await Job_1.default.findOneAndRemove({ createdBy: userId, _id: jobId });
    if (!job) {
        throw new errors_1.NotFoundError(`No job with id ${jobId}...`);
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: "Successfully delete a job...", data: { job } });
};
exports.deleteJob = deleteJob;
