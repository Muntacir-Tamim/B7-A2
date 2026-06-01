import type { RUser } from "./index";

declare global {
  namespace Express {
    interface Request {
      user?: RUser;
      cookies?: Record<string, string>;
    }
  }
}

export {};
