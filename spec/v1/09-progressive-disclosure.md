# 9. Progressive Disclosure

Progressive disclosure is the core loading strategy of ACS. It keeps agent context small while giving access to specialized knowledge on demand.

## Three tiers

| Tier | Content | When loaded | Token cost |
|---|---|---|---|
| **1 — Always** | Names + descriptions of all layers | Session start | ~20-100 tokens per item |
| **2 — On activation** | Full file content | When task matches | < 5,000 tokens recommended |
| **3 — On demand** | Referenced sub-files | When instructions reference them | Varies |

## What loads at each tier

### Tier 1 (always in context)
- `acs.yaml` — full manifest
- `permissions/policy.yaml` — full permissions
- `context/project.md` — full project context
- **Names and descriptions only** of: skills, commands, agents

### Tier 2 (on activation)
- Full `SKILL.md` body when a skill is activated
- Full command file when a command is invoked
- Full agent definition when an agent is called

### Tier 3 (on demand)
- `skills/*/references/*` — when skill instructions reference them
- `skills/*/scripts/*` — when skill instructs execution
- `context/domain.md` and other context sub-files — when task is domain-relevant

## File size recommendations

| File | Max recommended size |
|---|---|
| `context/project.md` | 300 lines |
| Individual `SKILL.md` | 500 lines |
| Command files | 100 lines |
| Agent definitions | 200 lines |
| Reference files | 500 lines |

Larger files should be split and cross-referenced.
