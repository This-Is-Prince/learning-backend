import CustomError from "./custom";
import { StatusCodes } from "http-status-codes";

class AuthenticationError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  constructor(msg: string) {
    super(msg);
  }
}
export default AuthenticationError;
