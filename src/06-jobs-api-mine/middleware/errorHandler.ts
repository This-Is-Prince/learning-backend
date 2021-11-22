import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong...",
    data: null,
  };
  res
    .status(customError.statusCode)
    .json({ msg: customError.msg, data: customError.data });
};

export default errorHandler;
