# Changelog

All notable changes to this project are documented in this file.
This project follows Semantic Versioning 2.0.0.

## [Unreleased]

### Changed

- Rebuilt the ACS landing page in Next.js under `site/` with the full homepage content migrated from the legacy static site.
- Updated the public domain and canonical URLs to `agentstandard.jackby03.com`.
- Replaced the old hero preview asset with the new README-focused image used across the site and social previews.
- Relicensed the repository from `MIT` to `Apache-2.0` to improve compatibility with foundation-level contribution and legal requirements.
- Updated package manifests and metadata to reflect the new license where applicable.

- Implemented V2 discovery and CLI surface: `compile`, `diff`, and `export` commands added to the `cli` tool to generate vendor artifacts, report pending generated changes, and export layers.
- Extended `acs init` and scaffolding to support V2 layer filenames (`workflow.md`, `hook.md`, `profile.md`, `task.md`, `memory.md`) and added templates for v2 layers.
- Localized parser/validation helpers inside `cli/src/utils/` (e.g. `project.ts`, `validation.ts`) so the CLI compiles cleanly without importing the full `reference-impl` TypeScript sources.
- Fixed TypeScript build issues and made the CLI self-contained; `pnpm build` and `pnpm tsc` now succeed for the CLI after these fixes.
- Removed dogfood test artifacts and generated companion vendor files created during development (temporary `.agents/` dogfood and `CLAUDE.md`, `.cursorrules`, `.windsurfrules`, `GEMINI.md`, `.github/copilot-instructions.md`).

### Added

- Added `NOTICE` and `docs/legal/licensing.md` with relicensing notes and next steps.

## [1.0.0] - 2026-03-11

### Phase 1 — Tooling

#### CLI (`acs`)
- Added `acs init` — interactive scaffold for `.agents/` folders with auto-detection of language/framework from `package.json`, `pyproject.toml`, `Cargo.toml`, and `go.mod`
- Added `acs validate` — validates all ACS files in the current project; exits non-zero on error (CI-friendly)
- Added `acs ls` — lists all discovered layers, skills (with descriptions), commands, and agents
- Published as `agentic-standard` on npm: `npm install -g agentic-standard` / `npx agentic-standard init`
- Published as `agentic-standard` on PyPI: `pip install agentic-standard` / `pipx install agentic-standard`

#### Validator Libraries
- Published `@acs/validator` to npm — TypeScript library wrapping the reference parser and validator; exports `findACSRoot`, `loadProject`, `validateProject`, and related types
- Published `agentic-standard-validator` to PyPI — Python library wrapping the reference parser and validator

#### Editor
- Published VS Code extension `jackby03.acs-vscode` to the VS Code Marketplace — auto-activates when `.agents/main.yaml` is detected; registers JSON schemas for `main.yaml` and `permissions/policy.yaml` via `redhat.vscode-yaml`; adds `ACS: Validate Project` command

#### CI
- Added `publish-npm.yml` — manual-trigger workflow to publish `agentic-standard` CLI or `@acs/validator` to npm
- Added `publish-pypi.yml` — manual-trigger workflow to publish `agentic-standard` or `agentic-standard-validator` to PyPI

---

## [1.0.0-draft] - 2026-03-10

- Initial draft specification
- Defined: `.agents/` layout, `main.yaml` manifest, context, skills, commands, agents, permissions
- Published: compatibility guides, reference implementations, examples
