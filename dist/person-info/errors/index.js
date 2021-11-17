"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.CustomError = exports.BadRequestError = void 0;
const bad_request_1 = __importDefault(require("./bad-request"));
exports.BadRequestError = bad_request_1.default;
const custom_error_1 = __importDefault(require("./custom-error"));
exports.CustomError = custom_error_1.default;
const unauthorized_1 = __importDefault(require("./unauthorized"));
exports.UnauthorizedError = unauthorized_1.default;
