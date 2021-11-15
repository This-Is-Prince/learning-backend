import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-error";

class BadRequest extends CustomAPIError {
  statusCode = StatusCodes.BAD_REQUEST;
  constructor(message: string) {
    super(message);
  }
}

export default BadRequest;
