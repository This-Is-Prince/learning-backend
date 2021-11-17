import { RequestHandler } from "express";

const createPerson: RequestHandler = async (req, res) => {
  res.send("person created");
};

export { createPerson };
