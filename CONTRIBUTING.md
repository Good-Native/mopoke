# Contributing to mopoke

Thanks for your interest. This guide covers the bare minimum to get a
local development environment running and a change merged.

## Bootstrap

You'll need Node.js 14+ (no dependencies to install).

```sh
git clone git@github.com:Good-Native/mopoke.git
cd mopoke
node bin/mopoke.js --domain=one.one.one.one --record1=1.1.1.1
```

To use your working tree as the global `mopoke` command:

```sh
npm link
```

## Day-to-day

There is deliberately no build step and no runtime dependency —
`bin/mopoke.js` is the whole tool. Keep it that way unless a change
genuinely can't be done with Node built-ins.

Before opening a PR:

```sh
node --check bin/mopoke.js
node bin/mopoke.js --domain=one.one.one.one --record1=1.1.1.1   # smoke test
```

## Changelog and releases

Every PR to `main` must add at least one line under `## [Unreleased]` in
`CHANGELOG.md` (CI enforces this). Use `## [Unreleased:minor]` or
`## [Unreleased:major]` in the heading to signal the bump size; plain
`[Unreleased]` cuts a patch.

On merge, the auto-release workflow bumps `package.json`, tags
`vX.Y.Z`, creates a GitHub release, and publishes to npm. Apply the
`no-release` label to a PR to skip this.

## Commit style

Short, descriptive, present tense — e.g. `Add IPv6 record support`,
`Fix redraw on resized terminal`.
