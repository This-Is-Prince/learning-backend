import { RequestHandler } from "express";
import CustomAPIError from "../errors/custom-error";
import jwt from "jsonwebtoken";
import { env } from "process";

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      JWT_SECRET: string;
    }
  }
}

// check username, password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  // mongo validation
  // Joi
  // check in the controller
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  // just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!
  const token = jwt.sign({ id, username }, env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // res.send("Fake login/Register/Signup");
  res.status(200).json({ msg: "user created", token });
};

const dashboard: RequestHandler = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const luckyNumber = Math.floor(Math.random() * 100);
    if (typeof decoded !== "string") {
      res.status(200).json({
        msg: `Hello, ${decoded.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
      });
    }
  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route", 401);
  }
};

export { login, dashboard };
