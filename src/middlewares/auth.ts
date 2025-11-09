// src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define the shape of the JWT payload
interface JwtPayload {
  userId: string;
}

// ✅ Export a custom request type with a `user` object
export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

// ✅ Default middleware function
export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // ✅ Attach user info to the request object
    (req as AuthRequest).user = { id: decoded.userId };

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ message: "Invalid token" });
  }
}