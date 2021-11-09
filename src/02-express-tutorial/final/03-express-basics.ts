import express from "express";

const app = express();
const port = 5000;

// ALl methods in express order matters
// 1.get method then all method
app.get("/", (req, res) => {
  console.log("user hit the resource");
  res.status(200).send("Home Page.");
});

app.get("/about", (req, res) => {
  res.status(200).send("About Page.");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Resource Not Found.</h1>");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
