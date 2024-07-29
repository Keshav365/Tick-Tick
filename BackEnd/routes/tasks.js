import express from 'express';
import {getAllTasks,createTask } from "../controllers/task.js"

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', createTask);

export default router;
