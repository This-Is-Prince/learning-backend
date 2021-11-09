"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const people_1 = require("../controllers/people");
const router = express_1.default.Router();
router.route("/").get(people_1.getPeople).post(people_1.createPerson);
router.route("/postman").post(people_1.createPersonPostman);
router.route("/:peopleID").put(people_1.updatePerson).delete(people_1.deletePerson);
// router.get("/", getPeople);
// router.post("/", createPerson);
// router.post("/postman", createPersonPostman);
// router.put("/:peopleID", updatePerson);
// router.delete("/:peopleID", deletePerson);
// router.get("/", (req, res) => {
//   res.status(200).json({ success: true, data: people });
// });
// router.post("/", (req, res) => {
//   const { name } = req.body;
//   if (!name) {
//     return res
//       .status(400)
//       .json({ success: false, msg: "please provide name value" });
//   }
//   res.status(201).json({ success: true, person: name });
// });
// router.post("/postman", (req, res) => {
//   const { name } = req.body;
//   if (!name) {
//     return res
//       .status(400)
//       .json({ success: false, msg: "please provide name value" });
//   }
//   res.status(201).json({ success: true, data: [...people, name] });
// });
// router.put("/:peopleID", (req, res) => {
//   const { peopleID } = req.params;
//   const { name } = req.body;
//   const person = people.find((person) => {
//     return person.id === Number(peopleID);
//   });
//   if (!person) {
//     return res
//       .status(404)
//       .json({ success: false, msg: `no person with id ${peopleID}` });
//   }
//   const newPeople = people.map((person) => {
//     if (person.id === Number(peopleID)) {
//       person.name = name;
//     }
//     return person;
//   });
//   res.status(200).json({ success: true, data: newPeople });
// });
// router.delete("/:peopleID", (req, res) => {
//   const { peopleID } = req.params;
//   const person = people.find((person) => {
//     return person.id === Number(peopleID);
//   });
//   if (!person) {
//     return res
//       .status(404)
//       .json({ success: false, msg: `no person with id ${peopleID}` });
//   }
//   const newPeople = people.filter((person) => person.id !== Number(peopleID));
//   res.status(200).json({ success: true, data: newPeople });
// });
exports.default = router;
