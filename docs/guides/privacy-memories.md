# Privacy Guidelines for `memories/`

This document defines a conservative starting point for memory-like artifacts in interoperable `.agents/` layouts.

`memories/` is still a prototype area, not normative ACS v1 behavior. That makes privacy discipline even more important: experimental persistence should default to caution, not convenience.

## Default posture

- Memories are opt-in.
- Sensitive content should not be stored unless there is a clear project need.
- Export should be restricted unless explicitly allowed.
- Validation should catch obvious metadata mistakes before memory artifacts are shared or bundled.

## Recommended frontmatter fields

Prototype memory files should declare:

- `id`
- `description`
- `sensitivity`
- `opt_in`
- `export`
- `retention`

Example:

```markdown
---
id: architecture-decisions
description: Persistent notes about notable architecture choices.
sensitivity: internal
opt_in: true
export: masked
retention: reviewed
---
```

## Sensitivity levels

Use the narrowest reasonable classification:

- `public`: safe to publish as-is
- `internal`: intended for project contributors, but not for broad distribution
- `confidential`: may contain business-sensitive or customer-adjacent information
- `restricted`: should be treated as highly sensitive and generally excluded from sharing or bundling

If there is uncertainty, classify upward rather than downward.

## Export policy

Prototype tooling should interpret `export` conservatively:

- `allowed`: memory may be exported in full
- `masked`: memory may be exported only after redaction or field-level masking
- `blocked`: memory must be excluded from export, compilation, and bundle output

Projects should avoid defaulting to `allowed` unless the memory is clearly safe.

## What should not go into memory files

Avoid storing:

- secrets, API keys, tokens, or credentials;
- raw customer data or personal data;
- copied issue tracker dumps with unreviewed sensitive text;
- private legal or HR information;
- ephemeral notes that do not need persistence.

If the content would be risky to paste into a public issue, it probably does not belong in a portable memory artifact.

## Minimum validation expectations

Even lightweight tooling should check:

- frontmatter exists and parses cleanly;
- `opt_in` is a boolean;
- `sensitivity` uses an allowed value;
- `export` uses an allowed value;
- required identity and description fields are present.

The current prototype validator covers the metadata-level checks above. It does not inspect body text for sensitive content.

## Suggested operational checks

Teams experimenting with memories should add at least one of the following:

- review memory files in pull requests;
- exclude restricted memories from bundles or generated outputs;
- require manual approval before syncing memories across repositories;
- add repository-specific deny rules if memory files should never be edited automatically.

## Relationship to future ACS work

Before `memories/` becomes a stable ACS layer, the spec should define:

- retention semantics;
- masking expectations;
- export behavior across tools;
- merge and override behavior;
- how permissions interact with persistent memory.

Until then, treat memory support as an interoperable experiment with safety rails.
