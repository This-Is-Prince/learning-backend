import { Request, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthorizedError } from "../errors";
import User from "../models/User";

interface RegisterRequest extends Request {
  body: { name: string; email: string; password: string };
}
interface LoginRequest extends Request {
  body: { email: string; password: string };
}

const register: RequestHandler = async (req: RegisterRequest, res) => {
  const user = await User.create({ ...req.body });

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, token: user.createJWT() });
};
const login: RequestHandler = async (req: LoginRequest, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthorizedError("Invalid Credentials");
  }

  // Comparing the password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthorizedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ token, user: { name: user.name } });
};
export { login, register };
