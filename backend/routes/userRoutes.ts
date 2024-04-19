import express from "express";
import { getUserProfile, getUsers, getUserById, registerUser, deleteUser, loginUser, logoutUser, updateUserProfile } from "../controllers/userControllers";
import { protect, admin } from "../middleware/authMiddleware";
const router = express.Router();

// GET /profile - Get the user's profile
router.get('/profile', protect, getUserProfile);

// GET /users - Get all users
router.get('/', protect, admin, getUsers);

// GET /users/:id - Get a specific user by ID
router.get('/:id', protect, admin, getUserById);

// POST /users - Register a new user
router.post('/', registerUser);

// DELETE /users/:id - Delete a specific user by ID
router.delete('/:id', protect, admin, deleteUser);

// POST /users/login - Login a user
router.post('/login', loginUser);

// POST /users/logout - Logout a user
router.post('/logout', logoutUser);

// PUT /profile - Update the user's profile
router.put('/profile', protect, updateUserProfile);

export default router;