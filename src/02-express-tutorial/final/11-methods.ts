import express from "express";
import path from "path";
import { people } from "../data";

const app = express();
const port = 5000;

// static assets
app.use(express.static(path.resolve(__dirname, "./methods-public")));
// parse from data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  // console.log(req.body);
  // res.status(201).send("Success");

  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).json({ success: true, person: name });
});

app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).json({ success: true, data: [...people, name] });
});

app.post("/login", (req, res) => {
  // console.log(req.body);
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please Provide Credentials.");
});

app.put("/api/people/:peopleID", (req, res) => {
  const { peopleID } = req.params;
  const { name } = req.body;
  // console.log(peopleID, name);
  // res.send("Hello World");
  const person = people.find((person) => {
    return person.id === Number(peopleID);
  });

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${peopleID}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(peopleID)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
});

app.delete("/api/people/:peopleID", (req, res) => {
  const { peopleID } = req.params;

  const person = people.find((person) => {
    return person.id === Number(peopleID);
  });

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${peopleID}` });
  }
  const newPeople = people.filter((person) => person.id !== Number(peopleID));
  res.status(200).json({ success: true, data: newPeople });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
