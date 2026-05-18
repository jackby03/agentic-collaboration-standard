# dotagents-example

This example documents a proposed interoperability layer between ACS v1 and a frontmatter-oriented `.agents/` layout inspired by `dot-agents` style projects.

It is intentionally presented as a prototype:

- ACS v1 today defines `.agents/main.yaml` as the canonical project manifest.
- This example explores how a file-per-entity `.agents/` structure could map into ACS concepts without losing portability.
- The goal is convergence, not replacement. Projects should be able to adopt useful ideas from adjacent ecosystems while keeping a stable ACS core.

## What this example contains

```text
examples/dotagents-example/
└── .agents/
    ├── mcp.json
    ├── agents/
    │   └── code-reviewer/agent.md
    ├── skills/
    │   └── code-review/skill.md
    ├── tasks/
    │   └── daily/task.md
    └── memories/
        └── arch-decisions.md
```

## Mapping to ACS v1

| Proposed file | ACS v1 concept | Notes |
|---|---|---|
| `.agents/mcp.json` | `.agents/main.yaml` manifest | Prototype JSON representation for project metadata, compatibility, and active layers. |
| `.agents/agents/*/agent.md` | Agent definitions | Frontmatter maps cleanly to `agent.schema.json`; Markdown body remains the full instruction payload. |
| `.agents/skills/*/skill.md` | Skills | Same idea as ACS `SKILL.md`, but this prototype uses lowercase `skill.md` to match the external convention being evaluated. |
| `.agents/tasks/*/task.md` | Future ACS task layer | Not part of ACS v1 today; included here to make room for repeatable workflows and scheduled routines. |
| `.agents/memories/*.md` | Future ACS memory/privacy layer | Experimental area for opt-in project memory with explicit sensitivity metadata and export rules. |

## Design principles shown here

- Compatibility first: the structure is meant to be mappable to ACS, not siloed from it.
- Good ideas are welcome: if adjacent projects solve a problem better, ACS should be able to adopt that pattern deliberately.
- Safety by default: tasks and memories are modeled as explicit artifacts so validation and privacy policy can be added later.
- Incremental migration: tooling should eventually be able to convert this layout into canonical ACS manifests and schemas.

## Current status

This folder is a documentation and reference artifact for interoperability work. It is not yet the normative ACS v1 layout and should be read alongside [docs/interop-dotagents.md](../../docs/interop-dotagents.md).
