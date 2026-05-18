---
name: daily-maintenance
description: Repeatable maintenance workflow for validating project health and surfacing follow-up work.
schedule: daily
steps:
  - validate-config
  - run-tests
  - review-open-risks
  - summarize-status
human_review: true
---

## Intent

This task models a future ACS task artifact for repeatable workflows. It is included here to test naming, metadata, and documentation shape rather than to define a final standard.

## Expected result

- Validation status is known.
- Regressions are surfaced early.
- Follow-up work is captured in a concise summary.
