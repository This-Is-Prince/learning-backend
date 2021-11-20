"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = async (req, res) => {
    const { email, password, name } = req.body;
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    const tempUser = { name, email, hashedPassword };
    // if (!name || !email || !password) {
    //   throw new BadRequestError("Please provide name, email and password");
    // }
    const user = await User_1.default.create({ ...tempUser, password: hashedPassword });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ user });
};
exports.register = register;
const login = async (req, res) => {
    res.send("login user");
};
exports.login = login;
