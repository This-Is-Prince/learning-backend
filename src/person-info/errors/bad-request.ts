import CustomError from "./custom-error";

class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(msg: string) {
    super(msg);
  }
}
export default BadRequestError;
