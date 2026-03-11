# ACS — Agentic Collaboration Standard

This is the canonical repository for the **Agentic Collaboration Standard (ACS)**: an open format for configuring how AI agents interact with a project.

## What's in this repo

| Path | Purpose |
|---|---|
| `spec/v1/` | The full v1.0 specification (10 sections) |
| `schemas/v1/` | JSON schemas for validating ACS files |
| `reference-impl/` | Reference parser and validator in Python and TypeScript |
| `examples/` | Complete `.agents/` examples for real project types |
| `compatibility/` | Migration guides from AGENTS.md, CLAUDE.md, SKILL.md, and MCP |
| `docs/` | Getting started guide, FAQ, tool builder guide, conformance checklist |
| `community/` | ADOPTERS.md, ROADMAP.md |

## Key files

- **Spec entry point:** `spec/v1/README.md`
- **Start here (users):** `docs/getting-started.md`
- **Start here (tool builders):** `docs/for-tool-builders.md`
- **Conformance checklist:** `docs/conformance-checklist.md`
- **Roadmap:** `community/ROADMAP.md`

## How to contribute

- **Bug reports or spec clarifications:** open an issue
- **Compatibility reports:** use `.github/ISSUE_TEMPLATE/compatibility_report.md`
- **Propose new features:** open an issue first (see `GOVERNANCE.md` for process)
- **Add your tool or project:** PR to `community/ADOPTERS.md`

## Do not change without discussion

- `spec/v1/` — any spec change requires an issue first
- `schemas/v1/` — schemas are versioned and breaking changes need an RFC
- `reference-impl/` — implementations must stay in sync with the spec

## Conventions

- All spec files are Markdown
- Schema files are JSON Schema draft-07
- Validator scripts must accept an optional path argument (`sys.argv[1]` / CLI arg)
- Tests live in `tests/python/` and `tests/typescript/`
- CI runs on every push and PR via `.github/workflows/validate.yml`
