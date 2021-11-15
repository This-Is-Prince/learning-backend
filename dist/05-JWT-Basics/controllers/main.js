"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.login = void 0;
const custom_error_1 = __importDefault(require("../errors/custom-error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
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
        throw new custom_error_1.default("Please provide email and password", 400);
    }
    // just for demo, normally provided by DB!!!!
    const id = new Date().getDate();
    // try to keep payload small, better experience for user
    // just for demo, in production use long, complex and unguessable string value!!!!!!!!
    const token = jsonwebtoken_1.default.sign({ id, username }, process_1.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    // res.send("Fake login/Register/Signup");
    res.status(200).json({ msg: "user created", token });
};
exports.login = login;
const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new custom_error_1.default("No token provided", 401);
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process_1.env.JWT_SECRET);
        const luckyNumber = Math.floor(Math.random() * 100);
        if (typeof decoded !== "string") {
            res.status(200).json({
                msg: `Hello, ${decoded.username}`,
                secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
            });
        }
    }
    catch (error) {
        throw new custom_error_1.default("Not authorized to access this route", 401);
    }
};
exports.dashboard = dashboard;
