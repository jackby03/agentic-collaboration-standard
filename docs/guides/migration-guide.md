# Migration Guide: Existing Agent Files -> ACS and Interoperable `.agents/`

This guide explains how to move from common agent-related project files into ACS, while keeping room for the frontmatter-based `.agents/` interoperability prototype documented in this repository.

## Migration goals

There are two valid targets depending on what you are trying to do:

- **Canonical ACS v1**: use `.agents/main.yaml` and the documented ACS layer layout.
- **Interop prototype**: use the file-per-entity `.agents/` layout from [interop-dotagents.md](../proposals/interop-dotagents.md) when evaluating compatibility with adjacent projects.

For most teams, the right path is:

1. migrate into canonical ACS first;
2. add interop artifacts only where they help testing, conversion, or outreach.

## Recommended migration order

1. Preserve the existing source files.
2. Identify which content is project context, skill logic, agent role text, workflow/task logic, or persistent memory.
3. Move stable project guidance into canonical ACS layers.
4. Add interoperable frontmatter artifacts only for concepts that need cross-project mapping.
5. Validate the result and compare behavior with the original setup.

## Source format mapping

| Source | Canonical ACS target | Interop prototype target | Notes |
|---|---|---|---|
| `AGENTS.md` | `.agents/context/project.md` plus `AGENTS.md` as summary | optional `memories/` or `agents/*/agent.md` only if structure is needed | Best as high-level project context first |
| `CLAUDE.md` | `.agents/context/project.md`, skills, commands, or agents depending on content | same, with frontmatter split if desired | Usually needs manual decomposition |
| `.cursor/` or `.cursorrules` | context + commands + permissions | frontmatter artifacts only if comparing formats | Cursor rules often mix policy and workflow |
| `.codex/` conventions or local instructions | context, permissions, or skills | same | Separate persistent project truth from user-local preferences |
| `SKILL.md` | `.agents/skills/<name>/SKILL.md` | `.agents/skills/<name>/skill.md` when testing interop | ACS already aligns closely with this model |

## Manual migration examples

### From `AGENTS.md`

If the file is mostly global repository guidance:

- move durable project instructions into `.agents/context/project.md`;
- keep `AGENTS.md` as a short compatibility summary that points to `.agents/`;
- extract repeated task procedures into skills or commands if they are clearly reusable.

### From `CLAUDE.md`

Split the content by intent:

- project rules -> `context/project.md`
- repeatable capability -> `skills/`
- named role or reviewer persona -> `agents/`
- execution boundaries -> `permissions/`

Avoid copying the whole document into a single ACS file unless the source is already well-structured.

### From `.cursor/rules/`

Cursor rule folders often mix instruction text, code style preferences, and workflow nudges. A good migration is:

- stable conventions -> `context/project.md`
- recurring workflows -> `commands/` or future `tasks/`
- guardrails -> `permissions/policy.yaml`

### Into the interop prototype

Only create prototype frontmatter artifacts when they help answer a specific interoperability question.

Examples:

- need a named external-style agent -> `agents/<name>/agent.md`
- need test coverage for repeatable routines -> `tasks/<name>/task.md`
- need to model persistent notes with metadata -> `memories/<id>.md`

## Validation workflow

Canonical ACS:

```bash
python reference-impl/python/acs_validator.py ./your-project
```

Interop prototype:

```bash
python scripts/validate_dotagents.py examples/dotagents-example
```

## Current migration gaps

These areas are not fully automated yet:

- generating interop frontmatter from canonical ACS files;
- converting vendor-specific files into normalized tasks or memories;
- preserving merge semantics across nested projects;
- translating privacy metadata into enforcement rules.

That is why migration should remain explicit and reviewable for now.

## Practical advice

- Keep the original files during migration until the new layout is proven.
- Prefer small, reviewable transformations over one-shot rewrites.
- Do not normalize tasks or memories before agreeing on privacy expectations.
- Treat `mcp.json` as an interoperability artifact, not as a replacement for `main.yaml`, unless the spec evolves to say otherwise.

## Related documents

- [Interop note](../proposals/interop-dotagents.md)
- [Privacy guidelines for memories](./privacy-memories.md)
- [Examples](../../examples/README.md)
