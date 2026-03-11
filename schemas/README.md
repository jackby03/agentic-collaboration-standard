# ACS JSON Schemas

These schemas can be used to validate ACS files in editors and CI pipelines.

## Usage

### VS Code
Add to `.vscode/settings.json`:
```json
{
  "yaml.schemas": {
    "https://raw.githubusercontent.com/jackby03/agentic-collaboration-standard/main/schemas/v1/manifest.schema.json": ".agents/main.yaml",
    "https://raw.githubusercontent.com/jackby03/agentic-collaboration-standard/main/schemas/v1/permissions.schema.json": ".agents/permissions/policy.yaml"
  }
}
```

### CLI validation (v2.0)
```bash
acs validate
```
