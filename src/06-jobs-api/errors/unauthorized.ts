import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-api";

class UnAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  constructor(msg: string) {
    super(msg);
  }
}
export default UnAuthorizedError;
