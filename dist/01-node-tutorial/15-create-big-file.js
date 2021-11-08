"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
for (let i = 0; i < 10000; i++) {
    (0, fs_1.writeFileSync)("./dist/01-node-tutorial/content/big.txt", `hello world ${i} \n`, { flag: "a" });
}
