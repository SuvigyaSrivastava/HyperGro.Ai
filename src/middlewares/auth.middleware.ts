import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
    return;
  }
};