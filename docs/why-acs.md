# Why ACS?

## The problem with today's agentic tools

Every AI coding tool invents its own configuration format. Claude Code uses `CLAUDE.md`. Cursor uses `.cursorrules`. Windsurf uses `.windsurfrules`. GitHub Copilot uses `.github/copilot-instructions.md`. Gemini CLI uses `GEMINI.md`. JetBrains Junie uses `.junie/guidelines.md`. Kiro uses a `.kiro/` folder. Trae, Roo Code, Zed, Codex, Codo, Antigravity, Firebase Studio — each with its own format. AGENTS.md standardizes instructions but not structure, permissions, or agent roles.

If you use more than one tool — or your team uses different tools — you're duplicating effort. Knowledge stays trapped in vendor-specific formats. When you switch tools, you lose your configuration.

## What ACS does

ACS defines a single `.agents/` folder that any compatible agent can read. One configuration, any tool.

It also solves things AGENTS.md doesn't:
- **Skills** — reusable capability packages, not just instructions
- **Named agents** — specialized personas for specific roles (reviewer, tester, docs writer)
- **Permissions** — explicit access control for what agents can read and write
- **Commands** — reusable single-shot tasks

## Why not just extend AGENTS.md?

AGENTS.md is intentionally minimal — just Markdown, no structure enforced. That's its strength for basic use. ACS is for teams and projects that need more: multiple agents, explicit permissions, reusable skills. ACS works alongside AGENTS.md, not against it.

## Why not just use SKILL.md?

agentskills.io SKILL.md is great for individual skills. ACS uses the exact same format for its skills layer. But SKILL.md doesn't define project context, permissions, commands, or how agents should behave. ACS is the project-level layer that gives skills a home.
