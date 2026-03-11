# ACS for Non-Developers

You don't need to write code to use ACS. If you work with AI tools like Claude Code, Cursor, Windsurf, Gemini, Copilot, Kiro, or any other agentic tool, ACS helps those tools understand your project better — without having to configure each one separately.

## What you can do with ACS

**Tell agents what they need to know:**
Create a `.agents/context/project.md` file and write, in plain language, what your project is about. The agent reads this before every session.

**Create reusable tasks:**
Create a `.agents/commands/` folder with `.md` files describing tasks you run often. Example:

```
.agents/commands/
└── write-summary.md   ← "Summarize this document in 3 bullet points"
```

**Define who does what:**
Create agent personas in `.agents/agents/`. For example, a `reviewer.md` that acts as a careful reviewer, or a `writer.md` that writes in your brand's voice.

## You don't need to

- Learn a programming language
- Understand JSON or YAML (YAML in ACS is mostly just labels and values)
- Run any commands — just create folders and `.md` files

## Start simple

You only need two things to start:

1. A folder called `.agents` in your project
2. A file called `acs.yaml` inside it with the project name

Everything else is optional and additive.
