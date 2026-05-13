# Laravel API + React Template

Template repository for a Laravel API backend and a React/Vite frontend.

The starter connection is intentionally small: React calls `GET /api/foo`, and Laravel returns a JSON `foo: bar` response. Sanctum is installed in the backend for future API work, but this template does not include authentication screens or auth routes.

## Stack

- Backend: Laravel 13, PHP 8.3+, Sanctum
- Frontend: React 19, TypeScript, Vite
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
php artisan migrate
php artisan serve
```

The API runs at `http://127.0.0.1:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://127.0.0.1:5173` and proxies `/api` requests to Laravel.

## Docker

```bash
docker compose up --build
```

Services:

- Frontend: `http://127.0.0.1:5173`
- API: `http://127.0.0.1:8000`

## Useful Commands

```bash
cd api && composer test
cd api && ./vendor/bin/pint --test
cd frontend && npm run lint
cd frontend && npm run build
```

## Template Checklist

After creating a new project from this template:

- Rename the project in `api/composer.json` and `frontend/package.json`.
- Update `APP_NAME` in `api/.env.example`.
- Replace the demo `/api/foo` endpoint with project-specific routes.
- Add production Docker or deployment config for your target platform.
