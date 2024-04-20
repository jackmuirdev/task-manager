import { asyncHandler } from "../middleware/asyncHandler";
import User from "../models/db/userModels";
import generateToken from "../utils/generateToken";
import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IUser } from "../models/ts/IUser";

export interface AuthenticatedRequest extends Request {
  user: IUser; // Assuming IUser defines the structure of the user object
}

// @desc      login user & get token
// @route     POST /api/users/login
// @access    Public
export const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ username, email });

  if(user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc      Register user 
// @route     POST /api/users
// @access    Public 
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: ' Email already in use' });
      return;
    }

    const user = await User.create({
      username,
      email,
      password
    });

    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      return res.status(400).json({ message: 'Username is already in use' });
    }
    console.error(error);
    res.status(400).json({ message: 'Registration failed' });
  }
});

// @desc      Logout user
// @route     GET /api/users/logout
// @access    Private
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(0),
    httpOnly: true
  });
  res.status(200).json({ message: 'Logged out successfully'});
});

// @desc      Get user profile
// @route     GET /api/users/profile
// @access    Private
export const getUserProfile = asyncHandler(async (req: Request<ParamsDictionary, any, any, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => {
  try {
    const authenticatedReq = req as AuthenticatedRequest;
    const user = await User.findById(authenticatedReq.user._id);

    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// @desc      Update user profile
// @route     PUT /api/users/profile
// @access    Private
export const updateUserProfile = asyncHandler(async (req: Request<ParamsDictionary, any, any, Record<string, any>>, res: Response<any, Record<string, any>>) => {
  const authenticatedReq = req as AuthenticatedRequest;
  const user = await User.findById(authenticatedReq.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});



// @desc      Get all users
// @route     GET /api/users
// @access    Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

// @desc      Get user by ID
// @route     GET /api/users/:id
// @access    Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc      Delete user
// @route     DELETE /api/users/:id
// @access    Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  // Check if user exists
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.isAdmin) {
    res.status(400);
    throw new Error('You cannot delete an admin user');
  }

  // If user exists, delete it
  await User.findByIdAndDelete(userId);
  res.status(200).json({ message: 'User deleted successfully' });
});

// @desc      Update user
// @route     PUT /api/users/:id
// @access    Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});