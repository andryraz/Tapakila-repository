import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  user?: { userId: number; role: string };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Accès refusé, token manquant" });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
    req.user = decoded;
    next(); 
  } catch (err) {
    res.status(403).json({ error: "Token invalide" });
  }
}

export function authorizeRole(requiredRole: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: "Non authentifié" });
      return;
    }
    if (req.user.role !== requiredRole) {
      res.status(403).json({ error: "Accès refusé, rôle insuffisant" });
      return;
    }
    next(); 
  };
}

export function authorizeRoles(...allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: "Non authentifié" });
      return next(); 
    }
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: "Accès refusé, rôle insuffisant" });
      return next(); 
    }
    next(); 
  };
}


