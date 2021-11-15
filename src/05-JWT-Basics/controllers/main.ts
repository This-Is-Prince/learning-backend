import { RequestHandler } from "express";
import { BadRequest } from "../errors";

import jwt from "jsonwebtoken";
import { env } from "process";
import { StatusCodes } from "http-status-codes";

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
    throw new BadRequest("Please provide email and password");
  }

  // just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!
  const token = jwt.sign({ id, username }, env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // res.send("Fake login/Register/Signup");
  res.status(StatusCodes.OK).json({ msg: "user created", token });
};

const dashboard: RequestHandler = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  const { id, username } = req.user;
  res.status(StatusCodes.OK).json({
    msg: `Hello, ${username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

export { login, dashboard };
