import CustomError from "./custom-error";

class UnauthorizedError extends CustomError {
  statusCode = 401;
  constructor(msg: string) {
    super(msg);
  }
}
export default UnauthorizedError;
