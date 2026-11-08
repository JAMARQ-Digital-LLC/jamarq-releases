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
  the Studio, Pulse, Vaexbot and suite release workflows call, pinned by SHA.
  Apps are listed in `APP_INFO` in `feed.mjs`. Modlist Launcher (public,
  GPL-3.0) is the first non-Vaexcore app, using kind `plain` (`release.json`
  with url and sha256) because it has no updater.
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

- README now lists Vaexbot's `latest.json` and describes the frozen
  `latest.yml` as what pre-Tauri installs read.
- After the rename PR merges: bump every app's `publish@` pin to its merge
  commit and change each app's updater endpoint to `jamarq-releases`.
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
