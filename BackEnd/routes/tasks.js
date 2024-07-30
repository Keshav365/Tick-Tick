import express from 'express';
import { updateTask, getTasks, createTask, deleteTask, toggleTaskCompletion } from "../controllers/task.js";

const router = express.Router();

router.post('/', createTask);
router.put('/:id', updateTask);
router.put('/toggle-completion/:id', toggleTaskCompletion); // Add this route for toggling completion
router.get('/', getTasks); 
router.delete('/:id', deleteTask);

export default router;
