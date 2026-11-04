# Releases project state

Plan artifact: https://claude.ai/artifact/WJhyryE4zxanuTfKqBk1d5 ("The Releases
Plan", the owner-facing page for this feed; update it in place, never publish a
second one). The suite as a whole is on "The Vaexcore Plan",
https://claude.ai/artifact/WY3T4bscD2kM5rPxjs81Gd.

Working state across sessions for this repo. Durable detail lives in
`README.md` and `publish/`; this file holds what is true right now. Created 4
Nov 2026.

## Core Project Architecture & Stack

- Public update feed for the Vaexcore desktop apps (ADR-0026). Installed apps
  read `<app>-latest` without a token; the app repos stay private.
- `publish/` is the composite action (`action.yml`, `publish.mjs`, `feed.mjs`)
  the Studio, Pulse, Vaexbot and suite release workflows call, pinned by SHA.
- `<app>-v<version>` releases hold one installer and its manifest, newest ten
  kept per app; `<app>-latest` holds only the current manifest, replaced last.
- Verify, as Check runs it: `node --test publish/feed.test.mjs`,
  `node --check publish/publish.mjs`, `actionlint`.

## Current Structural Milestones / Active Feature Goals

- 4 Nov 2026: all four feeds current (Studio 0.1.331, Pulse 0.2.144, Vaexbot
  0.1.234, suite 0.1.27), ten versioned releases each. Check green on
  `498acf1`.
- Vaexbot moved to Tauri on 2 Nov: it now publishes a signed `latest.json`.

## Active Task State & Known Regressions

- README is stale for Vaexbot: it still lists `latest.yml` and SHA-512
  checking. Fix after the owner decides what the frozen manifest is for.
- `vaexbot-latest` and `console-latest` still carry `latest.yml` frozen at
  0.1.197 (17 Oct). Owner decision open; default is keep and document.
- Pins differ: Studio, Vaexbot and suite use `publish@d660f58`, Pulse
  `publish@56832e0`. Same `publish/` code; align on the next action change.

## Temporary Logic Rules & Constraints

- Public repo: no tokens, private paths or internal notes in any file here.
- Nothing is published by hand. A rollback copies an old manifest into
  `<app>-latest`; it stops updates, it never downgrades.
- A change to `publish/` must be rolled out to every app repo's pin together.

## Context Compaction Checklist

- Keep the plan artifact line first; the URL does not change.
- Record feed versions and pin SHAs here when they change.
- Update this file when a sub-task lands or a rule changes.
