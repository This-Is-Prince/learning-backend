import { StatusCodes } from "http-status-codes";
import CustomError from "./custom";

class BadRequest extends CustomError {
  statusCode = StatusCodes.BAD_GATEWAY;
  constructor(msg: string) {
    super(msg);
  }
}

export default BadRequest;
