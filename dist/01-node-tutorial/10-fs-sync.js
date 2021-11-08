"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
console.log("start");
const first = (0, fs_1.readFileSync)("./dist/01-node-tutorial/content/first.txt", {
    encoding: "utf8",
});
const second = (0, fs_1.readFileSync)("./dist/01-node-tutorial/content/second.txt", {
    encoding: "utf8",
});
console.log(first, second);
(0, fs_1.writeFileSync)("./dist/01-node-tutorial/content/result-sync.txt", `Here is the result : ${first}, ${second}`, { flag: "a" });
console.log("done with this task");
console.log("starting the next one");
