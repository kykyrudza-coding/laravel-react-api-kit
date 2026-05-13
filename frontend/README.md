# Frontend

React/Vite frontend for the template repository.

## Setup

```bash
npm install
npm run dev
```

The app calls `GET /api/foo`. During local development, Vite proxies `/api` to the Laravel backend.

## Environment

```bash
cp .env.example .env
```

`VITE_API_PROXY_TARGET` controls where Vite sends API requests.

## Commands

```bash
npm run lint
npm run build
npm run preview
```
