import { writeFileSync } from "fs";
for (let i = 0; i < 10000; i++) {
  writeFileSync(
    "./dist/01-node-tutorial/content/big.txt",
    `hello world ${i} \n`,
    { flag: "a" }
  );
}
