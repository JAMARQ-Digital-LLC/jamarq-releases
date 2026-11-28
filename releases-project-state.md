# Releases project state

Plan artifact: https://claude.ai/artifact/WJhyryE4zxanuTfKqBk1d5 ("The Releases
Plan", the owner-facing page for this feed; update it in place, never publish a
second one). The Vaexcore suite repo and its control center were retired on 14 Nov
2026 (owner); "The Vaexcore Plan" page is marked retired.
History: releases-history.md

Working state across sessions for this repo. Durable detail lives in
`README.md` and `publish/`; this file holds what is true right now. Created 4
Nov 2026.

## Core Project Architecture & Stack

- Public update feed for JAMARQ's desktop apps (ADR-0026). Renamed from
  `vaexcore-releases` to `jamarq-releases` on 8 Nov 2026; GitHub redirects the
  old name (verified: all four old `<app>-latest` URLs 301 to the new name and
  download). Installed apps read `<app>-latest` without a token.
- `publish/` is the composite action (`action.yml`, `publish.mjs`, `feed.mjs`)
  the app repos call, pinned by SHA. Apps are listed in `APP_INFO` in
  `feed.mjs`. Modlist Launcher, Keeplight and Vaexil Mod Manager (public,
  GPL-3.0) use kind `plain` (`release.json` with url and sha256), published
  by each repo's `publish-feed.yml` when a reviewed draft release is
  published. Modlist Launcher and Keeplight have no updater and only say when
  a newer release is out (README); Vaexil Mod Manager, from 0.2.0, downloads,
  checks and silently runs the installer its `release.json` names once the
  user confirms.
- `<app>-v<version>` releases hold one installer and its manifest, newest ten
  kept per app; `<app>-latest` holds only the current manifest, replaced last.
- Verify, as Check runs it: `node --test publish/feed.test.mjs`,
  `node --check publish/publish.mjs`, `actionlint`.
