# 5. Skills

## Purpose

Skills are reusable capability packages — instructions, scripts, and references that agents load when performing specific tasks.

## Compatibility

ACS skills are **fully compatible with the [agentskills.io](https://agentskills.io) SKILL.md format**. Any valid agentskills.io skill works inside `.agents/skills/`.

## Structure

```
.agents/skills/
└── skill-name/
    ├── SKILL.md              # Required: instructions + frontmatter
    ├── scripts/              # Optional: executable code
    ├── references/           # Optional: documentation loaded on demand
    └── assets/               # Optional: templates, static files
```

## `SKILL.md` format

```markdown
---
name: create-component
description: Create a React component following project conventions. Use when asked to build UI components, widgets, or pages.
---

## Steps

1. Check context/project.md for naming conventions
2. Create the file in /components
3. Use named export
4. Add TypeScript types
5. Write a basic test in /tests

## Output format
- One file per component
- File name: PascalCase
```

## Progressive disclosure

- **Tier 1** (session start): `name` + `description` only (~50 tokens per skill)
- **Tier 2** (on activation): Full `SKILL.md` body
- **Tier 3** (on demand): Files in `references/`, `scripts/`, `assets/`

Agents activate a skill when the task matches the skill's description.
