import { readFileSync, writeFileSync } from "fs";

console.log("start");

const first = readFileSync("./dist/01-node-tutorial/content/first.txt", {
  encoding: "utf8",
});
const second = readFileSync("./dist/01-node-tutorial/content/second.txt", {
  encoding: "utf8",
});

console.log(first, second);
writeFileSync(
  "./dist/01-node-tutorial/content/result-sync.txt",
  `Here is the result : ${first}, ${second}`,
  { flag: "a" }
);
console.log("done with this task");
console.log("starting the next one");
