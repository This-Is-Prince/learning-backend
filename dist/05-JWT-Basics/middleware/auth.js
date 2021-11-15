"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const process_1 = require("process");
const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new errors_1.UnauthenticatedError("No token provided");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process_1.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Not authorized to access this route");
    }
};
exports.default = authenticationMiddleware;
