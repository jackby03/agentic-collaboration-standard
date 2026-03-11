# agentic-standard

CLI for the [Agentic Collaboration Standard (ACS)](https://acs.jackby03.com) — scaffold and validate `.agents/` folders in any project.

## Install

```bash
pip install agentic-standard
```

## Usage

```bash
# Scaffold a new .agents/ folder interactively
acs init

# Validate all ACS files in the current project
acs validate

# List all ACS files found in the project
acs ls
```

## What is ACS?

ACS defines a unified `.agents/` folder for agent-ready projects. Instead of scattering project context across `CLAUDE.md`, `.cursorrules`, `GEMINI.md`, and a dozen vendor-specific files, write it once — any ACS-compatible agent picks it up.

## Links

- [Website](https://acs.jackby03.com)
- [Specification](https://github.com/jackby03/agentic-collaboration-standard/tree/main/spec/v1)
- [GitHub](https://github.com/jackby03/agentic-collaboration-standard)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=jackby03.acs-vscode)

## License

MIT © [jackby03](https://jackby03.com)
