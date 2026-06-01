// import { sql } from "../../db";
// import type {
//   Issue,
//   IssueStatus,
//   IssueType,
//   NewIssue,
//   UpdateIssueBody,
// } from "../../types";

// // Reporter details shape returned in list/single endpoints
// type ReporterInfo = { id: number; name: string; role: string };
// type IssueWithReporter = Omit<Issue, "reporter_id"> & {
//   reporter: ReporterInfo;
// };

// class IssueService {
//   async createIssue(data: NewIssue): Promise<Issue> {
//     const { title, description, type, reporter_id } = data;

//     const result = await sql`
//       INSERT INTO issues (title, description, type, reporter_id)
//       VALUES (${title}, ${description}, ${type}, ${reporter_id})
//       RETURNING *
//     `;
//     return result[0] as Issue;
//   }

//   async getAllIssues(
//     sort: "newest" | "oldest" = "newest",
//     type?: IssueType,
//     status?: IssueStatus,
//   ): Promise<IssueWithReporter[]> {
//     const typeFilter = type ?? null;
//     const statusFilter = status ?? null;
//     const order = sort === "oldest" ? "ASC" : "DESC";

//     let issues: Issue[];

//     if (typeFilter && statusFilter) {
//       issues = (await sql`
//         SELECT * FROM issues
//         WHERE type = ${typeFilter} AND status = ${statusFilter}
//         ORDER BY created_at ${sql.unsafe(order)}
//       `) as Issue[];
//     } else if (typeFilter) {
//       issues = (await sql`
//         SELECT * FROM issues
//         WHERE type = ${typeFilter}
//         ORDER BY created_at ${sql.unsafe(order)}
//       `) as Issue[];
//     } else if (statusFilter) {
//       issues = (await sql`
//         SELECT * FROM issues
//         WHERE status = ${statusFilter}
//         ORDER BY created_at ${sql.unsafe(order)}
//       `) as Issue[];
//     } else {
//       issues = (await sql`
//         SELECT * FROM issues
//         ORDER BY created_at ${sql.unsafe(order)}
//       `) as Issue[];
//     }

//     if (!issues.length) return [];

//     // Batch fetch reporters — no JOINs, as required
//     const reporterIds = [...new Set(issues.map((i) => i.reporter_id))];
//     const reporters = (await sql`
//       SELECT id, name, role FROM users WHERE id = ANY(${reporterIds})
//     `) as ReporterInfo[];

//     const reporterMap = new Map(reporters.map((r) => [r.id, r]));

//     return issues.map((issue) => ({
//       id: issue.id,
//       title: issue.title,
//       description: issue.description,
//       type: issue.type,
//       status: issue.status,
//       reporter: reporterMap.get(issue.reporter_id) ?? {
//         id: issue.reporter_id,
//         name: "Unknown",
//         role: "contributor",
//       },
//       created_at: issue.created_at,
//       updated_at: issue.updated_at,
//     }));
//   }

//   async getIssueById(id: number): Promise<IssueWithReporter | null> {
//     const result = await sql`SELECT * FROM issues WHERE id = ${id}`;
//     if (!result.length) return null;

//     const issue = result[0] as Issue;

//     const reporterResult = await sql`
//       SELECT id, name, role FROM users WHERE id = ${issue.reporter_id}
//     `;
//     const reporter: ReporterInfo = (reporterResult[0] as ReporterInfo) ?? {
//       id: issue.reporter_id,
//       name: "Unknown",
//       role: "contributor",
//     };

//     return {
//       id: issue.id,
//       title: issue.title,
//       description: issue.description,
//       type: issue.type,
//       status: issue.status,
//       reporter,
//       created_at: issue.created_at,
//       updated_at: issue.updated_at,
//     };
//   }

//   async getRawIssueById(id: number): Promise<Issue | null> {
//     const result = await sql`SELECT * FROM issues WHERE id = ${id}`;
//     return (result[0] as Issue) ?? null;
//   }

//   async updateIssue(
//     id: number,
//     updates: UpdateIssueBody,
//   ): Promise<Issue | null> {
//     const { title, description, type, status } = updates;

//     const result = await sql`
//       UPDATE issues
//       SET
//         title = COALESCE(${title ?? null}, title),
//         description = COALESCE(${description ?? null}, description),
//         type = COALESCE(${type ?? null}, type),
//         status = COALESCE(${status ?? null}, status),
//         updated_at = NOW()
//       WHERE id = ${id}
//       RETURNING *
//     `;
//     return (result[0] as Issue) ?? null;
//   }

//   async deleteIssue(id: number): Promise<boolean> {
//     try {
//       await sql`DELETE FROM issues WHERE id = ${id}`;
//       return true;
//     } catch {
//       return false;
//     }
//   }
// }

// export default new IssueService();
