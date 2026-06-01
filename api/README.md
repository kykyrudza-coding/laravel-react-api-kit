# API

Laravel API application for the template repository.

## Included

- Laravel 13
- Sanctum bearer-token auth
- Versioned routes under `/api/v1`
- Basic RBAC models and tables
- Permission middleware: `permission:{permission-name}`
- Rate limiting for API and login routes
- Pest tests for public, auth, and protected endpoints
- Scribe API documentation
- Redis queues/cache with Horizon
- Reverb broadcasting
- S3-compatible storage
- Sentry integration
- Laravel language files
- Telescope dev-only debugging

## Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

## Demo User

```text
email: admin@example.com
password: password
role: admin
permission: foo.view
```

## Endpoints

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

Protected advanced endpoints require a Sanctum bearer token.

## Environment Examples

- `.env.local.example`
- `.env.staging.example`
- `.env.production.example`

## API Docs

```bash
composer docs
```

Generated docs are served by Laravel at `/docs`. The hand-maintained OpenAPI contract for frontend types lives at `../docs/openapi.yaml`.

## Tests

```bash
composer test
composer format:test
```

## Advanced Services

```bash
composer horizon
composer reverb
```

Horizon needs `pcntl` and `posix`, so use Docker/Linux for the queue dashboard and workers. MinIO is available through Docker for S3-compatible local file storage.
