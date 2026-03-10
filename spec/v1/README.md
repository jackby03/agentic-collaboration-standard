# ACS Specification v1.0

The complete specification for the Agentic Collaboration Standard.

## Sections

| # | Document | Description |
|---|---|---|
| 1 | [Overview](01-overview.md) | Goals, principles, and design philosophy |
| 2 | [Layout](02-layout.md) | The `.agents/` folder structure |
| 3 | [Manifest](03-manifest.md) | `acs.yaml` format and fields |
| 4 | [Context](04-context.md) | `context/` files |
| 5 | [Skills](05-skills.md) | `skills/` and `SKILL.md` format |
| 6 | [Commands](06-commands.md) | `commands/` files |
| 7 | [Agents](07-agents.md) | `agents/` subagent definitions |
| 8 | [Permissions](08-permissions.md) | `permissions/policy.yaml` |
| 9 | [Progressive Disclosure](09-progressive-disclosure.md) | How agents load ACS content |
| 10 | [Behavior](10-behavior.md) | How compliant agents must behave |
| — | [Future](FUTURE.md) | Planned additions (v2.0+) |

## Conformance

A tool is **ACS-compatible** if it implements the behavior defined in [10-behavior.md](10-behavior.md).
