import express, { RequestHandler } from "express";

const app = express();
const port = 5000;

// req => middleware => res

const logger: RequestHandler = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  //   res.send("Testing");
  next();
};

app.get("/", logger, (req, res) => {
  //   const method = req.method;
  //   const url = req.url;
  //   const time = new Date().getFullYear();
  //   console.log(method, url, time);
  res.send("Home");
});

app.get("/about", logger, (req, res) => {
  res.send("About");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
