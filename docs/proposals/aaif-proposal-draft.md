# AAIF Proposal Draft: ACS Interoperability with Frontmatter-Based `.agents/`

This draft is the repository's concrete response to community interest in a more formal standards path, including the request raised in [issue #9](https://github.com/jackby03/agentic-collaboration-standard/issues/9) to explore AAIF / Linux Foundation-style standardization and broader `.agents` adoption.

## Summary

This draft proposes an interoperability track for the Agentic Collaboration Standard (ACS) that can work with frontmatter-based `.agents/` layouts emerging in adjacent projects.

The proposal is intentionally collaborative in spirit:

- ACS remains vendor-neutral and portable.
- ACS stays compatible with existing ecosystem efforts where possible.
- ACS also stays open to adopting the strongest ideas from those efforts when they improve developer experience, interoperability, or clarity.

The goal is not to force a winner among formats. The goal is to reduce fragmentation while preserving room for good ideas to travel across projects.

## Why this matters

Agent-facing project configuration is fragmenting quickly across vendor-specific files, partial conventions, and incompatible folder layouts. Teams are already experimenting with:

- project-level instruction files;
- reusable skills;
- named agents;
- task or workflow artifacts;
- persistent memory or context stores.

Without a neutral interoperability model, those ideas risk becoming siloed by tool, repository, or company.

ACS is well-positioned to serve as a convergence layer because it already offers:

- a documented layout;
- a reference implementation;
- JSON schemas;
- validation tooling;
- a neutrality story that is easier to standardize in a foundation setting.

## Proposal

We propose that ACS explore and formalize an interoperability path for a frontmatter-oriented `.agents/` structure, beginning with documentation, examples, schemas, and validation tooling.

This work should start as a compatibility and experimentation effort, not as an immediate breaking change to ACS v1.

## Scope

The initial scope includes:

1. Mapping frontmatter-based agent, skill, task, and memory files into ACS concepts.
2. Defining validation rules for those artifacts.
3. Specifying precedence and merge semantics across local, workspace, monorepo, and user-level configuration.
4. Establishing privacy and export expectations for persistent memories.
5. Evaluating whether a bundle/distribution format should be standardized.

## Current ACS baseline

ACS v1 currently defines a canonical layout centered on `.agents/main.yaml` and layered folders such as `context/`, `skills/`, `agents/`, and `permissions/`.

This proposal does not replace that baseline. Instead, it introduces a structured path to:

- map adjacent formats into ACS,
- test whether some patterns deserve standardization,
- and create migration-friendly tooling for teams that already use neighboring conventions.

## Guiding principles

- Compatibility first where it reduces migration cost.
- Selective adoption where another project has clearly solved a problem better.
- Validation before normalization.
- Privacy and safety before convenience for persistent data.
- Incremental rollout with examples and tests before spec promotion.

## Candidate interoperable artifacts

| Artifact | Purpose | ACS status |
|---|---|---|
| `.agents/mcp.json` | Project metadata and compatibility manifest | Prototype mapping to `main.yaml` |
| `.agents/agents/*/agent.md` | Named agent definitions | Close fit with existing ACS agent concept |
| `.agents/skills/*/skill.md` | Reusable capabilities with frontmatter metadata | Close fit with ACS skills |
| `.agents/tasks/*/task.md` | Repeatable workflows or routines | Candidate future layer |
| `.agents/memories/*.md` | Persistent project memory with metadata | Candidate future layer with privacy requirements |

## Why adoption should remain selective

Interoperability should not mean importing every external pattern unchanged.

A proposal should be considered for inclusion in ACS when it:

- improves clarity or ergonomics;
- remains portable across tools;
- can be validated mechanically;
- does not undermine the existing ACS mental model;
- has a workable migration story.

This keeps the door open to ecosystem innovation without turning the standard into a pile of undocumented exceptions.

## Merge semantics to standardize

One of the biggest missing pieces across agent configuration systems is predictable composition. If ACS moves further in this direction, it should specify:

