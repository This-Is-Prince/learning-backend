"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.login = void 0;
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const http_status_codes_1 = require("http-status-codes");
// check username, password in post(login) request
// if exist create new JWT
// send back to front-end
// setup authentication so only the request with JWT can access the dashboard
const login = async (req, res) => {
    const { username, password } = req.body;
    // mongo validation
    // Joi
    // check in the controller
    if (!username || !password) {
        throw new errors_1.BadRequest("Please provide email and password");
    }
    // just for demo, normally provided by DB!!!!
    const id = new Date().getDate();
    // try to keep payload small, better experience for user
    // just for demo, in production use long, complex and unguessable string value!!!!!!!!
    const token = jsonwebtoken_1.default.sign({ id, username }, process_1.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    // res.send("Fake login/Register/Signup");
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "user created", token });
};
exports.login = login;
const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    const { id, username } = req.user;
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: `Hello, ${username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
};
exports.dashboard = dashboard;
