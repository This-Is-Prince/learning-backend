"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
console.log(path_1.default.sep);
const filePath = path_1.default.join("/content", "subfolder", "test.txt");
console.log(filePath);
const base = path_1.default.basename(filePath);
console.log(base);
const absolutePath = path_1.default.resolve(__dirname, "content", "subfolder", "test.txt");
console.log(absolutePath);
