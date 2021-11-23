import { RequestHandler, Request } from "express";
import Job from "../models/Job";
import { StatusCodes } from "http-status-codes";
import { BadRequest, NotFoundError } from "../errors";

interface CreateJobRequest extends Request {
  body: {
    company: string;
    position: string;
    createdBy: string;
  };
}
interface UpdateJobRequest extends Request {
  body: {
    company: string;
    position: string;
  };
}

const getAllJobs: RequestHandler = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({
    msg: "Successfully finds all jobs...",
    data: { jobs, count: jobs.length },
  });
};

const createJob: RequestHandler = async (req: CreateJobRequest, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Successfully created...", data: { job } });
};

const getJob: RequestHandler = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ createdBy: userId, _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}...`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully find a job...", data: { job } });
};

const updateJob: RequestHandler = async (req: UpdateJobRequest, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequest("Company or Position fields cannot be empty...");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}...`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully update a job...", data: { job } });
};

const deleteJob: RequestHandler = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOneAndRemove({ createdBy: userId, _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}...`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully delete a job...", data: { job } });
};

export { createJob, deleteJob, getAllJobs, updateJob, getJob };
