import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function text(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

test("home page presents the complete Game Controller product", async () => {
  const html = await text("../static/index.html");
  assert.match(html, /<title>Game Controller \| Remote, Touchpad and Game Controls<\/title>/);
  assert.match(html, /Button remote/);
  assert.match(html, /Touchpad/);
  assert.match(html, /Game controller/);
  assert.match(html, /installed channels/i);
  assert.match(html, /Local Network access/);
  assert.match(html, /not affiliated with, endorsed by, or sponsored by Roku/);
  assert.doesNotMatch(html, /RokuPilot|TODO|example\.com/i);
});

test("privacy policy covers app data and advertising", async () => {
  const html = await text("../static/PrivacyPolicy/en.html");
  assert.match(html, /Game Controller Privacy Policy/);
  assert.match(html, /Local network access/);
  assert.match(html, /SSDP/);
  assert.match(html, /Google Mobile Ads/);
  assert.match(html, /User Messaging Platform/);
  assert.match(html, /App Tracking Transparency/);
  assert.match(html, /Retention and deletion/);
  assert.match(html, /Your choices and privacy rights/);
  assert.match(html, /Children's privacy/);
  assert.doesNotMatch(html, /RokuPilot|TODO|example\.com/i);
});

test("user agreement includes Apple and independent Roku terms", async () => {
  const html = await text("../static/UserAgreement/en.html");
  assert.match(html, /Game Controller User Agreement/);
  assert.match(html, /Apple's Standard EULA/);
  assert.match(html, /third-party beneficiaries/);
  assert.match(html, /Limitation of liability and indemnity/);
  assert.match(html, /Independent application notice/);
  assert.match(html, /not affiliated with, endorsed by, authorized by, or sponsored by Roku/);
  assert.doesNotMatch(html, /RokuPilot|TODO|example\.com/i);
});

test("build output contains all public entry points and assets", async () => {
  for (const path of [
    "../dist/client/index.html",
    "../dist/client/static/index.html",
    "../dist/client/PrivacyPolicy/index.html",
    "../dist/client/UserAgreement/index.html",
    "../dist/client/privacy/index.html",
    "../dist/client/terms/index.html",
    "../dist/client/static/images/app-icon.png",
    "../dist/client/static/images/remote.webp",
    "../dist/client/static/images/channels.webp",
    "../dist/client/static/images/game.webp",
    "../dist/server/index.js",
    "../dist/.openai/hosting.json",
  ]) {
    await access(new URL(path, import.meta.url));
  }
});
