import { RequestHandler, Request } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";

interface RegisterRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

const register: RequestHandler = async (req: RegisterRequest, res) => {
  const user = await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({
      msg: "Successfully Created...",
      data: { user, token: user.createJWT() },
    });
};
const login: RequestHandler = async (req, res) => {
  res.send("login");
};

export { register, login };
