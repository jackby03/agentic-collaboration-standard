# ACS for Non-Developers

You don't need to write code to use ACS. If you work with AI tools like Cursor, Zed, Claude Code, Gemini, Codex, Kiro, Trae, Windsurf, JetBrains Junie, Coodo, GitHub Copilot, Roo Code, Antigravity, Firebase Studio, or similar tools, ACS helps them understand your project better.

## What problem does ACS solve?

When you open a project with an AI assistant, the assistant starts fresh every time. It doesn't know your rules, your style, what it should avoid, or what tasks you repeat often. Without ACS, you re-explain the same things in every session.

With ACS, you write it once — and any ACS-compatible tool reads it automatically at the start of every session.

## What you can do with ACS

**Tell agents what they need to know:**
Create a `.agents/context/project.md` file and write, in plain language, what your project is about. The agent reads this before every session.

```markdown
# Project Context

## What this is
A weekly newsletter about sustainable travel for general readers.

## Voice and style
- Friendly, conversational
- Short paragraphs (2–4 sentences)
- No corporate jargon

## Do not change without asking me first
- The newsletter name ("The Green Mile")
- Subscriber data in /subscribers/
```

**Create reusable tasks (skills):**
Skills are saved instructions for tasks you do repeatedly. Write it once as a skill, and your AI assistant will use it automatically when the task matches.

```
.agents/skills/
└── write-subject-line/
    └── SKILL.md   ← instructions for writing email subject lines
```

**Create quick named tasks (commands):**
Commands are like shortcuts — one-shot tasks you can invoke by name.

```
.agents/commands/
└── write-summary.md   ← "Summarize this document in 3 bullet points"
```

**Define who does what (agents):**
Create AI personas in `.agents/agents/`. For example, a `reviewer.md` that acts as a careful reviewer, or a `writer.md` that writes in your brand's voice.

**Protect sensitive files (permissions):**
Tell the AI what it is never allowed to touch:

```yaml
# .agents/permissions/policy.yaml
deny:
  write:
    - "subscribers/**"
    - "finances/**"
```

## You don't need to

- Learn a programming language
- Understand complex configuration files — ACS is plain Markdown and simple YAML (just labels and values)
- Run any terminal commands — just create folders and text files in your project

## Start simple

You only need two things to start:

1. A folder called `.agents` in your project
2. A file called `main.yaml` inside it with the project name and description

```yaml
version: "1.0"
project:
  name: "my-newsletter"
  description: "Weekly newsletter about sustainable travel"
```

Then add `context/project.md` with your rules. Everything else is optional and additive.

## The layers at a glance

| Layer | What it does | Required? |
|---|---|---|
| `main.yaml` | Identifies the project to AI tools | Yes |
| `context/` | What the AI needs to know (rules, style, architecture) | Recommended |
| `skills/` | Reusable task instructions | Optional |
| `commands/` | Quick named one-shot tasks | Optional |
| `agents/` | Specialized AI personas for specific roles | Optional |
| `permissions/` | What the AI is allowed to read or write | Optional |

## Next steps

- Follow the [Getting Started guide](getting-started.md) for step-by-step setup
- Browse [example projects](../examples/) to see complete `.agents/` configurations
- Ask questions in [GitHub Discussions](https://github.com/jackby03/agentic-collaboration-standard/discussions)
