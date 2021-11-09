import express from "express";
import path from "path";
import { people } from "./data";

const app = express();
const port = 5000;

// static assets
app.use(express.static(path.resolve(__dirname, "./methods-public")));

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
