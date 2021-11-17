import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Person from "../models/Person";
import jwt from "jsonwebtoken";
import { env } from "process";

const createPerson: RequestHandler = async (req, res) => {
  let person = req.body;
  const data = await Person.create(person);
  const id = data._id;
  const fullName = data.fname + " " + data.lname;
  const token = jwt.sign({ id, fullName }, env.JWT_SECRET, { expiresIn: "1d" });
  res.status(StatusCodes.CREATED).json({ token, data });
};

export { createPerson };
