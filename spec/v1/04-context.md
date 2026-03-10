# 4. Context

## Purpose

Context files tell agents what they need to **know** about the project: architecture, conventions, domain rules, and anything a new team member would need to understand before making changes.

## Structure

```
.agents/context/
├── project.md          # Required if context layer is active
└── domain.md           # Optional: business logic, glossary
```

## `project.md`

The primary context file. Recommended sections:

```markdown
# Project Context

## Stack
- Framework: Next.js 15
- Database: PostgreSQL via Prisma
- Auth: NextAuth.js

## Architecture
- /app — App Router pages
- /components — Reusable UI
- /lib — Business logic

## Conventions
- TypeScript strict mode everywhere
- Named exports only (no default exports)
- zod for all input validation

## Do not change without explicit instruction
- /lib/payments (PCI scope)
- Database schema (requires migration)
- Environment variable names
```

## Loading behavior

Context files are **Tier 1** — loaded at session start and kept in context for the duration. Keep them concise (under 300 lines recommended).

For large domains, split into multiple files under `context/`. Agents load `project.md` always, and load other files on demand when the task is relevant.
