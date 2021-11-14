import { Router } from "express";
import { dashboard, login } from "../controllers/main";

const router = Router();

router.route("/dashboard").get(dashboard);
router.route("/login").post(login);

export default router;
