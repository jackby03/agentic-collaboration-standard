PR title: chore: relicence repository to Apache-2.0; add NOTICE and licensing notes; add MAINTAINERS and DCO guidance

PR body:

Summary
- Re-license the repository from MIT → Apache-2.0 to improve compatibility with foundation/institutional requirements.
- Add `NOTICE` and `docs/legal/licensing.md` with relicensing notes and next steps.
- Add `MAINTAINERS.md` and DCO guidance in `CONTRIBUTING.md`.
- Update package manifests and documentation to reflect the new license.

Files changed (high level)
- `LICENSE`, `NOTICE`, `docs/legal/licensing.md`, `CHANGELOG.md`
- `MAINTAINERS.md`, `CONTRIBUTING.md`
- `cli/package.json`, `reference-impl/typescript/package.json`, `editor/vscode/package.json`
- `reference-impl/python/pyproject.toml`, `packages/python/pyproject.toml`
- `editor/vscode/LICENSE`, `editor/vscode/README.md`
- `docs/proposals/aaif-proposal-draft.md`

Rationale
- `Apache-2.0` includes an explicit patent grant and is commonly accepted by foundations (Linux Foundation / AAIF).
- Contributor audit shows a single primary human author — no external consent required.

Impact & notes
- Code: Apache-2.0
- Docs: recommended `CC-BY-4.0` (documented in `docs/legal/licensing.md`)
- CI and package manifests updated; downstream consumers should be unaffected, but review your consumers if needed.

Checklist before merge
- [ ] Confirm maintainers listed in `MAINTAINERS.md` (add contacts if needed)
- [ ] Run CI and confirm green on branch `relicense/apache2`
- [ ] Announce change in repo (PR/Discussion) and to any known contributors/consumers
- [ ] (Optional) Add DCO bot or enforce `Signed-off-by` in `CONTRIBUTING.md`

Request
Please review license text, `MAINTAINERS.md` contact, and `docs/legal/licensing.md`. Merge when satisfied.
