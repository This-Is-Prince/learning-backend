"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const jwt = __importStar(require("jsonwebtoken"));
const process_1 = require("process");
const authenticationMiddleware = async (req, res, next) => {
    // check header
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new errors_1.UnAuthorizedError("Authentication invalid.");
    }
    const token = authorization.split(" ")[1];
    try {
        const { name, userId } = jwt.verify(token, process_1.env.JWT_SECRET);
        // attach the user to the job routes
        // const user=User.findById(userId).select('-password');
        // req.user=user;
        req.user = { userId, name };
        next();
    }
    catch (error) {
        throw new errors_1.UnAuthorizedError("Authentication invalid");
    }
};
exports.default = authenticationMiddleware;
