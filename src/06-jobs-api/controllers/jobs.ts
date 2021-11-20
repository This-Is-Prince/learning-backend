import { RequestHandler } from "express";

// Get all jobs
const getAllJobs: RequestHandler = async (req, res) => {
  res.send("get all jobs");
};

// Get single job
const getJob: RequestHandler = async (req, res) => {
  res.send("get job");
};

// Create single job
const createJob: RequestHandler = async (req, res) => {
  res.json(req.user);
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
