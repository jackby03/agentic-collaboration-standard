# agentic-standard

CLI for the [Agentic Collaboration Standard (ACS)](https://acs.jackby03.com) — a unified open format for agent-ready projects.

## Install

```bash
npm install -g agentic-standard
```

## Usage

```bash
# Scaffold a new .agents/ folder
acs init

# Validate your project
acs validate

# List ACS files in your project
acs ls
```

## What is ACS?

ACS defines a unified `.agents/` folder so you write your project context, skills, and permissions once — and any ACS-compatible agent picks it up automatically. No more scattering context across `CLAUDE.md`, `.cursorrules`, `GEMINI.md`, and a dozen vendor-specific files.

```
your-project/
├── AGENTS.md
└── .agents/
    ├── main.yaml          # manifest
    ├── context/
    │   └── project.md
    ├── skills/
    │   └── create-component/
    │       └── SKILL.md
    ├── commands/
    │   └── explain-error.md
    ├── agents/
    │   └── reviewer.md
    └── permissions/
        └── policy.yaml
```

## Links

- [Website](https://acs.jackby03.com)
- [Specification](https://github.com/jackby03/agentic-collaboration-standard/tree/main/spec/v1)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=jackby03.acs-vscode)
- [GitHub](https://github.com/jackby03/agentic-collaboration-standard)

## License

MIT © [jackby03](https://jackby03.com)
