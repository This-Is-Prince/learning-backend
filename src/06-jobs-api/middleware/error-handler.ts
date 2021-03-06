import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
// import { CustomError } from "../errors";

interface ItemType extends Object {
  [key: string]: string | Object;
  message: string;
}

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  // if (err instanceof CustomError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }
  if (err.name === "ValidationError") {
    let errorArr = Object.values(err.errors) as ItemType[];
    customError.msg = errorArr
      .map((item: ItemType) => item.message)
      .join(" , ");
    customError.statusCode === StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};
export default errorHandlerMiddleware;
