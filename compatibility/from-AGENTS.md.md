# Compatibility: AGENTS.md → ACS

ACS and AGENTS.md are **complementary**, not competing.

## Recommended approach

Keep your `AGENTS.md` at the root for tools that only support AGENTS.md. Add `.agents/` alongside it for richer configuration.

```
your-project/
├── AGENTS.md          # Keep this — compatibility with 60k+ projects
└── .agents/           # Add this — ACS layers
    ├── acs.yaml
    └── context/
        └── project.md
```

## What to put where

| Content | AGENTS.md | ACS |
|---|---|---|
| Project overview | ✅ | ✅ context/project.md |
| Build commands | ✅ | ✅ context/project.md |
| Skills/capabilities | ❌ | ✅ skills/ |
| Agent roles | ❌ | ✅ agents/ |
| Permissions | ❌ | ✅ permissions/ |

## Migration path

1. Create `.agents/acs.yaml` with `layers: { context: true }`
2. Copy AGENTS.md content to `.agents/context/project.md`
3. Keep AGENTS.md as a summary pointing to `.agents/`