- precedence between project, package, workspace, and user-level sources;
- duplicate ID resolution rules;
- intentional deletion or negative override semantics;
- partial merge versus full replacement behavior;
- coexistence rules when both canonical ACS manifests and interoperable manifests are present.

This is a strong area for standardization value because many local conventions currently leave it implicit.

## Privacy and security considerations

Persistent memory should be opt-in and governed by explicit metadata. At minimum, future work should define:

- sensitivity labels;
- export or masking rules;
- retention expectations;
- validation checks for accidental exposure;
- bundle-level exclusion controls.

A neutral standard should make privacy controls easier to implement consistently, not easier to skip.

## Deliverables for an initial working phase

1. A documented interoperability note.
2. A worked example repository layout.
3. Prototype schemas for task, memory, and bundle artifacts.
4. Validation scripts and integration tests.
5. A migration guide from adjacent formats.
6. An outreach issue or discussion for ecosystem maintainers.

## Benefits for AAIF consideration

This proposal is a good fit for a foundation conversation because it addresses a standards problem that is bigger than any one tool:

- fragmentation across agent ecosystems;
- lack of portable validation and governance;
- no common migration story across formats;
- growing need for neutral handling of memory, permissions, and workflow artifacts.

AAIF could help by providing a venue for:

- multi-project feedback;
- legitimacy for cross-tool interoperability work;
- clearer governance for future extensions;
- broader participation from maintainers outside the ACS repo.

## Risks and open questions

- Whether frontmatter-based layouts should become normative or remain compile/export targets.
- How much of `task` and `memory` belongs in core ACS versus optional extensions.
- Whether `mcp.json` should stay as an interop artifact or converge into a single manifest model.
- How to avoid duplicated semantics between Markdown bodies and structured metadata.
- What minimum security model should apply before memory artifacts are standardized.

## Suggested next steps

1. Publish the interoperability example and mapping document.
2. Gather feedback from maintainers in adjacent `.agents` efforts.
3. Prototype schemas and validation behavior.
4. Test migration and merge semantics on real repositories.
5. Refine this draft into the AAIF proposal template with sponsors, maintainers, and roadmap details.

## Repo artifacts linked to this draft

- [Interop note](./interop-dotagents.md)
- [Reference example](../../examples/dotagents-example/README.md)

## Positioning sentence

ACS seeks compatibility with existing initiatives while remaining willing to adopt the ecosystem's strongest ideas when they improve interoperability, developer experience, and the clarity of the standard.

## Sponsors (target and status)

- Current: community-driven, no formal external sponsors yet.
- Target sponsors (outreach candidates): major AAIF members and platform maintainers who have a stake in agent interoperability — for example: Anthropic, OpenAI, Google, Microsoft, AWS, Cloudflare, Block, Bloomberg. These are *outreach targets*, not confirmed sponsors.
- Sponsor needs: at least one organizational sponsor (member of AAIF) and one technical partner to commit reviewer/CI support before formal submission.

## Maintainers and Contacts

- Current repo maintainer: see `GOVERNANCE.md` (maintained by @jackby03). This project will propose an initial maintainer group that includes:
	- the current maintainer(s) listed in `GOVERNANCE.md`;
	- two-to-four community volunteers with domain experience (CLI, MCP, schemas);
	- at least one representative willing to shepherd the AAIF submission and liaise with the AAIF Technical Committee.
- Action: prepare a `MAINTAINERS.md` or update `GOVERNANCE.md` with explicit names and contact points before submission.

## Finalized Scope (explicit)

This submission will request an interoperability working track focused on the following deliverables (initial phase):

1. Canonical mapping between frontmatter-based `.agents/` layouts and ACS concepts (agents, skills, tasks, memories, MCP manifests).
2. JSON Schemas (prototype) for frontmatter fields: `agent`, `skill`, `task`, `memory`, `mcp.json` and `bundle`.
3. Well-defined merge semantics (precedence, duplicate ID resolution, negative overrides, partial merge behavior).
4. Privacy & safety rules for `memories` (sensitivity labels, default opt-in/opt-out, export rules).
5. A reference example repository (`examples/dotagents-example`) demonstrating mapping and migration.
6. Validation tooling (`scripts/validate-dotagents.*`) and CI checks demonstrating green runs on the reference example.
7. Migration guide and developer-facing documentation.

