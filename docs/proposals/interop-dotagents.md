# Interoperability: ACS and Frontmatter-Based `.agents/`

## Summary

This document describes an interoperability track between ACS and a frontmatter-based `.agents/` layout inspired by ecosystem efforts such as `dot-agents` and `dotagentsprotocol`.

The goal is not to compete with adjacent formats or force artificial convergence. The goal is to enable real compatibility, gradual migration, and deliberate adoption of strong ideas, even when they originate outside ACS.

## ACS Position

ACS should act as a convergence point:

- compatible with existing initiatives when that reduces friction;
- open to adopting external proposals when they improve developer experience, interoperability, or clarity;
- careful about turning new ideas into normative behavior before they have validation, tests, and governance.

In short: compatibility where it preserves continuity; adoption where it clearly improves the standard.

## Important note about ACS v1

ACS v1 currently defines a canonical structure centered on `.agents/main.yaml` and layers such as `context/`, `skills/`, `agents/`, and `permissions/`.

The structure described in this document does not silently replace that definition. For now it should be read as:

1. an interoperability proposal;
2. a modeling experiment;
3. a possible input into a future extension or revision of the standard.

## Principles

- Do not compete on file layout alone; pursue convergence and compatibility.
- Preserve portability; avoid tying critical configuration to one provider or runtime.
- Adopt strong ecosystem ideas when they solve a real problem better than the current state.
- Treat validation and safety as first-class concerns.
- Design for incremental migration, not abrupt rewrites.

## Concept mapping

| Proposed structure | Related ACS concept | Status |
|---|---|---|
| `.agents/mcp.json` | `main.yaml` / ACS manifest | Prototype JSON manifest for interoperability |
| `.agents/agents/*/agent.md` | Agent definitions | Direct mapping of frontmatter plus Markdown body |
| `.agents/skills/*/skill.md` | ACS skills | Very close to the current model, with a different file naming convention |
| `.agents/tasks/*/task.md` | Possible future task layer | Not normative in ACS v1 |
| `.agents/memories/*.md` | Possible future memory layer | Not normative in ACS v1; requires privacy policy |

## File mapping

- `.agents/agents/*/agent.md` ↔ `schemas/v1/agent.schema.json`
- `.agents/mcp.json` ↔ `schemas/v1/manifest.schema.json` with additional interoperability rules
- `.agents/skills/*/skill.md` ↔ `schemas/v1/skill.schema.json`
- `.agents/tasks/*/task.md` ↔ future `schemas/v1/task.schema.json`
- `.agents/memories/*.md` ↔ future `schemas/v1/memory.schema.json`

## Ideas worth adopting from the ecosystem

These are the areas where ACS may benefit from adjacent projects:

- More granular artifacts: one file per agent, skill, task, or memory improves inspection, reuse, and tooling.
- Frontmatter as a portable metadata layer: it enables validation without sacrificing Markdown expressiveness.
- Tasks and memories as first-class objects: they make explicit what many teams currently model informally.
- More ergonomic initialization and linking flows: useful for CLI adoption and larger teams.

ACS should not copy these patterns automatically. It should evaluate them and adopt them where they solve a real problem better than the current approach.

## Merge semantics still to define

If ACS formalizes this structure, it needs explicit merge semantics:

- precedence across workspace, monorepo, current folder, and user-level configuration;
- duplicate ID resolution for agents, skills, tasks, and memories;
- intentional deletions or negative overrides;
- partial inheritance versus full replacement;
- behavior when `main.yaml` and alternative manifests such as `mcp.json` coexist.

Those rules should be written before this model is treated as a stable part of the standard.

## Security and privacy

Memories deserve special treatment:

- opt-in by default;
- sensitivity metadata;
- explicit masking or export rules;
- ability to exclude them from tooling and bundles;
- basic automated validation to avoid accidental exposure.

Interoperability should not become a path for normalizing persistent storage without safeguards.

## Bundles and distribution

It is also reasonable to explore a versioned bundle format such as `.dotagents`, with:

- an internal manifest;
- verifiable integrity;
- recommended signing;
- support for sharing skills, agents, and project configuration.

That fits ACS's portability goals, but it requires schemas, tooling, and trust policy.

## Initial artifacts in this repository

- [examples/dotagents-example](../../examples/dotagents-example/) shows a frontmatter-first `.agents/` structure mapped conceptually to ACS.
- The example includes `mcp.json`, one agent, one skill, one task, and one memory to expose the full design space.
- [scripts/validate_dotagents.py](../../scripts/validate_dotagents.py) provides minimal validation for the JSON manifest and Markdown files with frontmatter.

## Local validation

To validate the current example:

```bash
python scripts/validate_dotagents.py examples/dotagents-example
```

To run the validator tests:

```bash
python -m pytest tests/python/test_dotagents_validation.py -v
```

## Suggested work plan

1. Land a readable, self-contained interoperability example.
2. Define prototype schemas for `task`, `memory`, and `bundle`, and extend frontmatter validation.
3. Test merge semantics and precedence rules with integration coverage.
4. Document migration paths from adjacent formats and the local validation workflow.
5. Prepare an AAIF proposal that explains compatibility, selective adoption, and governance.

## Adoption criteria

An external proposal should be considered for ACS when it meets most of these criteria:

- it improves clarity or ergonomics without compromising portability;
- it can be validated mechanically;
- it does not undermine the ACS conceptual model;
- it has a reasonable migration story;
- it improves interoperability with real tools or communities.

## Current status

- Interoperability note expanded and translated to English.
- Reference example added in `examples/dotagents-example/`.
- Prototype schemas added for `task`, `memory`, and `bundle`.
- Minimal validator and baseline tests added.
