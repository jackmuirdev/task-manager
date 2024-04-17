import { asyncHandler } from "../middleware/asyncHandler";
import Task from "../models/db/taskModels";

// @desc      Get all tasks
// @route     GET /api/tasks
// @access    Private
export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
});

// @desc      Get tasks by Id
// @route     GET /api/tasks/:id
// @access    Private
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc      Create a new task
// @route     POST /api/tasks
// @access    Private
export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.create({
    title,
    description,
    status: 'to do'
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// @desc      Update a task
// @route     PUT /api/tasks/:id
// @access    Private
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc      Delete a task
// @route     DELETE /api/tasks/:id
// @access    Private
export const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.deleteOne(); // Use deleteOne() method to remove the document
  res.status(200).json({ message: 'Task deleted successfully' });
});