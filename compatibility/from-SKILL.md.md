# Compatibility: agentskills.io SKILL.md → ACS

ACS skills are **100% compatible** with the agentskills.io SKILL.md format.

## Using existing skills in ACS

Simply copy or symlink skill folders into `.agents/skills/`:

```
.agents/skills/
└── pdf-processing/       # Any valid agentskills.io skill works here
    ├── SKILL.md
    └── scripts/
        └── extract.py
```

No changes needed. ACS reads `SKILL.md` frontmatter using the same spec.

## Differences in scope

| Feature | agentskills.io | ACS |
|---|---|---|
| Skill format | ✅ defines | ✅ same format |
| Project context | ❌ | ✅ context/ |
| Permissions | ❌ | ✅ permissions/ |
| Named agents | ❌ | ✅ agents/ |
| Commands | ❌ | ✅ commands/ |

ACS extends agentskills.io at the project level.
