import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-api";

class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  constructor(msg: string) {
    super(msg);
  }
}
export default NotFoundError;
