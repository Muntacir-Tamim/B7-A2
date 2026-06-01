import type { Request, Response } from "express";
import { signToken } from "../../utils/jwt";
import { sendResponse } from "../../utils/sendResponse";
import authService from "../services/auth.service";
import { roles } from "../../types";
import type { Role } from "../../types";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body as {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
  };

  // Validation
  if (!name || !email || !password) {
    return sendResponse(
      res,
      {
        message: "name, email, and password are required",
        success: false,
        errors: "Missing required fields",
      },
      400,
    );
  }

  if (role && !roles.includes(role as Role)) {
    return sendResponse(
      res,
      {
        message: "role must be contributor or maintainer",
        success: false,
        errors: "Invalid role",
      },
      400,
    );
  }

  const user = await authService.createUser({
    name,
    email,
    password,
    role: role as Role | undefined,
  });

  if (!user) {
    return sendResponse(
      res,
      {
        message: "Email already exists",
        success: false,
        errors: "Duplicate email",
      },
      400,
    );
  }

  sendResponse(
    res,
    { message: "User registered successfully", data: user },
    201,
  );
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return sendResponse(
      res,
      {
        message: "email and password are required",
        success: false,
        errors: "Missing credentials",
      },
      400,
    );
  }

  const user = await authService.validateUser(email, password);

  if (!user) {
    return sendResponse(
      res,
      {
        message: "Invalid email or password",
        success: false,
        errors: "Authentication failed",
      },
      401,
    );
  }

  const token = signToken(user);

  sendResponse(
    res,
    { message: "Login successful", data: { token, user } },
    200,
  );
};
