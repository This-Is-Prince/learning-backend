"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.login = void 0;
const login = async (req, res) => {
    console.log(req.body);
    //   res.send("Fake login/Register/Signup");
    res.status(202).json({ msg: "Fake login/Register/Signup", token: "abcdef" });
};
exports.login = login;
const dashboard = async (req, res) => {
    console.log(req.body);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello, John Doe`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
};
exports.dashboard = dashboard;
