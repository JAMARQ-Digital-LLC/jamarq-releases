# jamarq releases agent notes

- This repo (GitHub `JAMARQ-Digital-LLC/jamarq-releases`, checkout `vaexcore-releases`) is
  the public update feed for JAMARQ's desktop apps and the `publish/` action their release
  workflows call.
- Read `releases-project-state.md` first and keep it current.
- The fleet rules in agentic-instructions `AGENTS.md` apply, the PR workflow included.
- Verify as Check runs it: `node --test publish/feed.test.mjs`,
  `node --check publish/publish.mjs` and `actionlint`.

## Danger list

- **The releases here are the live feed.** Installed Studio, Pulse and Vaexbot read
  `<app>-latest/latest.json`, and Vaexil Mod Manager downloads and silently runs the
  installer its `release.json` names. Nothing is published by hand: never run
  `gh release create`, `upload`, `edit` or `delete` against this repo, and never run
  `publish/publish.mjs` locally. It drives `gh` with whatever login the shell has, uploads
  with `--clobber`, replaces `<app>-latest` and deletes releases beyond the newest ten with
  `--cleanup-tag`.
- Public repo: no tokens, private paths or internal notes in any file, commit or release
  note. Check runs Gitleaks over every push.
- Callers pin `publish@<sha>`, so a merge here changes no app until the pins move; a change
  to `publish/` is rolled out to every caller's pin together. A rollback (owner's call)
  copies an old manifest into `<app>-latest`: it stops updates, it never downgrades.
- Never create a repository named `vaexcore-releases`: installs from before 8 Nov 2026 rely
  on GitHub's redirect from that name. Keep the frozen releases (`console-latest`, the
  Electron `vaexbot-latest/latest.yml`, the `suite-*` releases) by owner decision.
