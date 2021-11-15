import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class UnauthenticatedError extends CustomAPIError {
  statusCode = StatusCodes.UNAUTHORIZED;
  constructor(message: string) {
    super(message);
  }
}

export default UnauthenticatedError;
