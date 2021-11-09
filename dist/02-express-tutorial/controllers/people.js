"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPersonPostman = exports.updatePerson = exports.createPerson = exports.deletePerson = exports.getPeople = void 0;
const data_1 = require("../data");
const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: data_1.people });
};
exports.getPeople = getPeople;
const createPerson = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res
            .status(400)
            .json({ success: false, msg: "please provide name value" });
    }
    res.status(201).json({ success: true, person: name });
};
exports.createPerson = createPerson;
const createPersonPostman = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res
            .status(400)
            .json({ success: false, msg: "please provide name value" });
    }
    res.status(201).json({ success: true, data: [...data_1.people, name] });
};
exports.createPersonPostman = createPersonPostman;
const updatePerson = (req, res) => {
    const { peopleID } = req.params;
    const { name } = req.body;
    const person = data_1.people.find((person) => {
        return person.id === Number(peopleID);
    });
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${peopleID}` });
    }
    const newPeople = data_1.people.map((person) => {
        if (person.id === Number(peopleID)) {
            person.name = name;
        }
        return person;
    });
    res.status(200).json({ success: true, data: newPeople });
};
exports.updatePerson = updatePerson;
const deletePerson = (req, res) => {
    const { peopleID } = req.params;
    const person = data_1.people.find((person) => {
        return person.id === Number(peopleID);
    });
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${peopleID}` });
    }
    const newPeople = data_1.people.filter((person) => person.id !== Number(peopleID));
    res.status(200).json({ success: true, data: newPeople });
};
exports.deletePerson = deletePerson;
