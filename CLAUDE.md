# CLAUDE.md

Last reviewed: 2026-08-21

This file is the project operating guide for Claude Code (desktop/CLI) in this
repository.

## Hard requirements

- Use Australian English in code comments, commit messages, user-facing text,
  and generated docs.
- Preserve existing behaviour unless explicitly asked to change it.
- Ask at most one clarifying question when ambiguity materially affects
  correctness or safety.
- Ask for explicit confirmation before destructive steps (force pushes,
  history rewrites, secret/config changes, dependency removals).
- Do not expose, invent, or log secrets, credentials, or tokens.
- Keep edits scoped and incremental.

## Technical baseline

- Language: Node.js 14+ (CI runs 20, 22, 24). No TypeScript, no build step.
- Zero runtime dependencies — Node built-ins only. Adding a dependency
  needs explicit maintainer approval.
- The whole tool is `bin/mopoke.js`. Resist splitting it until size
  genuinely demands it.
- Licence: MIT. Copyright Good-Native.

## Project-specific rules

**Output contract:** the live block redraws in place using ANSI cursor
movement; permanent lines are only written on state changes. Anything that
prints must respect this — no stray `console.log` in the check loop.

**Argument style:** `--key=value` only, parsed by the regex at the top of
`bin/mopoke.js`. `--recordN` pairs with `--domainN` (or the shared
`--domain`). New options follow the same pattern and get a TOML-free,
flag-only interface.

**Checks are read-only.** mopoke only ever resolves DNS. It must never
mutate records, hit registrar APIs, or phone home.

## Automated review gates

- CI (GitHub Actions) runs `node --check` and a live smoke test across the
  Node matrix. Treat both as mandatory pre-merge gates.
- Every PR must add an entry under `## [Unreleased]` in `CHANGELOG.md`
  (changelog-check.yml enforces this; `no-release` label skips the
  auto-release on merge).
- Merges to `main` with unreleased changelog content auto-cut a release:
  version bump, `vX.Y.Z` tag, GitHub release, npm publish of
  `@good-native/mopoke` (see `.github/workflows/`). Publish credentials
  are loaded from 1Password via `OP_SERVICE_ACCOUNT_TOKEN`, same as
  Good-Native/hover.

## Commit style

- 5–6 words, descriptive, present tense. Examples: `Add IPv6 record
support`, `Fix redraw on narrow terminals`.
- No AI-attribution footers (`Co-Authored-By: Claude`, `Generated with`,
  etc.).
- Group related work into single commits where reasonable; avoid chains
  of fix-the-fix commits.

## Origin / provenance

Ported from `dns-watch.js` in Simon's local bin. Repo conventions
(changelog gates, auto-release, trusted publishing) are ported from
`Good-Native/paperbark`, which in turn descends from `Good-Native/hover`.
