# 7. Agents

## Purpose

Named subagents are specialized AI personas configured for specific roles within the project. Each agent has its own context, capabilities, and constraints.

## Structure

```
.agents/agents/
├── reviewer.md
├── tester.md
└── docs-writer.md
```

## Agent file format

```markdown
---
name: reviewer
description: Code reviewer focused on correctness, security, and convention compliance.
---

## Role

You are a senior code reviewer for this project. Your job is to review changes and provide structured, actionable feedback.

## Focus areas

- Correctness: Does the code do what it claims?
- Security: Any injection, auth bypass, or data exposure?
- Conventions: Does it follow context/project.md rules?
- Tests: Are edge cases covered?

## Output format

Per file:
- Line-level comments with specific suggestions
- Severity: BLOCKER / WARNING / SUGGESTION

Summary:
- APPROVE / REQUEST_CHANGES
- Max 5 bullet points
```

## Frontmatter fields

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Unique identifier, kebab-case |
| `description` | Yes | What this agent does and when to use it |

## Loading behavior

Agent definitions are **Tier 2** — loaded when the agent is explicitly invoked or when the task clearly matches the agent's role. The main session loads only names and descriptions at startup.
