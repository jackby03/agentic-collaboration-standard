# Project Context

## Stack
- Node.js 20 + TypeScript strict
- Express 5
- PostgreSQL 16 via Prisma
- Redis for caching
- AWS ECS deployment

## Architecture
- `/src/routes` — Express route handlers
- `/src/services` — Business logic
- `/src/models` — Prisma models
- `/src/middleware` — Auth, validation, logging
- `/tests` — Jest unit + integration tests

## Conventions
- All routes must go through auth middleware
- Use service layer — no DB calls in route handlers
- All external inputs validated with zod
- Errors use AppError class from `/src/lib/errors`

## Team
- Backend team owns `/src/services`, `/src/models`
- Platform team owns `/src/middleware`, `/src/routes`
- DevOps owns `/infra`, `/docker-compose.yml`
