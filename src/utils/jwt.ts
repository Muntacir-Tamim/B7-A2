import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import type { RUser } from "../types";

export const signToken = (payload: RUser): string => {
  const { id, name, role } = payload;
  return jwt.sign({ id, name, role }, config.secret, { expiresIn: "7d" });
};

export const verifyToken = (token: string): (JwtPayload & RUser) | null => {
  try {
    return jwt.verify(token, config.secret) as JwtPayload & RUser;
  } catch {
    return null;
  }
};
