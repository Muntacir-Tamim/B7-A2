import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { sendResponse } from "../utils/sendResponse";
import type { Role } from "../types";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return sendResponse(
        res,
        { message: "Access token is missing", success: false },
        401,
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return sendResponse(
        res,
        { message: "Invalid or expired access token", success: false },
        401,
      );
    }

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRoles = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendResponse(
        res,
        { message: "Unauthorized", success: false },
        401,
      );
    }
    if (!roles.includes(req.user.role)) {
      return sendResponse(
        res,
        { message: "Forbidden - you don't have permission", success: false },
        403,
      );
    }
    next();
  };
};
