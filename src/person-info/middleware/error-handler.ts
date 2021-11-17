import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors";

interface ValidationErrorMsgType {
  [key: string]: string;
}
const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  } else if (err.name === "ValidationError") {
    const errors = err.errors;
    let msg: ValidationErrorMsgType = {};
    for (let key in errors) {
      msg[key] = errors[key].message;
    }
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(msg);
  } else {
    console.error(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Something went wrong try again later");
  }
};

export default errorHandlerMiddleware;
