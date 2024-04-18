import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/db/userModels';

// Define a custom interface to extend Request
interface CustomRequest extends Request {
  user?: any; // Define the user property
}

// Load the .env file
dotenv.config();

// Middleware to protect routes
export const protect = async (req: CustomRequest, res: Response, next: NextFunction) => {
  let token;

  // Get the token from the request cookies
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token using the JWT_SECRET
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }
      const decoded: any = jwt.verify(token, jwtSecret);

      // Check if decoded has the userId property
      if (decoded && typeof decoded.userId === 'string') {
        // Find the user associated with the decoded token's ID
        // and exclude the password field from the returned user object
        req.user = await User.findById(decoded.userId).select('-password');

        // Proceed to the next middleware or route handler
        next();
      } else {
        throw new Error('Invalid token format');
      }
    } catch (error) {
      console.error(error);
      // Return an error response if the token verification fails
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // Return an error response if no token is found in the request
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


// Middleware to check if user is an admin
export const admin = (req: CustomRequest, res: Response, next: NextFunction) => {
  // Check if user is logged in and is an admin
  if (req.user && req.user.isAdmin) {
    // User is logged in and is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not an admin, return an error response
    res.status(403).json({ message: 'Not Authorized as admin' });
  }
};
