// import type { Request, Response } from "express";
// import { sendResponse } from "../../utils/sendResponse";
// import issueService from "../services/issue.service";
// import { issueStatuses, issueTypes } from "../../types";
// import type { IssueStatus, IssueType, UpdateIssueBody } from "../../types";

// export const createIssue = async (req: Request, res: Response) => {
//   const { title, description, type } = req.body as {
//     title?: string;
//     description?: string;
//     type?: string;
//   };

//   // Validation
//   if (!title || !description || !type) {
//     return sendResponse(
//       res,
//       { message: "title, description, and type are required", success: false, errors: "Missing fields" },
//       400,
//     );
//   }
//   if (title.length > 150) {
//     return sendResponse(res, { message: "title must be at most 150 characters", success: false, errors: "Validation error" }, 400);
//   }
//   if (description.length < 20) {
//     return sendResponse(res, { message: "description must be at least 20 characters", success: false, errors: "Validation error" }, 400);
//   }
//   if (!issueTypes.includes(type as IssueType)) {
//     return sendResponse(res, { message: "type must be bug or feature_request", success: false, errors: "Invalid type" }, 400);
//   }

//   const reporter_id = req.user!.id as unknown as number;

//   const issue = await issueService.createIssue({
//     title,
//     description,
//     type: type as IssueType,
//     reporter_id,
//   });

//   sendResponse(res, { message: "Issue created successfully", data: issue }, 201);
// };

// export const getAllIssues = async (req: Request, res: Response) => {
//   const { sort, type, status } = req.query as {
//     sort?: string;
//     type?: string;
//     status?: string;
//   };

//   // Validate query params if provided
//   const sortVal = sort === "oldest" ? "oldest" : "newest";

//   if (type && !issueTypes.includes(type as IssueType)) {
//     return sendResponse(res, { message: "Invalid type filter", success: false, errors: "type must be bug or feature_request" }, 400);
//   }
//   if (status && !issueStatuses.includes(status as IssueStatus)) {
//     return sendResponse(res, { message: "Invalid status filter", success: false, errors: "status must be open, in_progress, or resolved" }, 400);
//   }

//   const issues = await issueService.getAllIssues(
//     sortVal,
//     type as IssueType | undefined,
//     status as IssueStatus | undefined,
//   );

//   sendResponse(res, { message: "Issues retrived successfully", data: issues });
// };

// export const getIssueById = async (req: Request, res: Response) => {
//   const id = Number(req.params["id"]);
//   if (isNaN(id)) {
//     return sendResponse(res, { message: "Invalid issue id", success: false, errors: "id must be a number" }, 400);
//   }

//   const issue = await issueService.getIssueById(id);
//   if (!issue) {
//     return sendResponse(res, { message: "Issue not found", success: false, errors: "Not found" }, 404);
//   }

//   sendResponse(res, { message: "Issue retrived successfully", data: issue });
// };

// export const updateIssue = async (req: Request, res: Response) => {
//   const id = Number(req.params["id"]);
//   if (isNaN(id)) {
//     return sendResponse(res, { message: "Invalid issue id", success: false, errors: "id must be a number" }, 400);
//   }

//   const existing = await issueService.getRawIssueById(id);
//   if (!existing) {
//     return sendResponse(res, { message: "Issue not found", success: false, errors: "Not found" }, 404);
//   }

//   const currentUser = req.user!;
//   const isMaintainer = currentUser.role === "maintainer";
//   const isOwner = (existing.reporter_id as unknown as number) === (currentUser.id as unknown as number);

//   // Contributor: only own issue, only if status is open
//   if (!isMaintainer) {
//     if (!isOwner) {
//       return sendResponse(res, { message: "Forbidden - you can only update your own issues", success: false }, 403);
//     }
//     if (existing.status !== "open") {
//       return sendResponse(res, { message: "Conflict - you can only update issues with open status", success: false }, 409);
//     }
//   }

//   const { title, description, type, status } = req.body as UpdateIssueBody;

//   if (type && !issueTypes.includes(type)) {
//     return sendResponse(res, { message: "type must be bug or feature_request", success: false, errors: "Invalid type" }, 400);
//   }
//   if (status && !issueStatuses.includes(status)) {
//     return sendResponse(res, { message: "status must be open, in_progress, or resolved", success: false, errors: "Invalid status" }, 400);
//   }
//   // Contributor cannot change status
//   if (!isMaintainer && status) {
//     return sendResponse(res, { message: "Forbidden - contributors cannot change issue status", success: false }, 403);
//   }

//   const updated = await issueService.updateIssue(id, { title, description, type, status });
//   sendResponse(res, { message: "Issue updated successfully", data: updated });
// };

// export const deleteIssue = async (req: Request, res: Response) => {
//   const id = Number(req.params["id"]);
//   if (isNaN(id)) {
//     return sendResponse(res, { message: "Invalid issue id", success: false, errors: "id must be a number" }, 400);
//   }

//   const existing = await issueService.getRawIssueById(id);
//   if (!existing) {
//     return sendResponse(res, { message: "Issue not found", success: false, errors: "Not found" }, 404);
//   }

//   await issueService.deleteIssue(id);
//   sendResponse(res, { message: "Issue deleted successfully" });
// };
