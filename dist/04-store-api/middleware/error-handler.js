"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlerMiddleware = async (err, req, res, next) => {
    console.log(err);
    return res
        .status(500)
        .json({ msg: "Something went wrong, please try again" });
};
exports.default = errorHandlerMiddleware;
