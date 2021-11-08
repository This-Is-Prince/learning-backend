"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
// const server = http.createServer((req, res) => {
//   res.end('Welcome')
// })
// Using Event Emitter API
const server = http_1.default.createServer();
// emits request event
// subscribe to it / listen for it / respond to it
server.on("request", (req, res) => {
    res.end("Welcome");
});
server.listen(5000);
