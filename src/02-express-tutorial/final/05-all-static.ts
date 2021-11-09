import express from "express";
import path from "path";

const app = express();
const port = 5000;

app.use(express.static(path.resolve(__dirname, "./navbar-app")));

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
// });
app.all("*", (req, res) => {
  res.status(404).send("resource not found.");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
