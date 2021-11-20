import { RequestHandler, Request } from "express";
import Job from "../models/Jobs";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";

export interface CreateJobRequest extends Request {
  body: { createdBy: string };
}

// Get all jobs
const getAllJobs: RequestHandler = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

// Get single job
const getJob: RequestHandler = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

// Create single job
const createJob: RequestHandler = async (req: CreateJobRequest, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// Update Job
const updateJob: RequestHandler = async (req, res) => {
  res.send("update job");
};

// Delete Job
const deleteJob: RequestHandler = async (req, res) => {
  res.send("delete job");
};
export { createJob, getAllJobs, deleteJob, getJob, updateJob };
