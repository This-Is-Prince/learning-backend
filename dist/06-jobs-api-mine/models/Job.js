"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const JobSchema = new mongoose_1.Schema({
    company: {
        type: String,
        required: [true, "Please provide company name..."],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, "Please provide position..."],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending",
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user..."],
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Job", JobSchema);
