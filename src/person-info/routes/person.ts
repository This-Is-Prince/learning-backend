import { Router } from "express";
import { createPerson, getAllPerson } from "../controllers/person";
import authorizedMiddleware from "../middleware/auth";

const router = Router();

router.post("/signup", createPerson);
router.route("/person").get(authorizedMiddleware, getAllPerson);

export default router;
