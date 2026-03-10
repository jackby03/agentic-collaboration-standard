# ACS for Tool Builders

If you're building an AI agent, IDE, or CLI tool, adding ACS support makes your tool compatible with any project that uses ACS.

## What to implement

The full behavioral specification is in [spec/v1/10-behavior.md](../spec/v1/10-behavior.md).

**Minimum viable implementation (required):**
- Scan for `.agents/acs.yaml` at session start
- Parse the manifest to determine active layers
- Load `context/project.md` into session context
- Enforce `permissions/policy.yaml` rules on file operations
- Surface skill and command names/descriptions (catalog) to the model

**Recommended:**
- Implement progressive disclosure (Tier 1/2/3 loading)
- Protect context from compaction
- Handle monorepo nested `.agents/` with correct precedence

## Declaring compatibility

Once implemented, declare compatibility in your docs:

```
ACS-compatible (v1.0)
```

And optionally open a PR to add yourself to [community/ADOPTERS.md](../community/ADOPTERS.md).

## JSON Schemas

Use the schemas in [schemas/v1/](../schemas/v1/) to validate files in your tool's linting or import logic.

## Reference implementations

See [reference-impl/](../reference-impl/) for parser and validator examples in Python and TypeScript.
