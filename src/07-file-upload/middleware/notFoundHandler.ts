import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundHandler: RequestHandler = async (_, res) => {
  res.status(StatusCodes.NOT_FOUND).send(`Route doesn't exist...`);
};
export default notFoundHandler;
