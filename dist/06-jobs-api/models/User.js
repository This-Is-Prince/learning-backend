"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please provide name."],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "Please provide email."],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid email",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password."],
        minlength: 6,
    },
});
userSchema.pre("save", async function () {
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
});
userSchema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id, name: this.name }, process_1.env.JWT_SECRET, {
        expiresIn: process_1.env.JWT_LIFETIME,
    });
};
userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcryptjs_1.default.compare(candidatePassword, this.password);
    return isMatch;
};
exports.default = (0, mongoose_1.model)("User", userSchema);
