# DevPulse 🚀

**Internal Tech Issue & Feature Tracker** — A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.

## Live URL

> `https://devplus-alpha.vercel.app/` _(update after deployment)_

## Features

- JWT-based authentication (signup & login)
- Role-based access control: `contributor` and `maintainer`
- Create, view, update, and delete issues (bugs & feature requests)
- Filter issues by `type` and `status`; sort by `newest` or `oldest`
- Reporter details fetched without SQL JOINs (application-level batching)

## Tech Stack

| Technology   | Note                                                         |
| ------------ | ------------------------------------------------------------ |
| Node.js      | LTS runtime (24.x or higher)                                 |
| TypeScript   | v5.x (strict mode)                                           |
| Express.js   | v5, modular router architecture                              |
| PostgreSQL   | NeonDB (serverless)                                          |
| Raw SQL      | `neon` tagged template literals, no ORM/query builders/JOINs |
| bcrypt       | Password hashing, salt rounds 10                             |
| jsonwebtoken | JWT generation & verification                                |

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env
# Fill in DATABASE_URL and JWT_SECRET

# 3. Run in development
npm run dev
```

## Database Schema

### `users`

| Column     | Type         | Notes                                   |
| ---------- | ------------ | --------------------------------------- |
| id         | SERIAL PK    | Auto-increment                          |
| name       | VARCHAR(100) | Required                                |
| email      | VARCHAR(255) | Unique, required                        |
| password   | TEXT         | Hashed, never returned                  |
| role       | VARCHAR(20)  | `contributor` (default) or `maintainer` |
| created_at | TIMESTAMP    | Auto                                    |
| updated_at | TIMESTAMP    | Auto                                    |

### `issues`

| Column      | Type         | Notes                                       |
| ----------- | ------------ | ------------------------------------------- |
| id          | SERIAL PK    | Auto-increment                              |
| title       | VARCHAR(150) | Required, max 150 chars                     |
| description | TEXT         | Required, min 20 chars                      |
| type        | VARCHAR(20)  | `bug` or `feature_request`                  |
| status      | VARCHAR(20)  | `open` (default), `in_progress`, `resolved` |
| reporter_id | INTEGER      | References users.id (app-level validation)  |
| created_at  | TIMESTAMP    | Auto                                        |
| updated_at  | TIMESTAMP    | Auto                                        |

## API Endpoints

### Auth

| Method | Endpoint           | Access | Description           |
| ------ | ------------------ | ------ | --------------------- |
| POST   | `/api/auth/signup` | Public | Register a new user   |
| POST   | `/api/auth/login`  | Public | Login and receive JWT |

### Issues

| Method | Endpoint          | Access     | Description                    |
| ------ | ----------------- | ---------- | ------------------------------ |
| POST   | `/api/issues`     | Auth       | Create a new issue             |
| GET    | `/api/issues`     | Public     | Get all issues (filter & sort) |
| GET    | `/api/issues/:id` | Public     | Get single issue               |
| PATCH  | `/api/issues/:id` | Auth       | Update issue                   |
| DELETE | `/api/issues/:id` | Maintainer | Delete issue                   |

#### Query Parameters for `GET /api/issues`

| Param    | Values                            | Default  |
| -------- | --------------------------------- | -------- |
| `sort`   | `newest`, `oldest`                | `newest` |
| `type`   | `bug`, `feature_request`          | —        |
| `status` | `open`, `in_progress`, `resolved` | —        |

### Authorization Header

```
Authorization: <JWT_TOKEN>
```
