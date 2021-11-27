import CustomError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  constructor(msg: string) {
    super(msg);
  }
}
export default NotFoundError;
