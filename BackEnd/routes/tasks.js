import express from 'express';
import { updateTask, getTasks, createTask,  toggleTaskCompletion,  toggleTaskDeletion } from "../controllers/task.js";

const router = express.Router();

router.post('/', createTask);
router.put('/:id', updateTask);
router.put('/toggle-completion/:id', toggleTaskCompletion); // Add this route for toggling completion
router.put('/toggle-deletion/:id', toggleTaskDeletion); // Add this route for toggling completion
router.get('/', getTasks); 

export default router;
