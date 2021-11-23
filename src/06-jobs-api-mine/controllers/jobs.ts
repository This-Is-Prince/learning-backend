import { RequestHandler } from "express";

const getAllJobs: RequestHandler = async (req, res) => {
  res.send("get all jobs");
};

const getJob: RequestHandler = async (req, res) => {
  res.send("get job");
};

const createJob: RequestHandler = async (req, res) => {
  res.json(req.user);
};

const updateJob: RequestHandler = async (req, res) => {
  res.send("update job");
};

const deleteJob: RequestHandler = async (req, res) => {
  res.send("delete job");
};

export { createJob, deleteJob, getAllJobs, updateJob, getJob };
