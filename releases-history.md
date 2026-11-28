# Releases history

What has been built and when, newest first. The plan page (https://claude.ai/artifact/WJhyryE4zxanuTfKqBk1d5) shows
what is upcoming and links here; `releases-project-state.md` holds current working state.
Plain Markdown on purpose, quick to read (agentic-instructions
`docs/project-plan-artifact.md`, "Where history lives").

Moved from the plan page's Done tab on 2026-11-23, as written there; an
entry's "now", "still" or "not yet" means as of its own date. PR references rechecked 2026-11-23 against GitHub: 17 referenced in this repo, all merged.

## Ledger

2026-11-28

State file corrected against the README and ADR-003 (docs-against-code check): Vaexil Mod Manager has an updater from 0.2.0, and `console-latest` is frozen on the last build mirrored by 2026-10-05, not 0.1.197 (#32).

2026-11-18

Page and state file re-checked first-hand against GitHub and every live feed (#21).

2026-11-18

Modlist Launcher, Keeplight and Vaexil Mod Manager moved from `jmars319` into `JAMARQ-Digital-LLC`. Each kept its `JAMARQ_RELEASES_TOKEN` secret, and the feeds here are unaffected. The README's source links name the org (#20).

2026-11-17

Check skips the test job on pull requests that touch only docs (#18).

2026-11-14

The suite control center left `APP_INFO` (#16); its 11 `suite-*` releases are kept by your decision (#17). Its last build, 0.1.34, went out just before.

2026-11-14

Keeplight 0.2.0 and Vaexil Mod Manager 0.2.0 published, the first `plain` releases. Vaexil Mod Manager updates itself from its feed from 0.2.0 (#15).

2026-11-08

The releases secret renamed to `JAMARQ_RELEASES_TOKEN` and set in all six calling repos; every caller now pins `publish@c3a6502` (#14).

2026-11-08

Keeplight and Vaexil Mod Manager added to `APP_INFO` (#12); their publish workflows merged (keeplight#6, vaexil-mod-manager#9, modlist-launcher#23).

2026-11-08

Renamed to jamarq-releases and opened to every app: `APP_INFO`, the `plain` manifest kind, per-app README, and a LICENSE paragraph keeping each open-source app's own license (#11).

2026-11-04

This plan page and the repo's state file.

2026-11-01

Safe Dependabot updates auto-merge (Tier A, \#9).

2026-10-24

A proprietary license added; `.claudeignore` removed (#8).

2026-10-05

The `console-latest` mirror stopped once the last pre-rename install was confirmed on the new feed; `console-latest` stays frozen (#7).

2026-10-03

Your setup: the releases token and the Tauri signing key set in the Vaexcore repos; the first signed releases published.

2026-10-01

Vaexbot publishes to its own feed, mirrored to `console-latest` through the rename (#6).

2026-09-13 to 29

The feed created for ADR-0026 with the publish action and keep-ten pruning; a missing token fails fast (#1); checkout and setup-node at v7 (#2, \#3); ignore baseline (#4).
