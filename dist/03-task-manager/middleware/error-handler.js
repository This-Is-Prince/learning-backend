"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
    //   return res.status(500).json({ msg: `Something went wrong, try again later` });
    if (err instanceof custom_error_1.CustomAPIError) {
        return res.status(err.status).json({ msg: err.message });
    }
    else {
        return res
            .status(500)
            .json({ msg: `Something went wrong, please try again` });
    }
};
exports.default = errorHandlerMiddleware;
