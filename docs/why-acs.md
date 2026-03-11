# Why ACS?

## The problem with today's agentic tools

Every AI coding tool invents its own configuration format. Here is what that fragmentation looks like in practice:

| Tool | Config file / path |
|------|--------------------|
| Claude Code | `CLAUDE.md` + `.claude/` |
| Cursor | `.cursorrules` or `.cursor/rules/` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Codex (OpenAI) | `AGENTS.md` + `~/.codex/config.toml` |
| Windsurf | `.windsurfrules` |
| Roo Code | `.clinerules` or `.roo/` |
| Gemini CLI | `GEMINI.md` |
| Zed | `.zed/` (editor settings with AI context) |
| Kiro | `.kiro/steering/` |
| JetBrains Junie | `.junie/guidelines.md` |
| Trae | `.trae/rules/` |
| Aider | `.aider.conf.yml` or `CONVENTIONS.md` |
| AGENTS.md-based tools | `AGENTS.md` |

`AGENTS.md` standardizes plain-text instructions, but not structure, permissions, or agent roles. Every other tool above uses a completely different, incompatible format.

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
