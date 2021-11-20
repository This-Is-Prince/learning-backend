import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const notFound: RequestHandler = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Not Found" });
};

export default notFound;
