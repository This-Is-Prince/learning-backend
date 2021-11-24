"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong...",
        data: null,
    };
    /**
     * User Register Error
     */
    if (err.name === "ValidationError") {
        let errorsArr = Object.values(err.errors);
        let errors = errorsArr.map((err) => {
            let { path, kind, message } = err;
            return { path, kind, message };
        });
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        customError.msg = errors;
    }
    if (err.code && err.code === 11000) {
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        customError.msg = `User already exist with email ${err.keyValue.email} ...`;
    }
    if (err.name === "CastError") {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    /**
     * Response for error
     */
    res
        .status(customError.statusCode)
        .json({ msg: customError.msg, data: customError.data });
};
exports.default = errorHandler;
