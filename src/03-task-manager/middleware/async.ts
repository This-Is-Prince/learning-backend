import { RequestHandler } from "express";

type AsyncWrapper = (fn: RequestHandler) => RequestHandler;

const asyncWrapper: AsyncWrapper = (fn: RequestHandler) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
export default asyncWrapper;
