# Releases project state

Plan artifact: https://claude.ai/artifact/WJhyryE4zxanuTfKqBk1d5 ("The Releases
Plan", the owner-facing page for this feed; update it in place, never publish a
second one). The suite as a whole is on "The Vaexcore Plan",
https://claude.ai/artifact/WY3T4bscD2kM5rPxjs81Gd.

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
  GPL-3.0, no updater) use kind `plain` (`release.json` with url and sha256),
  published by each repo's `publish-feed.yml` when a reviewed draft release
  is published.
- `<app>-v<version>` releases hold one installer and its manifest, newest ten
  kept per app; `<app>-latest` holds only the current manifest, replaced last.
- Verify, as Check runs it: `node --test publish/feed.test.mjs`,
  `node --check publish/publish.mjs`, `actionlint`.

## Current Structural Milestones / Active Feature Goals

- 8 Nov 2026: all four Vaexcore feeds published on the new name the same day
  (Studio 0.1.335, Pulse 0.2.147, Vaexbot 0.1.239, suite 0.1.29), ten
  versioned releases each. Check green on `f07ce6c`.
- Pins: Studio, Pulse, Vaexbot and suite `publish@eaa8917` (#11); Modlist
  Launcher, Keeplight and Vaexil Mod Manager `publish@f07ce6c` (#12). Same
  publish code; #12 only adds two `APP_INFO` entries.
- Vaexbot moved to Tauri on 2 Nov: it publishes a signed `latest.json`.

## Active Task State & Known Regressions

- The three `plain` apps have no published release yet, so the `plain` path
  has not run end to end. Each repo needs the `VAEXCORE_RELEASES_TOKEN`
  secret before its first published release.
- `vaexbot-latest` and `console-latest` still carry `latest.yml` frozen at
  0.1.197 (17 Oct). Default applied: keep, documented in the README.

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
