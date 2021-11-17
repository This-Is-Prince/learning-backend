"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof errors_1.CustomError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    else if (err.name === "ValidationError") {
        const errors = err.errors;
        let msg = {};
        for (let key in errors) {
            msg[key] = errors[key].message;
        }
        res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json(msg);
    }
    else {
        console.error(err);
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send("Something went wrong try again later");
    }
};
exports.default = errorHandlerMiddleware;
