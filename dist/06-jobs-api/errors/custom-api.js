"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(msg) {
        super(msg);
        this.statusCode = 0;
    }
}
exports.default = CustomError;
