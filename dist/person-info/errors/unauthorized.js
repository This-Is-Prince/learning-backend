"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const custom_error_1 = __importDefault(require("./custom-error"));
class UnauthorizedError extends custom_error_1.default {
    constructor(msg) {
        super(msg);
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
}
exports.default = UnauthorizedError;
