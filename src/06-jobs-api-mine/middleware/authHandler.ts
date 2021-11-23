import { RequestHandler } from "express";
import { AuthenticationError } from "../errors";
import jwt from "jsonwebtoken";
import { env } from "process";

interface JwtPayload extends jwt.JwtPayload {
  userId: string;
  name: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: { name: string; userId: string };
    }
  }
}

const authHandler: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthenticationError("Authentication invalid...");
  }
  const token = authHeader.split(" ")[1];
  try {
    const { name, userId } = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new AuthenticationError("Authentication invalid...");
  }
};
export default authHandler;
