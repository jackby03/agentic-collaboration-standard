# AAIF Proposal Draft: ACS Interoperability with Frontmatter-Based `.agents/`

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
- [Reference example](../examples/dotagents-example/README.md)

## Positioning sentence

ACS seeks compatibility with existing initiatives while remaining willing to adopt the ecosystem's strongest ideas when they improve interoperability, developer experience, and the clarity of the standard.
