"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const person_1 = require("../controllers/person");
const router = (0, express_1.Router)();
router.post("/signup", person_1.createPerson);
exports.default = router;
