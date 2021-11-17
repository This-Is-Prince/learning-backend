"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPerson = void 0;
const http_status_codes_1 = require("http-status-codes");
const Person_1 = __importDefault(require("../models/Person"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const createPerson = async (req, res) => {
    let person = req.body;
    const data = await Person_1.default.create(person);
    const id = data._id;
    const fullName = data.fname + " " + data.lname;
    const token = jsonwebtoken_1.default.sign({ id, fullName }, process_1.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ token, data });
};
exports.createPerson = createPerson;
