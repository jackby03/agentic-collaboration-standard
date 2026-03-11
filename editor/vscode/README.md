# Agentic Collaboration Standard — VS Code Extension

YAML autocomplete and inline validation for `.agents/` folders ([ACS v1.0](https://acs.jackby03.com)).

## Features

- **Schema validation** — instant inline errors for `main.yaml` and `permissions/policy.yaml`
- **YAML autocomplete** — field suggestions, required keys, and allowed values as you type
- **ACS: Validate Project** command — run from the Command Palette (`Ctrl+Shift+P`) to validate all ACS files in your workspace
- **Auto-activates** — activates automatically when a `.agents/main.yaml` is detected in your workspace

## Requirements

This extension depends on [YAML by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) (`redhat.vscode-yaml`), which is installed automatically.

## Getting Started

1. Install the extension
2. Open any project with a `.agents/` folder (or scaffold one with `acs init`)
3. Open `.agents/main.yaml` — autocomplete and validation activate immediately

### Install the CLI

```bash
# Node.js
npm install -g agentic-standard

# Python
pip install agentic-standard
```

Scaffold a new `.agents/` folder:

```bash
acs init
```

Validate your project:

```bash
acs validate
```

## Validated Files

| File | Schema |
|------|--------|
| `.agents/main.yaml` | [manifest.schema.json](https://github.com/jackby03/agentic-collaboration-standard/blob/main/schemas/v1/manifest.schema.json) |
| `.agents/permissions/policy.yaml` | [permissions.schema.json](https://github.com/jackby03/agentic-collaboration-standard/blob/main/schemas/v1/permissions.schema.json) |

## Links

- [ACS Website](https://acs.jackby03.com)
- [Specification](https://github.com/jackby03/agentic-collaboration-standard/tree/main/spec/v1)
- [GitHub Repository](https://github.com/jackby03/agentic-collaboration-standard)
- [Examples](https://github.com/jackby03/agentic-collaboration-standard/tree/main/examples)

## License

MIT © [jackby03](https://jackby03.com)
