import { Router } from "express";
import { createNewTask, getUserTasks, updateExistingTask, deleteExistingTask } from "../controllers/taskController";
import { authenticateJWT } from "../middleware/authMiddleware";
import {validateDto} from "../middleware/validationMiddleware";
import {CreateTaskDto} from "../dto/createTaskDto";
import {UpdateTaskDto} from "../dto/updateTaskDto";

const router = Router();

router.post("/", authenticateJWT,validateDto(CreateTaskDto), createNewTask);
router.get("/", authenticateJWT, getUserTasks);
router.put("/:taskId", authenticateJWT,validateDto(UpdateTaskDto), updateExistingTask);
router.delete("/:taskId", authenticateJWT, deleteExistingTask);

export default router;
