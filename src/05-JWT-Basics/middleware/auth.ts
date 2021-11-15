import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestHandler } from "express";
import { UnauthenticatedError } from "../errors";
import { env } from "process";

declare global {
  namespace Express {
    export interface Request {
      user: { id: any; username: any };
    }
  }
}

const authenticationMiddleware: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};
export default authenticationMiddleware;
