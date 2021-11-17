"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPerson = void 0;
const http_status_codes_1 = require("http-status-codes");
const Person_1 = __importDefault(require("../models/Person"));
const createPerson = async (req, res) => {
    const person = req.body;
    const data = await Person_1.default.create(person);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(data);
};
exports.createPerson = createPerson;
