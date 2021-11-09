import http from "http";
import fs from "fs";

http
  .createServer((req, res) => {
    //   1.way
    const text = fs.readFileSync(
      "./dist/01-node-tutorial/content/big.txt",
      "utf8"
    );
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
