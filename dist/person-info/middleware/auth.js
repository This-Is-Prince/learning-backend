"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const errors_1 = require("../errors");
const authorizedMiddleware = (req, res, next) => {
    let authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new errors_1.UnauthorizedError("No Token Provided");
    }
    const token = authorization.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process_1.env.JWT_SECRET);
        const { id } = decoded;
        req.person = { id };
        next();
    }
    catch (error) {
        throw new errors_1.UnauthorizedError("Not authorized to access this route");
    }
};
exports.default = authorizedMiddleware;
