# 8. Permissions

## Purpose

The permissions layer defines what agents are allowed to read, write, and execute. It acts as a safety boundary.

## Structure

```
.agents/permissions/
└── policy.yaml
```

## `policy.yaml` format

```yaml
# ACS Permission Policy v1.0

deny:
  read:
    - ".env"
    - ".env.*"
    - "secrets/**"
    - "*.pem"
    - "*.key"
  write:
    - "prisma/migrations/**"
    - "lib/payments/**"

allow:
  read:
    - "**"
  write:
    - "src/**"
    - "app/**"
    - "components/**"
    - "tests/**"
```

## Evaluation order

1. **Deny rules checked first** — if a path matches any deny rule, access is blocked
2. **Allow rules checked second** — if no deny match, check allow rules
3. **Default: deny** — if no rule matches, access is denied

## Loading behavior

Permissions are **Tier 1** — always loaded at session start. Agents must respect these rules before performing any file operation.

## Glob patterns

ACS uses standard glob syntax:
- `*` — any characters except `/`
- `**` — any characters including `/`
- `*.ext` — any file with that extension
