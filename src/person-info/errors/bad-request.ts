import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error";

class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  constructor(msg: string) {
    super(msg);
  }
}
export default BadRequestError;
