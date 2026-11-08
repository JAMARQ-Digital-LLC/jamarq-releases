import assert from "node:assert/strict";
import { test } from "node:test";
import {
  APPS,
  appTitle,
  assertApp,
  assertVersion,
  assetUrl,
  electronManifest,
  feedTag,
  installerAssetName,
  manifestVersion,
  mirrorFeedTags,
  plainManifest,
  RELEASES_REPO,
  releaseTag,
  releasesToPrune,
  tauriManifest,
} from "./feed.mjs";

const repo = "JAMARQ-Digital-LLC/jamarq-releases";

test("the feed is jamarq-releases", () => {
  assert.equal(RELEASES_REPO, repo);
});

test("each build and each feed has a tag of its own", () => {
  assert.equal(releaseTag("studio", "0.1.311"), "studio-v0.1.311");
  assert.equal(feedTag("vaexbot"), "vaexbot-latest");
  assert.equal(releaseTag("modlist-launcher", "0.1.0"), "modlist-launcher-v0.1.0");
});

test("installer names are unchanged for the Vaexcore apps", () => {
  assert.equal(installerAssetName("studio", "0.1.311"), "vaexcore-studio-0.1.311-x64-setup.exe");
  assert.equal(installerAssetName("pulse", "0.2.116"), "vaexcore-pulse-0.2.116-x64-setup.exe");
  assert.equal(installerAssetName("suite", "0.1.28"), "vaexcore-suite-0.1.28-x64-setup.exe");
  assert.equal(installerAssetName("vaexbot", "0.1.188"), "vaexbot-0.1.188-x64-setup.exe");
  assert.equal(
    installerAssetName("modlist-launcher", "0.1.0"),
    "modlist-launcher-0.1.0-x64-setup.exe",
  );
});

test("only listed apps are accepted, and each has a title", () => {
  for (const app of APPS) {
    assertApp(app);
    assert.ok(appTitle(app));
  }
  assert.equal(appTitle("modlist-launcher"), "Modlist Launcher");
  assert.throws(() => assertApp("console"));
});

test("a plain manifest names the installer and its SHA-256", () => {
  const sha256 = "a".repeat(64);
  const url = assetUrl(repo, "modlist-launcher-v0.1.0", "modlist-launcher-0.1.0-x64-setup.exe");
  const manifest = plainManifest({
    version: "0.1.0",
    notes: "notes",
    url,
    sha256,
    publishedAt: "2026-11-08T00:00:00.000Z",
  });
  assert.deepEqual(manifest, {
    version: "0.1.0",
    notes: "notes",
    pub_date: "2026-11-08T00:00:00.000Z",
    url,
    sha256,
  });
  assert.equal(manifestVersion("plain", JSON.stringify(manifest)), "0.1.0");
  assert.throws(() => plainManifest({ ...manifest, sha256: "ABC" }));
});

test("no app's manifest is mirrored to another feed", () => {
  assert.deepEqual(mirrorFeedTags("vaexbot"), []);
  assert.deepEqual(mirrorFeedTags("studio"), []);
});

test("only a three-part numeric version is accepted", () => {
  assertVersion("0.1.311");
  assert.throws(() => assertVersion("0.1"));
  assert.throws(() => assertVersion("v0.1.3"));
  assert.throws(() => assertVersion("0.1.3-beta"));
});

test("a Tauri manifest names the installer and its signature for Windows", () => {
  const url = assetUrl(repo, "studio-v0.1.311", "vaexcore-studio-0.1.311-x64-setup.exe");
  const manifest = tauriManifest({
    version: "0.1.311",
    notes: "notes",
    signature: "c2lnbmF0dXJl\n",
    url,
    publishedAt: "2026-09-13T00:00:00.000Z",
  });
  assert.deepEqual(manifest.platforms, {
    "windows-x86_64": { signature: "c2lnbmF0dXJl", url },
  });
  assert.equal(manifestVersion("tauri", JSON.stringify(manifest)), "0.1.311");
});

test("a Tauri manifest refuses an empty signature", () => {
  assert.throws(() =>
    tauriManifest({ version: "0.1.1", notes: "", signature: " \n", url: "u", publishedAt: "t" }),
  );
});

const latestYml = [
  "version: 0.1.187",
  "files:",
  "  - url: vaexbot-0.1.187-x64-setup.exe",
  "    sha512: abc==",
  "    size: 90000000",
  "path: vaexbot-0.1.187-x64-setup.exe",
  "sha512: abc==",
  "releaseDate: '2026-09-13T00:00:00.000Z'",
  "",
].join("\r\n");

test("an Electron manifest points every installer reference at the release", () => {
  const url = assetUrl(repo, "vaexbot-v0.1.187", "vaexbot-0.1.187-x64-setup.exe");
  const rewritten = electronManifest(latestYml, {
    version: "0.1.187",
    fileName: "vaexbot-0.1.187-x64-setup.exe",
    url,
  });
  assert.match(rewritten, new RegExp(`^  - url: ${url}$`, "m"));
  assert.match(rewritten, new RegExp(`^path: ${url}$`, "m"));
  assert.match(rewritten, /^    sha512: abc==$/m);
  assert.equal(manifestVersion("electron", rewritten), "0.1.187");
});

test("an Electron manifest for another version or file is refused", () => {
  const options = { version: "0.1.187", fileName: "vaexbot-0.1.187-x64-setup.exe", url: "u" };
  assert.throws(() => electronManifest(latestYml, { ...options, version: "0.1.188" }));
  assert.throws(() => electronManifest(latestYml, { ...options, fileName: "other.exe" }));
  assert.throws(() => electronManifest("version: 0.1.187\n", options));
});

test("pruning keeps the newest versions of one app and never touches the feed", () => {
  const releases = [
    "studio-v0.1.9",
    "studio-v0.1.10",
    "studio-v0.1.100",
    "studio-latest",
    "pulse-v0.2.1",
    "studio-v0.1.11",
  ].map((tagName) => ({ tagName }));
  assert.deepEqual(releasesToPrune(releases, "studio", 2), ["studio-v0.1.10", "studio-v0.1.9"]);
  assert.deepEqual(releasesToPrune(releases, "pulse", 2), []);
  assert.deepEqual(releasesToPrune(releases, "studio", 0), [
    "studio-v0.1.11",
    "studio-v0.1.10",
    "studio-v0.1.9",
  ]);
});
