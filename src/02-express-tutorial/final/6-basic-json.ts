import express from "express";
import { products } from "../data";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
