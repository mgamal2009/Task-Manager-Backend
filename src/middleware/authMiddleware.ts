import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {Request} from '../types/request'


const JWT_SECRET = "your_jwt_secret";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) res.status(403).send("Authorization token is required");

  try {
    const decoded = jwt.verify(token as string, JWT_SECRET) as any;
    req.userId = parseInt(decoded.userId);
    next();
  } catch {
    res.status(403).send("Invalid token");
  }
};
