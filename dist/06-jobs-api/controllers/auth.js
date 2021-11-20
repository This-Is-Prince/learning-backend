"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const register = async (req, res) => {
    res.send("register user");
};
exports.register = register;
const login = async (req, res) => {
    res.send("login user");
};
exports.login = login;
