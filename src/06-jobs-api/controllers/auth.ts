import { Request, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import User from "../models/User";
import bcrypt from "bcryptjs";

interface MyRequest extends Request {
  body: { name: string; email: string; password: string };
}

const register: RequestHandler = async (req: MyRequest, res) => {
  const { email, password, name } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = { name, email, hashedPassword };
  // if (!name || !email || !password) {
  //   throw new BadRequestError("Please provide name, email and password");
  // }

  const user = await User.create({ ...tempUser, password: hashedPassword });
  res.status(StatusCodes.CREATED).json({ user });
};
const login: RequestHandler = async (req, res) => {
  res.send("login user");
};
export { login, register };
