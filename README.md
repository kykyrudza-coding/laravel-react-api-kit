# Laravel API + React Template

Template repository for full-stack projects with a Laravel API backend and a React/Vite frontend.

## Level 1 Foundation

- Sanctum token auth: `login`, `logout`, `me`
- Versioned API routes under `/api/v1`
- Basic RBAC: `roles`, `permissions`, `role_user`, `permission_role`
- Permission middleware example: `permission:foo.view`
- Rate limiting via `throttle:api` and `throttle:login`
- API error handling in React through a shared API client and toast UI
- Environment examples for local, staging, and production
- Docker Compose and GitHub Actions CI

## Level 2 Quality And DX

- Backend tests with Pest
- Frontend tests with Vitest and Testing Library
- Formatting with Pint and Prettier
- Linting with ESLint
- API docs with Scribe
- OpenAPI contract in `docs/openapi.yaml`
- Typed frontend API payloads in `frontend/src/types/api.ts`
- Axios API instance in `frontend/src/lib/api.ts`
- TanStack Query for frontend API state
- Pre-commit hooks with Husky and lint-staged

## Level 3 Advanced Capabilities

- Redis-backed queues and cache
- Horizon dashboard and worker process for background jobs
- Demo queued job endpoint: `POST /api/v1/jobs/demo`
- Laravel Reverb websocket server and frontend Echo client
- Demo broadcast endpoint: `POST /api/v1/broadcast/demo`
- S3-compatible storage with MinIO in Docker
- Demo file upload endpoint: `POST /api/v1/files`
- Sentry backend and frontend error tracking hooks
- Laravel lang files plus React i18next
- Demo locale endpoint: `GET /api/v1/locale?locale=uk`
- Telescope dev-only debugging panel

## Stack

- Backend: Laravel 13, PHP 8.3+, Sanctum
- Frontend: React 19, TypeScript, Vite
- Services: Redis, Horizon, Reverb, MinIO, Sentry, Telescope
- Tooling: Docker Compose, GitHub Actions CI

## Structure

```text
api/       Laravel API application
frontend/  React/Vite application
```

## Local Setup

### Backend

```bash
cd api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

The API runs at `http://127.0.0.1:8000`.

Seeded demo user:

```text
email: admin@example.com
password: password
role: admin
permission: foo.view
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs at `http://127.0.0.1:5173` and proxies `/api` requests to Laravel.

## API Examples

```http
GET /api/v1/foo
POST /api/v1/auth/login
GET /api/v1/auth/me
POST /api/v1/auth/logout
GET /api/v1/admin/foo
GET /api/v1/locale
POST /api/v1/jobs/demo
POST /api/v1/broadcast/demo
POST /api/v1/files
```

Protected endpoints require a Sanctum bearer token. `GET /api/v1/admin/foo` also requires the `foo.view` permission.

## Docker

```bash
docker compose up --build
```

Services:

- Frontend: `http://127.0.0.1:5173`
- API: `http://127.0.0.1:8000`
- Reverb: `ws://127.0.0.1:8080`
- Horizon: `http://127.0.0.1:8000/horizon`
- Telescope: `http://127.0.0.1:8000/telescope`
- MinIO API: `http://127.0.0.1:9000`
- MinIO Console: `http://127.0.0.1:9001`

Horizon requires `pcntl`/`posix`, so it is intended for Linux/Docker environments. Composer includes a platform override so the template can still be installed from Windows.

## Useful Commands

```bash
cd api && composer test
cd api && composer format:test
cd api && composer docs
cd api && composer horizon
cd api && composer reverb
cd frontend && npm run lint
cd frontend && npm run format:check
cd frontend && npm run test
cd frontend && npm run build
```

## Template Checklist

After creating a new project from this template:

- Rename the project in `api/composer.json` and `frontend/package.json`.
- Update app URLs in `api/.env*` and `frontend/.env*`.
- Replace demo `foo` endpoints with project-specific resources.
- Expand RBAC permissions around real application actions.
- Keep `docs/openapi.yaml` and `frontend/src/types/api.ts` in sync when endpoints change.
- Add production Docker or deployment config for your target platform.
