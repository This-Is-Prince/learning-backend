import { Router } from "express";
import {
  createTask,
  deleteTask,
  getALlTasks,
  getTask,
  updateTask,
} from "../controllers/tasks";

const router = Router();

router.route("/").get(getALlTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

export default router;
