# 2. Layout

## Root folder

ACS uses a `.agents/` folder at the root of the project:

```
your-project/
├── AGENTS.md                  # Optional: human+agent overview (agents.md compatible)
└── .agents/                   # ACS root folder
    ├── main.yaml               # Required: project manifest
    ├── context/               # Optional layer
    ├── skills/                # Optional layer
    ├── commands/              # Optional layer
    ├── agents/                # Optional layer
    └── permissions/           # Optional layer
```

## Minimal valid ACS project

The only required file is `main.yaml`:

```
.agents/
└── main.yaml
```

## Nested projects (monorepos)

In monorepos, each package can have its own `.agents/` folder. The nearest `.agents/` to the current working directory takes precedence.

```
monorepo/
├── .agents/           # Root: shared context
│   └── main.yaml
├── packages/
│   ├── api/
│   │   └── .agents/   # Package-specific override
│   │       └── main.yaml
│   └── web/
│       └── .agents/
│           └── main.yaml
```

## Cross-client interoperability

ACS scans `.agents/` as its primary location. Agents implementing ACS may also scan:
- `.claude/skills/` — for Claude Code compatibility
- `~/.agents/` — for user-level skills

The project-level `.agents/` always takes precedence.
