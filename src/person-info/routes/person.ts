import { Router } from "express";
import { createPerson } from "../controllers/person";

const router = Router();

router.post("/signup", createPerson);

export default router;
