// import bcrypt from "bcrypt";
// import { sql } from "../../db";
// import type { Role, RUser } from "../../types";

// class AuthService {
//   private async hashPassword(password: string): Promise<string> {
//     return bcrypt.hash(password, 10);
//   }

//   private async comparePassword(password: string, hash: string): Promise<boolean> {
//     return bcrypt.compare(password, hash);
//   }

//   async createUser(data: { name: string; email: string; password: string; role?: Role }) {
//     const { name, email, password, role } = data;

//     // Check duplicate email
//     const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
//     if (existing.length > 0) {
//       return null; // email already exists
//     }

//     const hashedPassword = await this.hashPassword(password);

//     const result = await sql`
//       INSERT INTO users (name, email, password, role)
//       VALUES (${name}, ${email}, ${hashedPassword}, COALESCE(${role ?? null}, 'contributor'))
//       RETURNING id, name, email, role, created_at, updated_at
//     `;
//     return result[0] as RUser;
//   }

//   async validateUser(email: string, password: string): Promise<RUser | null> {
//     const result = await sql`
//       SELECT id, name, email, password, role, created_at, updated_at
//       FROM users
//       WHERE email = ${email}
//     `;

//     if (!result.length) return null;

//     const user = result[0] as RUser & { password: string };
//     const isValid = await this.comparePassword(password, user.password);

//     if (!isValid) return null;

//     const { password: _pw, ...safeUser } = user;
//     return safeUser as RUser;
//   }

//   async getUserById(id: number): Promise<RUser | null> {
//     const result = await sql`
//       SELECT id, name, email, role, created_at, updated_at
//       FROM users WHERE id = ${id}
//     `;
//     return (result[0] as RUser) ?? null;
//   }
// }

// export default new AuthService();
