import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Person from "../models/Person";

const createPerson: RequestHandler = async (req, res) => {
  const person = req.body;
  const data = await Person.create(person);
  res.status(StatusCodes.CREATED).json(data);
};

export { createPerson };
