// import type { Response } from "express";

// export function sendResponse<T>(
//   res: Response,
//   {
//     message,
//     data,
//     errors,
//     success = true,
//   }: { message: string; data?: T; errors?: unknown; success?: boolean },
//   status = 200,
// ) {
//   res.status(status).json({
//     success,
//     message,
//     ...(success && data !== undefined ? { data } : {}),
//     ...(!success && errors !== undefined ? { errors } : {}),
//   });
// }
