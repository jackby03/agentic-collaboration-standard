# 10. Behavior Specification

This section defines how a **compliant ACS client** must behave. Implementing these behaviors makes a tool ACS-compatible.

## Required behaviors

### B1 — Discovery
The agent MUST scan for `.agents/acs.yaml` at session start to determine if the project is ACS-enabled.

### B2 — Manifest loading
If `acs.yaml` is found, the agent MUST parse it and determine which layers are active.

### B3 — Permissions enforcement
If `permissions/policy.yaml` exists, the agent MUST apply deny rules before any file read or write operation.

### B4 — Context loading
If the `context` layer is active, the agent MUST load `context/project.md` into the session context at startup.

### B5 — Skill catalog disclosure
If the `skills` layer is active, the agent MUST surface skill names and descriptions to the model so it can decide when to activate them.

### B6 — Progressive loading
The agent MUST NOT load full skill bodies at startup. Full content is loaded only when a skill is activated.

## Recommended behaviors

### R1 — Graceful degradation
If any layer folder is missing, the agent should continue without error, treating that layer as inactive.

### R2 — Trust gating
For project-level skills from untrusted repositories, the agent should prompt the user before loading skill content.

### R3 — Collision handling
If skills with the same name exist at multiple levels (project vs user), project-level takes precedence.

### R4 — Protected context
Skill and context content loaded into the session MUST be protected from context compaction/pruning.

## Compatibility declaration

Tools implementing ACS can declare compatibility in their documentation:

```
ACS-compatible (v1.0) — implements B1–B6
```
