# ACS Roadmap

> Last updated: 2026-03-11
> Current version: **v1.0** *(pending release evaluation)*
> Maintainer: [@jackby03](https://github.com/jackby03)

This roadmap covers everything from immediate stabilization work to long-term governance goals. Items are grouped by phase, ordered by priority within each phase, and tagged with effort and impact estimates.

---

## Phase 0 — Stabilization `[Now — 2 weeks]`

**Goal:** Harden the v1.0 release before pursuing adoption. Fix known bugs, fill missing documentation gaps, and establish baseline quality.

### Bugs

- [x] **Fix CI validator bug** — `validate.yml` now passes each example directory as an argument; Python validator accepts `sys.argv[1]`; TypeScript Jest `roots` fixed so tests are discovered outside `<rootDir>`
- [x] **Fix spec README index** — `spec/v1/README.md` table updated; Quick Reference tree added

### Documentation

- [x] **Add `AGENTS.md` to repo root** — added; ACS repo now dogfoods the standard with its own `.agents/` folder
- [x] **Add `for-non-devs.md`** — comprehensive plain-language guide with examples, layers table, and real YAML samples
- [x] **Expand FAQ** — expanded from 7 to 24 questions across 5 categories (General, Setup, Skills & Commands, Permissions, Tool Builders)
- [x] **Spec conformance checklist** — `docs/conformance-checklist.md` created with full B1–B6 and R1–R4 checklist for tool builders

### Tests

- [x] **Add automated tests for Python validator** — 20-test pytest suite in `tests/python/test_validator.py` covering manifest, skill, and project validation
- [x] **Add automated tests for TypeScript validator** — equivalent Jest suite in `tests/typescript/validator.test.ts`
- [x] **Wire tests into CI** — `validate.yml` runs `pytest tests/python/ -v` and `npm test` on every push and PR

### Website

- [x] **Verify GitHub Pages deployment** — confirmed live at `https://acs.jackby03.com`
- [x] **Add canonical URL and Open Graph meta tags** — canonical, `og:image`, `og:image:width/height`, `twitter:image` all set; hero image served at `https://acs.jackby03.com/hero.png`
- [x] **Fix ticker duplication** — ticker expanded from 10 to 20 diverse items

---

## Phase 1 — Tooling `[2 – 6 weeks]`

**Goal:** Give developers and tool builders the minimum tooling to adopt ACS without friction. A spec without tooling stalls adoption.

### CLI (`acs`)

The CLI is the single highest-leverage investment in Phase 1. It removes the main adoption barrier: manually reading the spec and creating files by hand.

- [x] **`acs init`** — interactive scaffold that generates `.agents/main.yaml` + `context/project.md`; detects framework/language from `package.json`, `pyproject.toml`, `Cargo.toml`, etc.
- [x] **`acs validate`** — validates all ACS files in the current project against the JSON schemas; exits non-zero on error (CI-friendly)
- [x] **`acs ls`** — lists all active layers, skills, commands, and agents discovered in `.agents/`
- [x] **Publish to npm as `acs`** — single install: `npm install -g acs` or `npx acs init`
- [x] **Publish to PyPI as `acs-cli`** — `pip install acs-cli` or `pipx install acs-cli`

### Package Libraries

- [x] **Publish `@acs/validator` to npm** — wraps the TypeScript reference implementation; usable as a library in CI or editor plugins
- [x] **Publish `acs-validator` to PyPI** — wraps the Python reference implementation; importable as `from acs_validator import validate_project`
- [x] **Semantic versioning and changelog** — establish semver for both packages from `1.0.0`

### Editor Tooling

- [x] **VS Code extension (MVP)** — registers the JSON schemas for `main.yaml` and `policy.yaml` automatically when a `.agents/` folder is detected; provides YAML autocomplete and inline validation without any manual settings.json edits
- [ ] **JetBrains plugin stub** — minimal plugin that registers schemas for IntelliJ-family IDEs; enough to get YAML validation in Junie
- [ ] **`.editorconfig` / `.vscode/settings.json` snippets** — provide copy-paste snippets in docs for teams that don't want to install an extension

---

## Phase 2 — Adoption `[6 – 12 weeks]`

**Goal:** Get at least one major AI coding tool to declare ACS compatibility. One real adopter unlocks community momentum.

### Tool Integrations

- [ ] **Claude Code integration** — open a formal issue/discussion on the Claude Code repository proposing native `.agents/` support; provide the reference implementation and conformance checklist as supporting material
- [ ] **Cursor integration** — engage with Cursor's community forum to propose `.agents/` as a complement to `.cursor/rules/`; the `compatible_with: cursor` field in `main.yaml` already signals intent
- [ ] **Windsurf / Codeium** — similar outreach; `.windsurfrules` is already listed as a fragmentation pain point on the ACS landing page
- [ ] **Zed integration** — Zed is rapidly adding agentic features; engage early while the architecture is still malleable
- [ ] **Roo Code integration** — Roo Code already has a custom rules format (`.clinerules`); propose ACS as a portable alternative
- [ ] **agentskills.io partnership** — ACS already declares SKILL.md compatibility; formalize a cross-link, shared documentation, and mutual referencing with agentskills.io

### Community

- [ ] **Enable GitHub Discussions** — create discussion categories: `Spec Proposals`, `Compatibility Reports`, `Show & Tell`, `Q&A`
- [ ] **First ADOPTERS.md entry** — add the ACS repo itself as the first entry (dogfooding); then reach out to 3–5 early projects willing to be listed
- [ ] **Launch post** — publish on dev.to, HN (Show HN), and LinkedIn; the landing page already has a strong problem/solution narrative to draw from
- [ ] **ACS badge** — create a Shields.io-compatible badge (`ACS-compatible v1.0`) that adopters can add to their README
- [ ] **Office hours / async Q&A** — monthly async thread (GitHub Discussion or Discord) where the maintainer answers questions from tool builders and early users

### Ecosystem Examples

- [ ] **More example projects** — add 2–3 more `.agents/` examples: a Python service, a data science project, and a non-developer content/ops use case
- [ ] **Example: monorepo setup** — dedicated example showing root + package-level `.agents/` with correct precedence behavior
- [ ] **Starter templates** — GitHub template repositories that come pre-configured with `.agents/`

---

## Phase 3 — Spec v1.1 `[3 – 5 months]`

**Goal:** Address gaps discovered through early adoption. All changes are non-breaking and backward-compatible with v1.0.

### Permissions

- [ ] **Execution policy** — add `execute` rules to `policy.yaml` (which scripts agents are allowed to run); out of scope for v1.0 but critical for enterprise security posture
- [ ] **Role-based permissions** — allow permissions to vary by named agent role (e.g., `tester` agent can write to `tests/**` but `docs-writer` cannot)
- [ ] **Audit trail** — specify how compliant tools should log permission decisions; enables compliance reporting

### Loading & Discovery

- [ ] **User-level skills spec** — `02-layout.md` mentions `~/.agents/` but doesn't specify it in detail; write the full loading order and precedence rules for user-level vs project-level vs global skills
- [ ] **Monorepo precedence clarification** — document exact behavior when nested `.agents/` folders have conflicting skill names, permissions, or context files
- [ ] **Trust gating detail** — behavior R2 (trust gating for untrusted repos) is mentioned but underspecified; define what "untrusted" means and what the required user prompt must communicate

### Skill Format

- [ ] **`input` frontmatter for skills** — commands already support `input:` fields; standardize this for skills too so agents can prompt for required parameters
- [ ] **`output` frontmatter** — declare the expected output format of a skill (file path, console, inline reply) to enable tool-level automation
- [ ] **Skill dependencies** — allow skills to reference other skills via a `requires:` frontmatter field
- [ ] **Versioning for skills** — allow `version:` in skill frontmatter so projects can pin to specific skill versions

### Manifest

- [ ] **`maintainers` field** — list project maintainers in `main.yaml` for enterprise attribution
- [ ] **`extends` field** — allow a project manifest to extend a base manifest (e.g., from a shared org-level `.agents/`)
- [ ] **`tags` field** — enable skill/command discovery registries to index projects by domain

---

## Phase 4 — Spec v2.0 `[6+ months]`

**Goal:** Add the structured orchestration layer that makes ACS viable for complex, multi-agent workflows. All items are documented in `spec/v1/FUTURE.md`.

### Workflows

Multi-step, deterministic processes with explicit step sequencing.

- [ ] **`workflows/` layer spec** — define the file format, frontmatter schema (`trigger`, `steps`), and loading behavior
- [ ] **Built-in triggers** — `manual`, `on_pr`, `on_push`, `on_file_change`
- [ ] **Step references** — allow workflow steps to call skills, commands, or other agents by name
- [ ] **Error handling in workflows** — define `on_error` behavior: stop, continue, fallback to named step
- [ ] **Workflow schema** — JSON schema for `workflow.md` frontmatter

### Hooks

Lifecycle triggers that fire before or after agent actions.

- [ ] **`hooks/` layer spec** — define `pre-commit.md`, `post-edit.md`, and other lifecycle hook files
- [ ] **Hook trigger taxonomy** — enumerate all valid hook points: `pre-read`, `post-write`, `pre-execute`, `post-execute`, `on-error`
- [ ] **Hook failure behavior** — define whether a failing hook blocks the action or logs a warning

### Profiles

Named capability sets that configure agent behavior and permissions together.

- [ ] **`profiles/` layer spec** — define the file format for `developer.md`, `reviewer.md`, `junior.md`, etc.
- [ ] **Profile activation** — define how a user or agent selects an active profile
- [ ] **Profile inheritance** — allow profiles to extend each other (e.g., `senior` extends `developer`)

### Toolsets

Declarations of which MCP servers and tools the project expects.

- [ ] **`tools/toolset.yaml` spec** — declare required MCP servers, tool names, and minimum versions
- [ ] **Optional vs required tools** — distinguish between tools the project requires and those it recommends
- [ ] **Tool availability checking** — specify how a compliant agent should warn or fail when declared tools are unavailable

### CLI v2

- [ ] **`acs compile`** — generate `CLAUDE.md`, `.cursorrules`, `.windsurfrules`, `GEMINI.md`, and other vendor-specific files from the `.agents/` source of truth; enables gradual migration without breaking existing tools
- [ ] **`acs diff`** — show what would change between two ACS versions or configs
- [ ] **`acs export`** — export a single layer (e.g., just skills) to a standalone directory
- [ ] **Plugin system for `acs compile`** — allow community plugins to add new compile targets

---

## Phase 5 — Governance & Sustainability `[12+ months]`

**Goal:** Transition ACS from a solo-maintained project to a community-governed open standard with long-term institutional backing.

### Governance Evolution

- [ ] **Core maintainers program** — recruit 3–5 co-maintainers from different organizations to prevent bus-factor risk
- [ ] **RFC process** — formalize the Request for Comments process for breaking changes; model after TC39 or OpenAPI stages
- [ ] **Steering committee** — form a steering committee with representation from tool builders, enterprise users, and independent contributors
- [ ] **Move to neutral foundation** — explore joining a neutral open-source foundation (Linux Foundation, Agentic AI Foundation, or similar) as adoption warrants it

### Registry & Discovery

- [ ] **Public skills registry** — a searchable index of community-published ACS skills (similar to npm but for SKILL.md files)
- [ ] **Compatibility registry** — official list of ACS-compatible tools with conformance level (B1–B6 implemented)
- [ ] **Project showcase** — curated gallery of open-source projects using ACS effectively

### Certification

- [ ] **ACS Conformance Test Suite** — automated test suite that any tool can run to verify B1–B6 compliance
- [ ] **Conformance badge program** — tools that pass the test suite receive an official `ACS-compatible (v1.x)` badge
- [ ] **Enterprise compliance documentation** — security and audit documentation for organizations requiring formal compliance records

---

## Effort & Impact Matrix

| Item | Effort | Impact | Phase |
|---|---|---|---|
| Fix CI bug | XS | Medium | 0 |
| Add tests | S | High | 0 |
| Dogfood: add `.agents/` to this repo | XS | High | 0 |
| `acs init` + `acs validate` CLI | M | Very High | 1 |
| Publish npm + PyPI packages | S | High | 1 |
| VS Code extension MVP | S | High | 1 |
| Claude Code integration outreach | S | Very High | 2 |
| ACS badge | XS | Medium | 2 |
| Launch post (dev.to + HN) | S | High | 2 |
| Execution policy in permissions | M | High | 3 |
| `acs compile` (vendor file generation) | L | Very High | 4 |
| Workflows layer | L | High | 4 |
| Public skills registry | XL | Very High | 5 |
| Neutral foundation | XL | Very High | 5 |

> **Effort:** XS < 1 day · S 1–3 days · M 1–2 weeks · L 2–6 weeks · XL 2+ months

---

## Immediate Next Steps (this week)

1. Fix the CI validator bug in `.github/workflows/validate.yml`
2. Add `.agents/` to this repo (dogfood the standard)
3. Add `spec/v1/README.md` index fix (02 and 03 missing from table)
4. Start `acs init` CLI scaffolding — this is the Phase 1 unlock

---

*To propose changes to this roadmap, open an issue with the label `roadmap`.*
