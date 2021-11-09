import express from "express";
import path from "path";
import people from "../routes/people";
import auth from "../routes/auth";

const app = express();
const port = 5000;

// static assets
app.use(express.static(path.resolve(__dirname, "./methods-public")));
// parse from data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.use("/api/people", people);
app.use("/login", auth);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
