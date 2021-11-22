"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authHandler = async (req, res, next) => {
    console.log("auth handler");
    next();
};
exports.default = authHandler;
