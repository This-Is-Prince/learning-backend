import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const notFound: RequestHandler = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).send("Route does not exist");

export default notFound;
