// import express, { type Application, type Request, type Response } from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import authRoutes from "./api/routes/auth.routes";
// import issueRoutes from "./api/routes/issue.routes";
// import globalErrorHandler from "./middleware/globalErrorHandler";
// import logger from "./middleware/logger";

// const app: Application = express();

// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());
// app.use(logger);

// app.get("/", (_req: Request, res: Response) => {
//   res.json({ message: "DevPulse API is running 🚀" });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/issues", issueRoutes);

// app.use(globalErrorHandler);

// app.use((_req, res) => {
//   res.status(404).json({ success: false, message: "Route not found" });
// });

// export default app;
