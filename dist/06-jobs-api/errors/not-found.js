"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const custom_api_1 = __importDefault(require("./custom-api"));
class NotFoundError extends custom_api_1.default {
    statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    constructor(msg) {
        super(msg);
    }
}
exports.default = NotFoundError;
