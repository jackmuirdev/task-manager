import express from "express";
const router = express.Router();
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/taskControllers.js";
import { protect } from '../middleware/authMiddleware.js';

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