import { Request, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import User from "../models/User";

interface MyRequest extends Request {
  body: { name: string; email: string; password: string };
}

const register: RequestHandler = async (req: MyRequest, res) => {
  const user = await User.create({ ...req.body });

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, token: user.createJWT() });
};
const login: RequestHandler = async (req, res) => {
  res.send("login user");
};
export { login, register };
