import { RequestHandler } from "express";

const register: RequestHandler = async (req, res) => {
  res.send("register");
};
const login: RequestHandler = async (req, res) => {
  res.send("login");
};

export { register, login };
