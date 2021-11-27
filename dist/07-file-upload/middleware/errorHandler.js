"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandler = async (err, _, res) => {
    const customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || `Something went wrong try again later...`,
    };
    res.status(customError.statusCode).json({ msg: customError.msg });
};
exports.default = errorHandler;
