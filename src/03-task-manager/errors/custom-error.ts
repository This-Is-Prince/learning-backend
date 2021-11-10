class CustomAPIError extends Error {
  constructor(message: string, public statusCode: Number) {
    super(message);
  }
}
const createCustomError = (msg: string, statusCode: Number) => {
  return new CustomAPIError(msg, statusCode);
};
export { createCustomError, CustomAPIError };
