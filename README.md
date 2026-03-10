# ACS — Agentic Collaboration Standard

> A unified open format for agent-ready projects. Works across tools, teams, and platforms.

[![License: CC0](https://img.shields.io/badge/License-CC0-blue.svg)](LICENSE)
[![Status: Draft v1.0](https://img.shields.io/badge/Status-Draft%20v1.0-yellow.svg)](spec/v1/)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-green.svg)](CONTRIBUTING.md)

ACS defines how projects describe themselves to AI agents — through a single `.agents/` folder that any compatible agent can read, regardless of which tool, IDE, or platform you use.

## The problem

Every agentic tool invents its own configuration format:
- Claude Code → `CLAUDE.md` + `.claude/`
- Cursor → `.cursorrules`
- GitHub Copilot → its own conventions
- AGENTS.md → instructions only, no structure

Teams working with multiple tools duplicate effort. Knowledge stays trapped in vendor-specific formats.

## The solution

One folder. Any agent.

```
your-project/
└── .agents/
    ├── acs.yaml          # Manifest: what this project uses
    ├── context/          # What agents need to KNOW
    ├── skills/           # What agents can DO
    ├── commands/         # Reusable single-shot tasks
    ├── agents/           # Named subagents for specific roles
    └── permissions/      # What agents are ALLOWED to do
```

## Quick start

```bash
# 1. Create the folder
mkdir -p .agents/context

# 2. Add your manifest
cat > .agents/acs.yaml << 'YAML'
acs_version: "1.0"
project:
  name: my-project
  description: "A brief description of your project"
layers:
  context: true
  skills: false
  commands: false
  agents: false
  permissions: false
YAML

# 3. Add your project context
cat > .agents/context/project.md << 'MD'
# Project Context
## Stack
- ...
## Conventions
- ...
MD
```

## Documentation

- [Why ACS?](docs/why-acs.md)
- [Getting Started](docs/getting-started.md)
- [For non-developers](docs/for-non-devs.md)
- [For tool builders](docs/for-tool-builders.md)
- [Full specification →](spec/v1/)

## Compatibility

ACS is designed to coexist with existing standards:
- Works alongside `AGENTS.md`
- Compatible with `SKILL.md` (agentskills.io)
- Generates `CLAUDE.md` content on demand
- Complements MCP (different layer)

See [compatibility guides →](compatibility/)

## Status

ACS is in **draft v1.0**. We're gathering feedback before stabilizing the format.

[Roadmap](community/ROADMAP.md) · [Contributing](CONTRIBUTING.md) · [Adopters](community/ADOPTERS.md)
