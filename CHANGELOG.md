# Changelog

## Unreleased *(2026-05-18)*

### Administrative

- Relicensed repository from `MIT` to `Apache-2.0` to improve compatibility with foundation-level contribution and legal requirements.
- Added `NOTICE` file and `docs/legal/licensing.md` with relicensing notes and next steps.
- Updated package manifests and metadata to reflect new license where applicable.

Files changed (non-exhaustive): `LICENSE`, `NOTICE`, `docs/legal/licensing.md`, `cli/package.json`, `reference-impl/typescript/package.json`, `editor/vscode/package.json`, `reference-impl/python/pyproject.toml`, `packages/python/pyproject.toml`, `editor/vscode/LICENSE`, `editor/vscode/README.md`, `docs/proposals/aaif-proposal-draft.md`.

Notes:
- Repository contributor audit indicates a single primary human contributor; no external contributor consent required for relicensing.
- Next steps: add `MAINTAINERS.md`, adopt DCO for future contributions, and publish a relicensing notice in the repo and release notes.


## v1.0.0 *(2026-03-11)*

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

## v1.0.0-draft (2026-03-10)

- Initial draft specification
- Defined: `.agents/` layout, `main.yaml` manifest, context, skills, commands, agents, permissions
- Published: compatibility guides, reference implementations, examples
