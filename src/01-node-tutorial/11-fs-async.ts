import { readFile, writeFile } from "fs";

console.log("start");

readFile(
  "./dist/01-node-tutorial/content/first.txt",
  { encoding: "utf-8" },
  (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const first = result;
    readFile(
      "./dist/01-node-tutorial/content/second.txt",
      { encoding: "utf8" },
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        const second = result;
        writeFile(
          "./dist/01-node-tutorial/content/result-async.txt",
          `Here is the result : ${first}, ${second}`,
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("done with this task");
          }
        );
      }
    );
  }
);
console.log("starting next task");
