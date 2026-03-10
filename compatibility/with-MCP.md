# Compatibility: ACS + MCP

ACS and MCP operate at **different layers** and are fully complementary.

## The difference

| | MCP | ACS |
|---|---|---|
| What it is | Runtime protocol | Project configuration format |
| When it runs | During agent execution | At session startup |
| What it provides | Tools and data sources | Context, skills, permissions |
| Requires runtime | Yes | No |

## How they work together

```
Session start:
  ACS loads → context, skills catalog, permissions

During task:
  Agent activates skill → reads SKILL.md
  SKILL.md references an MCP tool → agent calls MCP server
  MCP server returns data → agent continues
```

## Declaring MCP dependencies (v2.0)

In ACS v2.0, the planned `tools/toolset.yaml` will declare which MCP servers a project expects:

```yaml
# Future — v2.0
toolsets:
  database:
    tools:
      - name: postgres-mcp
        type: mcp
        url: "mcp://localhost:5432"
```

For now, document MCP requirements in `context/project.md`.
