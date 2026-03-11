# FAQ

## General

**Is ACS a replacement for AGENTS.md?**
No. They're complementary. Keep your `AGENTS.md` for tools that only support it. Add `.agents/` for richer ACS configuration. Both can coexist in the same project.

**Does ACS require a specific AI model or tool?**
No. ACS is plain Markdown and YAML. Any agent that can read files can implement it. See [for-tool-builders.md](for-tool-builders.md) for the conformance requirements.

**What if I only want to use one layer?**
That's fine. ACS is additive. Start with just `context/`, add more as needed. The only required file is `main.yaml`.

**Can I use agentskills.io skills in ACS?**
Yes. ACS skills use the exact same SKILL.md format. Just put them in `.agents/skills/` with no changes needed.

**Is ACS the same as MCP?**
No. MCP is a runtime protocol for tools and APIs. ACS is a project configuration format stored in files. They operate at different layers and complement each other — see [compatibility/with-MCP.md](../compatibility/with-MCP.md).

**Who maintains ACS?**
Currently [@jackby03](https://github.com/jackby03). The goal is to move to neutral governance as adoption grows. See [GOVERNANCE.md](../GOVERNANCE.md).

---

## Setup

**Where exactly does the `.agents/` folder go?**
At the root of your project — the same level as your `README.md`, `package.json`, or `.git/` folder.

**What if my tool doesn't find the `.agents/` folder?**
Your tool may not be ACS-compatible yet. Check [community/ADOPTERS.md](../community/ADOPTERS.md) for the list of compatible tools, or open a compatibility issue to track it.

**How do I set up ACS in a monorepo?**
Place a root `.agents/` for shared configuration. Each package can have its own `.agents/` that overrides the root for that package. The nearest `.agents/` to the working directory takes precedence. See [spec/v1/02-layout.md](../spec/v1/02-layout.md) for the full rules.

**Can I commit `.agents/` to git?**
Yes, and you should. The `.agents/` folder is designed to be version-controlled alongside your code. This keeps agent configuration auditable and consistent for everyone on the team.

---

## Skills & Commands

**What's the difference between a skill and a command?**
A **skill** describes *how* to do something repeatedly — it's a capability the agent uses when the task matches. A **command** is a *specific, named task* invoked explicitly (like a slash command or macro). Skills are matched automatically; commands are usually invoked by name.

**Can a skill call another skill?**
Not in v1.0. Skill composition is planned for v1.1 via a `requires:` frontmatter field.

**Can I share skills across projects?**
Not natively in v1.0. User-level skills at `~/.agents/skills/` are mentioned in the spec but not fully specified yet. A public skills registry is on the roadmap for v2.0+.

---

## Permissions

**What happens if a file isn't covered by any rule in `policy.yaml`?**
The default is **deny**. If no rule matches, access is blocked. You must explicitly allow paths you want the agent to access.

**Does ACS support execution permissions (running scripts)?**
Not in v1.0. The `policy.yaml` supports `read` and `write` rules only. Execution policy is planned for v1.1.

**Can different agents have different permissions?**
Not in v1.0. Permissions apply project-wide. Role-based permissions per agent are on the roadmap for v1.1.

---

## Tool Builders

**How do I declare my tool as ACS-compatible?**
Implement behaviors B1–B6 from [spec/v1/10-behavior.md](../spec/v1/10-behavior.md), then add `ACS-compatible (v1.0)` to your documentation. Use the self-certification checklist in [docs/conformance-checklist.md](conformance-checklist.md). Optionally, open a PR to add your tool to [community/ADOPTERS.md](../community/ADOPTERS.md).

**Do I need to implement every behavior to be compatible?**
B1–B6 are required for compatibility. R1–R4 are recommended. A tool that implements only some required behaviors should not claim full ACS compatibility.

---

## Contributing

**How do I contribute?**
See [CONTRIBUTING.md](../CONTRIBUTING.md). For spec changes, open an issue first. For examples, compatibility guides, or documentation, PRs are welcome directly.

**How do I propose a new feature?**
Open a GitHub issue describing the use case. New fields or file types require a 2-week comment period before a decision. Breaking changes require an RFC and 30-day comment period. See [GOVERNANCE.md](../GOVERNANCE.md).
