# Compatibility: CLAUDE.md → ACS

`CLAUDE.md` is Claude Code's vendor-specific configuration file. ACS replaces it with a portable format.

## Side-by-side (transition period)

During transition, keep both:

```
your-project/
├── CLAUDE.md          # Claude Code still reads this
└── .agents/           # ACS: portable, tool-agnostic
    ├── acs.yaml
    ├── context/
    │   └── project.md
    ├── skills/
    └── permissions/
```

## Content mapping

| CLAUDE.md section | ACS equivalent |
|---|---|
| Project description | `context/project.md` |
| Coding conventions | `context/project.md` |
| Custom slash commands | `commands/` |
| Subagents | `agents/` |
| `ignorePatterns` | `permissions/policy.yaml` → deny.read |
| Hooks | `FUTURE.md` → v2.0 |

## Future: `acs compile`

The planned `acs compile` CLI command (v2.0) will generate `CLAUDE.md` automatically from `.agents/`, eliminating the need to maintain both.
