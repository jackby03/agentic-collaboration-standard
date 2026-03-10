# 3. Manifest — `acs.yaml`

The manifest is the entry point for ACS. It declares which layers are active and provides project metadata.

## Required fields

```yaml
acs_version: "1.0"
project:
  name: "my-project"
  description: "A short description of what this project does"
```

## Full schema

```yaml
acs_version: "1.0"          # Required. Must be "1.0" for v1 compliance

project:
  name: "my-project"         # Required. Lowercase, hyphens allowed
  description: "..."         # Required. Max 512 characters
  language: typescript       # Optional. Primary programming language
  framework: nextjs          # Optional. Primary framework

layers:
  context: true              # Default: true if context/ folder exists
  skills: true               # Default: true if skills/ folder exists
  commands: true             # Default: true if commands/ folder exists
  agents: true               # Default: true if agents/ folder exists
  permissions: true          # Default: true if permissions/ folder exists

compatible_with:             # Optional. Hints for agent tools
  - claude-code
  - cursor
  - any                      # "any" = no tool-specific behavior required
```

## Layer auto-detection

If `layers` is omitted, agents auto-detect active layers by checking if the corresponding folder exists and contains files.
