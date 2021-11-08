"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Welcome to our home page");
    }
    else if (req.url === "/about") {
        res.end("Here is our short history");
    }
    else {
        res.end(`
      <h1>Oops!</h1>
      <p>We can't seem to find the page you are looking for</p>
      <a href='/'>back home</a>
      `);
    }
});
server.listen(5000, () => {
    console.log("Server is listening on port 5000...");
});