**Out of scope for initial AAIF submission**: production-ready CLI UX (full parity with `dot-agents`), signed bundle registries, or team-permission features — these remain future extensions.

## License and compatibility

- Current repository license: Apache-2.0 (see `LICENSE`).
- Proposal stance: the ACS submission will be licensed under `Apache-2.0` for code artifacts and `CC-BY-4.0` for documentation where applicable. For AAIF consideration the submission will document license compatibility and propose governance terms compatible with AAIF's processes.

## Proposed governance model (for AAIF submission)

1. Technical Committee (TC) supervision: align with AAIF structure — the TC will review the interoperability track and accept specification promotions.
2. Maintainers group: a small core team responsible for day-to-day maintenance, release management, and triage.
3. Contribution model: GitHub-first workflow with RFCs for new fields or breaking changes; a defined comment period (30 days) for major changes.
4. Acceptance criteria: tests passing, example artifacts present, at least one dependant project adoption or endorsement, and documented migration strategy.
5. Security & privacy review: any memory-related proposal must pass a lightweight privacy review before acceptance.

## Roadmap (milestones with timeline)

The following 2-week sprint roadmap is proposed as the minimum to prepare an AAIF submission package.

- Sprint 0 (now, 1 week): finalize AAIF proposal draft, identify sponsors, and confirm maintainers/contact points.
- Sprint 1 (2 weeks): finalize `interop-dotagents.md` merge semantics; create `examples/dotagents-example` minimal layout; add `README`.
- Sprint 2 (2 weeks): author prototype JSON Schemas and a `scripts/validate-dotagents.*` validator; add unit/integration tests.
- Sprint 3 (2 weeks): wire CI (GitHub Actions) to run validation and tests; fix issues until green; create migration guide.
- Sprint 4 (2 weeks): finalize governance docs, collect sponsor endorsements, prepare AAIF project-proposal YAML and submission materials.
- Sprint 5 (2 weeks): outreach to AAIF, dot-agents/dotagentsprotocol maintainers for early review; respond to feedback and iterate.

Estimated time to submission: 6–10 weeks depending on sponsor availability and community feedback.

## Acceptance criteria for AAIF submission

Before filing the project-proposal to AAIF we plan to have:

- `docs/proposals/aaif-proposal-draft.md` (finalized) and `docs/proposals/interop-dotagents.md` with merge semantics.
- `examples/dotagents-example/` present and validated by `scripts/validate-dotagents.*`.
- CI checks green on main branch for the example and validation scripts.
- A short migration guide and privacy notes for `memories`.
- A named sponsor or AAIF contact willing to present/advocate the proposal.

## Outreach and community plan

1. Open an issue in this repo that summarizes the proposal, links docs, and requests feedback (`issue: interoperability/aaif-proposal`).
2. Invite maintainers from `dot-agents`, `dotagentsprotocol`, and other adjacent projects for review and to join a working group.
3. Publish a small call-for-feedback thread in relevant communities (X/Twitter, AAIF Discord, GitHub Discussions).

## Risks and mitigation

- Risk: license or governance friction with AAIF. Mitigation: early legal check and explicit compatibility notes.
- Risk: lack of sponsor. Mitigation: target AAIF members and community companies, provide a low-effort demo to attract interest.
- Risk: spec drift or scope creep. Mitigation: enforce sprint-based milestones and acceptance criteria.

## Next actionable steps (short list)

1. Confirm and add sponsor/maintainer names in `GOVERNANCE.md` and `MAINTAINERS.md`.
2. Close merge semantics in `docs/proposals/interop-dotagents.md` (detailed rules + examples).
3. Implement `examples/dotagents-example` and `scripts/validate-dotagents.*` and add CI.
4. Finalize AAIF YAML proposal and submit to `aaif/project-proposals` once a sponsor is identified.

---

*Prepared by the ACS working group — draft for review.*
