# 6. Commands

## Purpose

Commands are **single-shot, named tasks** that agents or users can invoke directly. Unlike skills (which describe how to do something), commands describe what to do in a specific, repeatable way.

Think of them as slash commands, macros, or saved prompts.

## Structure

```
.agents/commands/
├── explain-error.md
├── summarize-diff.md
└── check-conventions.md
```

## Command file format

```markdown
---
name: explain-error
description: Explain a code error in plain language. Use when the user pastes an error message.
input: error_message
---

## Task

Given the error message provided, explain:
1. What caused the error (in plain language)
2. Where in the code it likely originated
3. How to fix it (step by step)
4. How to prevent it in the future

## Output format
- Use simple language, avoid jargon
- Max 200 words
- Code examples where relevant
```

## Frontmatter fields

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Unique identifier, kebab-case |
| `description` | Yes | When to use this command |
| `input` | No | What input the command expects |

## Loading behavior

Commands are **Tier 1** for names/descriptions, **Tier 2** for full content on invocation. Users can invoke commands explicitly (e.g., `/explain-error`) or agents can activate them automatically when the task matches.
