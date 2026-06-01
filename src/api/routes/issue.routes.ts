import { Router } from "express";
import { auth, authorizeRoles } from "../../middleware/auth";
import {
  createIssue,
  deleteIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
} from "../controllers/issue.controller";

const router = Router();

router.get("/", getAllIssues);
router.get("/:id", getIssueById);

router.post("/", auth, createIssue);

router.patch("/:id", auth, updateIssue);

router.delete("/:id", auth, authorizeRoles("maintainer"), deleteIssue);

export default router;
