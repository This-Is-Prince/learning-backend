"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const custom_1 = __importDefault(require("./custom"));
class BadRequest extends custom_1.default {
    statusCode = http_status_codes_1.StatusCodes.BAD_GATEWAY;
    constructor(msg) {
        super(msg);
    }
}
exports.default = BadRequest;
