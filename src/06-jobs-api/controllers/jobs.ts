import { RequestHandler, Request } from "express";
import Job from "../models/Jobs";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";

export interface CreateJobRequest extends Request {
  body: { createdBy: string };
}
export interface UpdateJobRequest extends Request {
  body: { company: string; position: string };
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
const updateJob: RequestHandler = async (req: UpdateJobRequest, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (company === "" || position === "") {
    throw new BadRequestError(`Company or Position Fields can't be empty`);
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No Job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

// Delete Job
const deleteJob: RequestHandler = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOneAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No Job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
export { createJob, getAllJobs, deleteJob, getJob, updateJob };
