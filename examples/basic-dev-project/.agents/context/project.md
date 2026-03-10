# Project Context

## Stack
- Next.js 15, TypeScript strict
- PostgreSQL via Prisma ORM
- Tailwind CSS
- Deployed on Vercel

## Architecture
- `/app` — App Router pages and layouts
- `/components` — Reusable UI components
- `/lib` — Business logic and utilities
- `/prisma` — Schema and migrations

## Conventions
- Named exports only (no default exports)
- Use `zod` for all input validation
- Semantic commits (feat:, fix:, chore:)
- Component files: PascalCase

## Do not change without explicit instruction
- `/lib/payments` — PCI scope
- `prisma/schema.prisma` — requires migration
- Environment variable names
