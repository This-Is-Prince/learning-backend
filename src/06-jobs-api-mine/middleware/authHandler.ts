import { RequestHandler } from "express";

const authHandler: RequestHandler = async (req, res, next) => {
  console.log("auth handler");
  next();
};
export default authHandler;
