import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "process";
import { UnauthorizedError } from "../errors";

declare global {
  namespace Express {
    export interface Request {
      person: { id: any };
    }
  }
}

const authorizedMiddleware: RequestHandler = (req, res, next) => {
  let authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("No Token Provided");
  }
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    const { id } = decoded;
    req.person = { id };
    next();
  } catch (error) {
    throw new UnauthorizedError("Not authorized to access this route");
  }
};
export default authorizedMiddleware;
