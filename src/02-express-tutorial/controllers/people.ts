import { RequestHandler } from "express";
import { people } from "../data";

const getPeople: RequestHandler = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson: RequestHandler = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).json({ success: true, person: name });
};

const createPersonPostman: RequestHandler = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).json({ success: true, data: [...people, name] });
};

const updatePerson: RequestHandler = (req, res) => {
  const { peopleID } = req.params;
  const { name } = req.body;
  const person = people.find((person) => {
    return person.id === Number(peopleID);
  });
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${peopleID}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(peopleID)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
};

const deletePerson: RequestHandler = (req, res) => {
  const { peopleID } = req.params;

  const person = people.find((person) => {
    return person.id === Number(peopleID);
  });

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${peopleID}` });
  }
  const newPeople = people.filter((person) => person.id !== Number(peopleID));
  res.status(200).json({ success: true, data: newPeople });
};

export {
  getPeople,
  deletePerson,
  createPerson,
  updatePerson,
  createPersonPostman,
};
