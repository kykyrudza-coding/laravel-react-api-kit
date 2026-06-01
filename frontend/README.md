# Frontend

React/Vite frontend for the template repository.

## Included

- Shared API client in `src/lib/api.ts`
- Axios API instance
- TanStack Query for API state
- API error parsing
- Toast messages for API errors and auth state
- Demo UI for `foo`, login, `me`, RBAC-protected endpoint, and logout
- Laravel Echo client for Reverb
- Sentry React initialization
- react-i18next setup
- Vitest and Testing Library
- Prettier formatting
- Manual API payload types in `src/types/api.ts`

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

During local development, Vite proxies `/api` to the Laravel backend.

## Environment Examples

- `.env.local.example`
- `.env.staging.example`
- `.env.production.example`

## Commands

```bash
npm run lint
npm run format:check
npm run test
npm run build
npm run preview
```
