# FAQ

**Is ACS a replacement for AGENTS.md?**
No. They're complementary. Keep your `AGENTS.md` for tools that only support it. Add `.agents/` for richer ACS configuration.

**Does ACS require a specific AI model or tool?**
No. ACS is plain Markdown and YAML. Any agent that can read files can implement it.

**What if I only want to use one layer?**
That's fine. ACS is additive. Start with just `context/`, add more as needed.

**Can I use agentskills.io skills in ACS?**
Yes. ACS skills use the exact same SKILL.md format. Just put them in `.agents/skills/`.

**Is ACS the same as MCP?**
No. MCP is a runtime protocol for tools. ACS is a project configuration format. They work at different layers and complement each other.

**How do I contribute?**
See [CONTRIBUTING.md](../CONTRIBUTING.md).

**Who maintains ACS?**
Currently [@jackby03](https://github.com/jackby03). The goal is to move to neutral governance as adoption grows.
