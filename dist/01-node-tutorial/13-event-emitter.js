"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const customEmitter = new events_1.default();
// Order Matters
customEmitter.on("response", () => {
    console.log(`data received`);
});
customEmitter.on("response", () => {
    console.log(`some other login here`);
});
customEmitter.on("response", (name, id) => {
    console.log(`data received, user ${name} with id:${id}`);
});
// customEmitter.emit("response");
customEmitter.emit("response", "john", 34);
