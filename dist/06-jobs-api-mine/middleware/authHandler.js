"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const authHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new errors_1.AuthenticationError("Authentication invalid...");
    }
    const token = authHeader.split(" ")[1];
    try {
        const { name, userId } = jsonwebtoken_1.default.verify(token, process_1.env.JWT_SECRET);
        req.user = { userId, name };
        next();
    }
    catch (error) {
        throw new errors_1.AuthenticationError("Authentication invalid...");
    }
};
exports.default = authHandler;
