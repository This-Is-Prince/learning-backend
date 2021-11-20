"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later",
    };
    // if (err instanceof CustomError) {
    //   return res.status(err.statusCode).json({ msg: err.message });
    // }
    if (err.name === "ValidationError") {
        let errorArr = Object.values(err.errors);
        customError.msg = errorArr
            .map((item) => item.message)
            .join(" , ");
        customError.statusCode === http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.name === "CastError") {
        customError.msg = `No item found with id ${err.value}`;
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
    return res.status(customError.statusCode).json({ msg: customError.msg });
};
exports.default = errorHandlerMiddleware;
