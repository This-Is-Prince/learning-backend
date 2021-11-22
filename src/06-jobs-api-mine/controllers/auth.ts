import { RequestHandler, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, AuthenticationError } from "../errors";
import User from "../models/User";

/**
 * Request Types
 */
interface RegisterRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}
interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

/**
 * Register User
 */
const register: RequestHandler = async (req: RegisterRequest, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({
    msg: "Successfully created...",
    data: { user, token: user.createJWT() },
  });
};

/**
 * Login User
 */
const login: RequestHandler = async (req: LoginRequest, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide email and password...");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError("Invalid Credentials...");
  }

  // Comparing the password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new AuthenticationError("Invalid Credentials...");
  }

  res.status(StatusCodes.OK).json({
    msg: "Successfully login...",
    data: { user, token: user.createJWT() },
  });
};

export { register, login };
