"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const personSchema = new mongoose_1.Schema({
    fname: { type: String, required: [true, "First name is mandatory"] },
    lname: { type: String, required: [true, "Last name is mandatory"] },
    email: { type: String, required: [true, "Email is mandatory"] },
    age: { type: Number, required: [true, 'Please add age.'] },
    roll: { type: String, required: [true, 'Please provide roll number.'] },
    phone: { type: String, required: [true, 'Please provide phone number.'] },
    dob: { type: Date, required: [true, 'Please provide date of birth.'] },
    gender: { type: String, required: [true, 'Please provide your gender.'] },
});
exports.default = (0, mongoose_1.model)("Person", personSchema);
