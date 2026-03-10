# Future — Planned for v2.0+

These file types and features are intentionally excluded from v1.0. They are documented here so tool builders can plan ahead.

## Workflows

Multi-step, deterministic processes with explicit step sequencing.

```
.agents/workflows/
└── review-pr.md
```

Planned frontmatter:
```yaml
---
name: review-pr
trigger: manual | on_pr | on_push
steps:
  - read-diff
  - check-conventions
  - write-review
---
```

## Hooks

Lifecycle triggers that fire before or after agent actions.

```
.agents/hooks/
├── pre-commit.md
└── post-edit.md
```

## Profiles

Named capability sets that configure agent behavior and permissions together.

```
.agents/profiles/
├── developer.md
├── reviewer.md
└── junior.md
```

## Toolsets

Declarations of which MCP servers and tools the project expects.

```
.agents/tools/
└── toolset.yaml
```

## CLI (`acs` command)

```bash
acs init          # scaffold .agents/ in current project
acs validate      # check ACS files against schemas
acs compile       # generate CLAUDE.md, .cursorrules, etc.
acs ls            # list active layers and files
```

The CLI is planned for v2.0 as a separate package.
