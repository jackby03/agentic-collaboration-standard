# 2. Layout

## Root folder

ACS uses a `.agents/` folder at the root of the project:

```
your-project/
├── AGENTS.md                  # Optional: human+agent overview (agents.md compatible)
└── .agents/                   # ACS root folder
    ├── acs.yaml               # Required: project manifest
    ├── context/               # Optional layer
    ├── skills/                # Optional layer
    ├── commands/              # Optional layer
    ├── agents/                # Optional layer
    └── permissions/           # Optional layer
```

## Minimal valid ACS project

The only required file is `acs.yaml`:

```
.agents/
└── acs.yaml
```

## Nested projects (monorepos)

In monorepos, each package can have its own `.agents/` folder. The nearest `.agents/` to the current working directory takes precedence.

```
monorepo/
├── .agents/           # Root: shared context
│   └── acs.yaml
├── packages/
│   ├── api/
│   │   └── .agents/   # Package-specific override
│   │       └── acs.yaml
│   └── web/
│       └── .agents/
│           └── acs.yaml
```

## Cross-client interoperability

ACS scans `.agents/` as its primary location. Agents implementing ACS may also scan vendor-specific paths for backwards compatibility:
- `.claude/skills/` — Claude Code
- `.cursorrules` — Cursor
- `.windsurfrules` — Windsurf
- `.github/copilot-instructions.md` — GitHub Copilot
- `GEMINI.md` — Gemini CLI
- `CODEX.md` — OpenAI Codex
- `.junie/guidelines.md` — JetBrains Junie
- `.kiro/` — AWS Kiro
- `.trae/rules/` — Trae
- `~/.agents/` — user-level skills (any tool)

The project-level `.agents/` always takes precedence. The planned `acs compile` CLI can generate vendor-specific files from a single ACS source.
