import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    // Make sure to catch any errors and pass them along to the error handler
    Promise.resolve(fn(req, res, next)).catch(next);
  }
