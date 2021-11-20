"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const User_1 = __importDefault(require("../models/User"));
const register = async (req, res) => {
    const user = await User_1.default.create({ ...req.body });
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ user: { name: user.name }, token: user.createJWT() });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError("Please provide email and password");
    }
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.UnAuthorizedError("Invalid Credentials");
    }
    // Comparing the password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new errors_1.UnAuthorizedError("Invalid Credentials");
    }
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({ token, user: { name: user.name } });
};
exports.login = login;
