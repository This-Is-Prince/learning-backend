class CustomError extends Error {
  statusCode = 0;
  constructor(msg: string) {
    super(msg);
  }
}
export default CustomError;
