# jamarq releases

Installers and update feeds for JAMARQ's desktop apps. Most apps' source is
private; this repository holds only what an installed app downloads.

This repository was `vaexcore-releases` until 8 Nov 2026. GitHub redirects the
old name, so copies installed before the rename keep updating; each app's next
build reads the new address.

Nothing here is published by hand. Each app's repository publishes through the
action in [`publish/`](publish): the Vaexcore apps on every change to `main`
that passes CI, and Modlist Launcher, Keeplight and Vaexil Mod Manager when a
reviewed draft release is published.

## Apps

| App | Install | Feed |
| --- | --- | --- |
| vaexcore studio | `vaexcore-studio-<version>-x64-setup.exe` from `studio-v*` | `https://github.com/JAMARQ-Digital-LLC/jamarq-releases/releases/download/studio-latest/latest.json` |
| vaexcore pulse | `vaexcore-pulse-<version>-x64-setup.exe` from `pulse-v*` | `https://github.com/JAMARQ-Digital-LLC/jamarq-releases/releases/download/pulse-latest/latest.json` |
| Vaexbot | `vaexbot-<version>-x64-setup.exe` from `vaexbot-v*` | `https://github.com/JAMARQ-Digital-LLC/jamarq-releases/releases/download/vaexbot-latest/latest.json` |
| vaexcore suite | `vaexcore-suite-<version>-x64-setup.exe` from `suite-v*` | `https://github.com/JAMARQ-Digital-LLC/jamarq-releases/releases/download/suite-latest/latest.json` |
| Modlist Launcher | `modlist-launcher-<version>-x64-setup.exe` from `modlist-launcher-v*` | `https://github.com/JAMARQ-Digital-LLC/jamarq-releases/releases/download/modlist-launcher-latest/release.json` |
| Keeplight | `keeplight-<version>-x64-setup.exe` from `keeplight-v*` | `https://github.com/JAMARQ-Digital-LLC/jamarq-releases/releases/download/keeplight-latest/release.json` |
| Vaexil Mod Manager | `vaexil-mod-manager-<version>-x64-setup.exe` from `vaexil-mod-manager-v*` | `https://github.com/JAMARQ-Digital-LLC/jamarq-releases/releases/download/vaexil-mod-manager-latest/release.json` |

To install an app for the first time, download the newest installer from its
`<app>-v*` release. The Tauri apps update themselves from then on. Modlist
Launcher, Keeplight and Vaexil Mod Manager have no updater; each `release.json`
names the newest installer and its SHA-256.

Adding an app is one entry in `APP_INFO` in [`publish/feed.mjs`](publish/feed.mjs),
then a release workflow in that app's repository that calls the action.

## Releases

- `<app>-v<version>`: one build - its installer, and the manifest that points at
  it. The newest ten per app are kept.
- `<app>-latest`: the manifest installed copies read, and nothing else. It is
  replaced last when a build is published, so it never names an installer that
  has not finished uploading.

Vaexbot was vaexcore console until 2026-10-01. Until 2026-10-05 its manifest
was also written to `console-latest`, which installs from before the rename
read, so they updated onto Vaexbot and from then on read `vaexbot-latest`. The
mirror was removed once the last such install was confirmed on the new feed.
The `console-latest` release stays, frozen on that build, so a straggler still
updates onto Vaexbot. `FEED_MIRRORS` in `publish/feed.mjs` is where a mirror
would go after a future rename.

## Versions

For the Vaexcore apps, `MAJOR.MINOR` comes from the app's own version field and
`PATCH` is the number of commits on `main` that changed the app. Every published
build is therefore newer than the last, and a change to docs or CI alone does
not publish anything. For the other apps, the version is the release tag.

## Signing

Tauri updates (studio, pulse, Vaexbot, suite) are signed, and the apps refuse an
update that does not verify. Vaexbot moved to Tauri on 2 Nov 2026;
`vaexbot-latest` still carries the frozen `latest.yml` that pre-Tauri installs
read. The other apps' `release.json` carries the installer's SHA-256.

The installers are not yet Authenticode-signed. Windows may warn before running
one downloaded from here, and Smart App Control may block it.

## Rolling back

Copy the manifest from the release you want to go back to into that app's
`<app>-latest` release, replacing the one there. Installed copies only move
forward, so this stops newer installs from updating further but does not
downgrade anyone.

## License

The Vaexcore installers and the tooling here are proprietary; see
[LICENSE](LICENSE). An app released under its own open-source license keeps
that license: Modlist Launcher, Keeplight and Vaexil Mod Manager are GPL-3.0,
with source at <https://github.com/jmars319/modlist-launcher>,
<https://github.com/jmars319/keeplight> and
<https://github.com/jmars319/vaexil-mod-manager>. The repository is public only so
installed apps can read their update feeds without a token.
