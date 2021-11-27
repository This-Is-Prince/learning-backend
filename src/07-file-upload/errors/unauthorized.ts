import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error";

class UnAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  constructor(msg: string) {
    super(msg);
  }
}

export default UnAuthorizedError;
