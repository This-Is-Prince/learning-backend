"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
http_1.default
    .createServer((req, res) => {
    //   1.way
    const text = fs_1.default.readFileSync("./dist/01-node-tutorial/content/big.txt", "utf8");
    res.end(text);
    // 2.way
    // const fileStream = fs.createReadStream(
    //   "./dist/01-node-tutorial/content/big.txt",
    //   "utf8"
    // );
    // fileStream.on("open", () => {
    //   fileStream.pipe(res);
    // });
    // fileStream.on("error", (err) => {
    //   res.end(err);
    // });
})
    .listen(5000);
