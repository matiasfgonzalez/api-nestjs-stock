import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface RequestUser extends Request {
  user?: string | jwt.JwtPayload | undefined;
}

export const authenticateToken = (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET || "defaultSecret", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  });
};
