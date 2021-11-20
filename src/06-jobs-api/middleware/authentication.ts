import { RequestHandler } from "express";
import { UnAuthorizedError } from "../errors";
import * as jwt from "jsonwebtoken";
import { env } from "process";
import User from "../models/User";

interface JwtPayload extends jwt.JwtPayload {
  userID: string;
  name: string;
}
declare global {
  namespace Express {
    export interface Request {
      user: { name: string; userId: string };
    }
  }
}

const authenticationMiddleware: RequestHandler = async (req, res, next) => {
  // check header
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnAuthorizedError("Authentication invalid.");
  }
  const token = authorization.split(" ")[1];
  try {
    const { name, userId } = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    // attach the user to the job routes
    // const user=User.findById(userId).select('-password');
    // req.user=user;
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnAuthorizedError("Authentication invalid");
  }
};

export default authenticationMiddleware;
