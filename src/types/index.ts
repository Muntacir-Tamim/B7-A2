// export const roles = ["contributor", "maintainer"] as const;
// export type Role = (typeof roles)[number];

// export const issueTypes = ["bug", "feature_request"] as const;
// export type IssueType = (typeof issueTypes)[number];

// export const issueStatuses = ["open", "in_progress", "resolved"] as const;
// export type IssueStatus = (typeof issueStatuses)[number];

// export type User = {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   role: Role;
//   created_at: Date;
//   updated_at: Date;
// };

// export type RUser = Omit<User, "password">;

// export type Issue = {
//   id: number;
//   title: string;
//   description: string;
//   type: IssueType;
//   status: IssueStatus;
//   reporter_id: number;
//   created_at: Date;
//   updated_at: Date;
// };

// export type NewIssue = Omit<Issue, "id" | "status" | "created_at" | "updated_at">;

// export type UpdateIssueBody = {
//   title?: string;
//   description?: string;
//   type?: IssueType;
//   status?: IssueStatus;
// };
