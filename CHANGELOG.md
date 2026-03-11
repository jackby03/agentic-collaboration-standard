# Changelog

## v1.0.0 *(2026-03-11)*

### Phase 1 — Tooling

#### CLI (`acs`)
- Added `acs init` — interactive scaffold for `.agents/` folders with auto-detection of language/framework from `package.json`, `pyproject.toml`, `Cargo.toml`, and `go.mod`
- Added `acs validate` — validates all ACS files in the current project; exits non-zero on error (CI-friendly)
- Added `acs ls` — lists all discovered layers, skills (with descriptions), commands, and agents
- Published as `acs` on npm: `npm install -g acs` / `npx acs init`
- Published as `acs-cli` on PyPI: `pip install acs-cli` / `pipx install acs-cli`

#### Validator Libraries
- Published `@acs/validator` to npm — TypeScript library wrapping the reference parser and validator; exports `findACSRoot`, `loadProject`, `validateProject`, and related types
- Published `acs-validator` to PyPI — Python library wrapping the reference parser and validator

#### Editor
- Published VS Code extension `jackby03.acs-vscode` to the VS Code Marketplace — auto-activates when `.agents/main.yaml` is detected; registers JSON schemas for `main.yaml` and `permissions/policy.yaml` via `redhat.vscode-yaml`; adds `ACS: Validate Project` command

#### CI
- Added `publish-npm.yml` — manual-trigger workflow to publish `acs` CLI or `@acs/validator` to npm
- Added `publish-pypi.yml` — manual-trigger workflow to publish `acs-cli` or `acs-validator` to PyPI

---

## v1.0.0-draft (2026-03-10)

- Initial draft specification
- Defined: `.agents/` layout, `main.yaml` manifest, context, skills, commands, agents, permissions
- Published: compatibility guides, reference implementations, examples