- Check has two jobs (17 Nov 2026): `changes` ("Changes and secret scan":
  Gitleaks over the pushed commits, then classifies the PR's files) and the
  required `test`. A PR that touches only root Markdown, `docs/*.md` or
  `LICENSE*` skips `test`; anything else, every push to main, and a failed
  `changes` job run it. Never add `paths:` filters to `check.yml`.

## Current Structural Milestones / Active Feature Goals

- **History moved off the plan page (2026-11-23).** Finished work, the dated ledger and completed setup now live in `releases-history.md`; the plan page's Done tab keeps the last two weeks and links to it (agentic-instructions `docs/project-plan-artifact.md`, "Where history lives").
- Feeds, checked first-hand 18 Nov 2026 (manifest `version` and `pub_date`):
  Studio 0.1.356 (18 Nov), Pulse 0.2.178 (18 Nov), Vaexbot 0.1.255 (16 Nov),
  Keeplight 0.2.0 (14 Nov), Vaexil Mod Manager 0.2.0 (14 Nov). Both `plain`
  installers match their `release.json` SHA-256. Modlist Launcher: no tag, no
  release, `modlist-launcher-latest` answers 404. Suite frozen at 0.1.34
  (15 Nov 01:06 UTC, the last build before #16).
- Versioned releases: Studio, Pulse, Vaexbot and suite 10 each; Keeplight and
  Vaexil Mod Manager 1 each.
- Pins, 18 Nov: all six calling repos (Studio, Pulse, Vaexbot, Keeplight,
  Vaexil Mod Manager, Modlist Launcher) pin `publish@c3a6502` (#14). The only
  later `publish/` change is #16, which drops the suite from `APP_INFO`; no
  caller needs it, so the pins are level.
- Every caller passes `secrets.JAMARQ_RELEASES_TOKEN`, and all six repos have
  that secret (names checked 18 Nov). No workflow, feed URL or app updater
  constant names `jmars319`.
- Release cadence (decision log 2026-11-18): Studio, Pulse and Vaexbot release
  nightly until each has its `main-build.yml`, then only on a dispatch the owner
  asks for. All three have `main-build.yml` now, dispatch-only (checked 24 Nov). The three Slint apps
  publish only when the owner publishes a reviewed draft.
- Vaexbot moved to Tauri on 2 Nov: it publishes a signed `latest.json`.

## Active Task State & Known Regressions

- **Danger list (2026-11-24, fleet sweep):** `AGENTS.md` (new, with the one-line `CLAUDE.md`) now has a "Danger list" section naming this repo's production hazards, written from its own files and checked against `main` (PROC-56, agentic-instructions `fleet-repo-baseline-findings`). Update it when deploy, data or verify paths change.
- **Repo baseline ignores (2026-11-24, fleet sweep):** `.claude/worktrees/` is ignored by the repo's own `.gitignore`, so `scripts/repo-baseline-check.mjs` in agentic-instructions reports none of these for this repo (`fleet-repo-baseline-findings`). The danger list and ESLint findings, where this repo has them, stay queued there.
- **Node 26.13.1 (2026-11-24, `[node-lts-move]` in agentic-instructions).** `check.yml` sets up Node 26.13.1 (was 24). Node 22 reaches end of life on 2027-04-30.
- **CI draft gate (2026-11-24, `[ci-draft-skip-rollout]` in agentic-instructions).** A draft pull request runs only `changes` and its secret scan; the heavy jobs skip until it is marked ready, when `ready_for_review` runs them all. Pushes to `main` and schedules run everything as before.

- **CI light lane (2026-11-23, `[ci-light-lane]` in agentic-instructions).** The `changes` job run on the `jamarq-light` runners (here `ubuntu-latest`, as a public repo); a push to `main` that only changed docs since the last passing commit skips the heavy jobs; every other self-hosted job asks for `jamarq-build` (was `jamarq-win`).

- **ADRs (2026-11-22).** `docs/architecture-decisions.md` holds 3 local
  ADRs (ADR-001 builds are published only through the shared action and the
  feed moves last, ADR-002 the feed repository is public and holds only what
  an installed app downloads, ADR-003 renames are bridged, never broken) and
  the central ADRs this repo follows, generated by agentic-instructions
  `scripts/adr-sync.mjs` (never edit that section by hand).
- **2026-11-18: Keeplight, Vaexil Mod Manager and Modlist Launcher moved from
  `jmars319` into `JAMARQ-Digital-LLC`** (owner). README source links name the
  org (#20). Feeds and installers here are unaffected; each repo kept its
  `JAMARQ_RELEASES_TOKEN` secret.
- The `plain` path has run end to end twice: Keeplight 0.2.0 and Vaexil Mod
  Manager 0.2.0 (14 Nov, both `publish-feed.yml` runs green).
- The 0.2.0 `release.json` notes link `github.com/jmars319/<app>/releases/...`,
  written before the move. GitHub redirects those links to the org (checked 18
  Nov), and the workflows build the link from `github.event.release.html_url`,
  so the next release names the org. Nothing to change.
- `vaexbot-latest/latest.yml` (the Electron feed) stays frozen at 0.1.197
  (17 Oct). `console-latest/latest.yml` stays frozen on the last build
  mirrored before the mirror stopped on 2026-10-05 (README, ADR-003); its
  version is not recorded here. Both stay frozen by default, as documented in
  the README; their URLs name `JAMARQ-Digital-LLC/vaexcore-releases`, which
  still redirects (200 after two redirects, 18 Nov).
- 14 Nov 2026: the suite control center is out of `APP_INFO`. Its 11
  `suite-*` releases are kept by owner decision (14 Nov); nothing publishes to
  them, and `vaexcore-suite` is archived.

### Next Up

- **A. Modlist Launcher's first release** (owner). The secret and
  `publish-feed.yml` are in place. Push its version tag, review the draft
  release, publish it. Done when `modlist-launcher-latest/release.json`
  answers 200 and its SHA-256 matches the installer.
- **B. This repo's registry entry is stale** (agentic-instructions). Its
  `deployModel` and notes name only the Vaexcore apps and Modlist Launcher and
  list "Console and Suite" as callers. Done when it names the six callers and
  the retired suite.

## Temporary Logic Rules & Constraints

- Public repo: no tokens, private paths or internal notes in any file here.
- Nothing is published by hand. A rollback copies an old manifest into
  `<app>-latest`; it stops updates, it never downgrades.
- A change to `publish/` must be rolled out to every app repo's pin together.
- Never create a repository named `vaexcore-releases`: it would break the
  redirect that installs from before 8 Nov still rely on.

## Context Compaction Checklist

- Keep the plan artifact line first; the URL does not change.
- Record feed versions and pin SHAs here when they change.
- Update this file when a sub-task lands or a rule changes.
