import { ErrorRequestHandler } from "express";
import { CustomAPIError } from "../errors/custom-error";

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  //   return res.status(500).json({ msg: `Something went wrong, try again later` });

  if (err instanceof CustomAPIError) {
    return res.status(err.status).json({ msg: err.message });
  } else {
    return res
      .status(500)
      .json({ msg: `Something went wrong, please try again` });
  }
};
export default errorHandlerMiddleware;
