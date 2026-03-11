# 1. Overview

## What is ACS?

The Agentic Collaboration Standard (ACS) is an open format for describing how AI agents should interact with a project. It defines a folder structure, a set of file types, and a behavioral contract for agents that implement it.

## Goals

- **Portability** — One configuration works across tools such as Cursor, Zed, Claude Code, Gemini, Codex, Kiro, Trae, Windsurf, JetBrains Junie, Coodo, GitHub Copilot, Roo Code, Antigravity, Firebase Studio, and future tools
- **Progressive adoption** — Start with a single file; add layers as needed
- **Human-readable** — Plain Markdown and YAML. No special runtime required to read it
- **Inclusive** — Useful for developers, non-developers, and enterprises equally

## Design principles

1. **Files over configuration** — Behavior is described in text files, not JSON schemas or APIs
2. **Progressive disclosure** — Agents load only what they need, when they need it
3. **Additive compatibility** — ACS coexists with AGENTS.md, SKILL.md, and other standards
4. **Explicit over implicit** — Permissions and capabilities are declared, not assumed

## What ACS is NOT

- Not a runtime protocol (that's MCP)
- Not an agent framework (that's LangChain, CrewAI, etc.)
- Not a replacement for AGENTS.md or SKILL.md — it complements them

## Relationship to other standards

```
┌─────────────────────────────────────────────┐
│                  Your Project               │
│                                             │
│  AGENTS.md ──── Human-readable overview     │
│                                             │
│  .agents/  ──── ACS: full agent config      │
│    ├── context/                             │
│    ├── skills/  ←── SKILL.md compatible     │
│    ├── commands/                            │
│    ├── agents/                              │
│    └── permissions/                         │
│                                             │
│  MCP servers ── Runtime tools (separate)    │
└─────────────────────────────────────────────┘
```
