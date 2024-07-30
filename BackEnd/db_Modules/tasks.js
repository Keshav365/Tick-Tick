import express from 'express';
import { updateTask, deleteTask, createTask, getAllTasks } from "../controllers/task.js";

const router = express.Router();

router.post("/updateTask", updateTask);
router.post("/deleteTask", deleteTask);
router.post("/createTask", createTask);
router.post("/getAllTasks",getAllTasks );

export default router;
