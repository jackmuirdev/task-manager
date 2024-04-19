import express from "express";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/taskControllers";
import { protect } from "../middleware/authMiddleware";
const router = express.Router();

// GET /tasks - Get all tasks
router.get('/', protect, getTasks);

// GET /tasks/:id - Get a specific task by ID
router.get('/:id', protect, getTaskById);

// POST /tasks - Create a new task
router.post('/', protect, createTask);

// PUT /tasks/:id - Update a specific task by ID
router.put('/:id', protect, updateTask);

// DELETE /tasks/:id - Delete a specific task by ID
router.delete('/:id', protect, deleteTask);

export default router;