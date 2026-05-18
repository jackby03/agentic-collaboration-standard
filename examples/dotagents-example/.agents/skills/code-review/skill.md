---
name: code-review
description: Perform a structured code review with emphasis on correctness, regressions, and test gaps.
when_to_use:
  - reviewing pull requests
  - auditing risky refactors
  - validating changes before release
produces:
  - findings
  - recommendations
compatibility: acs-v1-prototype
---

## Steps

1. Identify the files and behaviors affected by the change.
2. Compare the implementation against local conventions and surrounding patterns.
3. Check whether edge cases, failure paths, and permissions are covered.
4. Note any test gaps or unclear assumptions.
5. Summarize the highest-signal findings first.

## Guardrails

- Do not suggest broad refactors unless they are required to make the change safe.
- Prefer comments tied to observable behavior.
- Distinguish clearly between bugs, risks, and polish.
