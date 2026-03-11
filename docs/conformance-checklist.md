# ACS Conformance Checklist

Use this checklist to self-certify that your tool implements ACS v1.0 correctly. Required behaviors (B1–B6) must all be implemented to declare compatibility. Recommended behaviors (R1–R4) improve quality and user trust.

Once complete, declare compatibility in your documentation:

```
ACS-compatible (v1.0) — implements B1–B6
```

And optionally open a PR to add your tool to [community/ADOPTERS.md](../community/ADOPTERS.md).

---

## Required Behaviors

### B1 — Discovery

> The agent MUST scan for `.agents/main.yaml` at session start.

- [ ] On session start, the tool checks for `.agents/main.yaml` in the current working directory
- [ ] In monorepos, the tool checks the nearest `.agents/main.yaml` walking up from the working directory
- [ ] If no `main.yaml` is found, the tool continues without error (ACS is simply inactive)

### B2 — Manifest loading

> If `main.yaml` is found, the agent MUST parse it and determine which layers are active.

- [ ] The tool parses `version`, `project.name`, `project.description` from the manifest
- [ ] The tool reads the `layers:` block to determine active layers
- [ ] If `layers:` is absent, the tool auto-detects active layers by checking whether each folder exists and contains files
- [ ] An unrecognized `version` value is flagged or handled gracefully

### B3 — Permissions enforcement

> If `permissions/policy.yaml` exists, the agent MUST apply deny rules before any file read or write operation.

- [ ] The tool loads `permissions/policy.yaml` at session start if the `permissions` layer is active
- [ ] Deny rules are evaluated before allow rules for every file operation
- [ ] Paths matching a `deny.read` rule are not read by the agent
- [ ] Paths matching a `deny.write` rule are not written by the agent
- [ ] If no rule matches a path, access defaults to **deny**
- [ ] Glob patterns (`*`, `**`, `*.ext`) are supported

### B4 — Context loading

> If the `context` layer is active, the agent MUST load `context/project.md` into the session context at startup.

- [ ] `context/project.md` is loaded into the session context before the first user interaction
- [ ] Additional files in `context/` (e.g., `domain.md`) are available for on-demand loading
- [ ] If `context/project.md` does not exist but the layer is declared active, the tool handles this gracefully

### B5 — Skill catalog disclosure

> If the `skills` layer is active, the agent MUST surface skill names and descriptions to the model.

- [ ] For every `skills/*/SKILL.md` found, the tool surfaces the skill's `name` and `description` frontmatter fields to the model
- [ ] The model can use this catalog to decide when to activate a skill
- [ ] Skill names and descriptions are available from session start (Tier 1)

### B6 — Progressive loading

> The agent MUST NOT load full skill bodies at startup.

- [ ] Full `SKILL.md` body is loaded only when a skill is activated (Tier 2), not at session start
- [ ] Command file bodies are loaded only when a command is invoked
- [ ] Agent definition bodies are loaded only when an agent is explicitly called
- [ ] Files in `skills/*/references/`, `skills/*/scripts/`, `skills/*/assets/` are loaded only when referenced (Tier 3)

---

## Recommended Behaviors

### R1 — Graceful degradation

- [ ] If any declared layer folder is missing, the tool continues without error and treats that layer as inactive
- [ ] Malformed files (bad YAML, missing frontmatter) produce a warning rather than a crash

### R2 — Trust gating

- [ ] For skills loaded from untrusted or third-party repositories, the tool prompts the user before loading skill content
- [ ] The prompt clearly identifies the skill name, source, and what it will do

### R3 — Collision handling

- [ ] If skills with the same name exist at both user-level (`~/.agents/skills/`) and project-level (`.agents/skills/`), project-level takes precedence
- [ ] Collisions are logged or surfaced to the user

### R4 — Protected context

- [ ] Skill and context content loaded into the session is protected from context compaction or pruning
- [ ] The tool ensures ACS-loaded content remains in the model's context window for the duration of the session

---

## Testing your implementation

Use the reference validator to verify example projects:

```bash
# Python
python reference-impl/python/acs_validator.py ./your-test-project

# TypeScript (after npm install in reference-impl/typescript/)
npx ts-node reference-impl/typescript/validator.ts ./your-test-project
```

A conformant tool should produce correct results for all projects in the `examples/` directory.

---

## Declaring compatibility

After completing the checklist, add this badge text to your README:

```
ACS-compatible (v1.0) — implements B1–B6
```

Or use the short form:

```
ACS v1.0
```

To be listed in the official registry, open a PR to [community/ADOPTERS.md](../community/ADOPTERS.md).
