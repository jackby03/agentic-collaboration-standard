# Getting Started with ACS

## Step 1 — Create the folder

```bash
mkdir -p .agents
```

## Step 2 — Add the manifest

Create `.agents/main.yaml`:

```yaml
version: "1.0"
project:
  name: "your-project-name"
  description: "What your project does in one sentence"

layers:
  context: true
```

## Step 3 — Add project context

Create `.agents/context/project.md`:

```markdown
# Project Context

## Stack
- Framework: ...
- Database: ...

## Conventions
- ...

## Do not change without explicit instruction
- ...
```

## Step 4 — Use it

Any ACS-compatible agent will now automatically load your context at session start.

## Next steps

- Add [skills](../spec/v1/05-skills.md) for reusable capabilities
- Add [commands](../spec/v1/06-commands.md) for quick tasks
- Add [agents](../spec/v1/07-agents.md) for specialized roles
- Add [permissions](../spec/v1/08-permissions.md) to protect sensitive files

## Example projects

Browse complete examples in [examples/](../examples/).
