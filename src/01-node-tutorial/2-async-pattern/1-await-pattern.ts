import { readFile, writeFile } from "fs";
import { promisify } from "util";
const readFilePromise = promisify(readFile);
const writeFilePromise = promisify(writeFile);

const start = async () => {
  try {
    const first = await readFilePromise(
      "./dist/01-node-tutorial/content/first.txt",
      "utf8"
    );
    const second = await readFilePromise(
      "./dist/01-node-tutorial/content/second.txt",
      "utf8"
    );
    console.log(first, second);
    writeFilePromise(
      "./dist/01-node-tutorial/content/result-mind-grenade.txt",
      `THIS IS AWESOME : ${first}, ${second}`,
      { flag: "a" }
    );
  } catch (error) {
    console.log(error);
  }
};
start();

/**
 * First Approach
 */
// const getText = (path: string) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, "utf8", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// getText("./dist/01-node-tutorial/content/first.txt")
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

// const start = async () => {
//   try {
//     const first = await getText("./dist/01-node-tutorial/content/first.txt");
//     const second = await getText("./dist/01-node-tutorial/content/second.txt");
//     console.log(first, second);
//   } catch (error) {
//     console.log(error);
//   }
// };
// start();
