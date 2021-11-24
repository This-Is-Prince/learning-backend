import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

interface ValidationError extends Object {
  path: string;
  kind: string;
  message: string;
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong...",
    data: null,
  };

  /**
   * User Register Error
   */
  if (err.name === "ValidationError") {
    let errorsArr = Object.values(err.errors) as ValidationError[];
    let errors = errorsArr.map((err) => {
      let { path, kind, message } = err;
      return { path, kind, message };
    });
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = errors;
  }
  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `User already exist with email ${err.keyValue.email} ...`;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  /**
   * Response for error
   */
  res
    .status(customError.statusCode)
    .json({ msg: customError.msg, data: customError.data });
};

export default errorHandler;
