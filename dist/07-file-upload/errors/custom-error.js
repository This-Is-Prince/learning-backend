"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    statusCode = 0;
    constructor(msg) {
        super(msg);
    }
}
exports.default = CustomError;
