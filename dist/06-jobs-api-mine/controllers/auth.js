"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_1 = __importDefault(require("../models/User"));
const register = async (req, res) => {
    const user = await User_1.default.create(req.body);
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({
        msg: "Successfully Created...",
        data: { user, token: user.createJWT() },
    });
};
exports.register = register;
const login = async (req, res) => {
    res.send("login");
};
exports.login = login;
