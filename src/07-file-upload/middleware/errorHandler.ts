import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandler: ErrorRequestHandler = async (err, _, res) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || `Something went wrong try again later...`,
  };
  res.status(customError.statusCode).json({ msg: customError.msg });
};
export default errorHandler;
