"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
// info about current user
const user = os_1.default.userInfo();
console.log(user);
// method returns the system uptime in seconds
console.log(`The System Uptime is ${os_1.default.uptime()} seconds`);
const currentOS = {
    name: os_1.default.type(),
    release: os_1.default.release(),
    totalMem: os_1.default.totalmem(),
    freeMem: os_1.default.freemem(),
};
console.log(currentOS);
