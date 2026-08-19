import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const url = (file) => new URL(`../${file}`, import.meta.url);
const read = (file) => fs.readFileSync(url(file), "utf8");
const exists = (file) => fs.existsSync(url(file));

test("shared theme and local game assets are present", () => {
  assert.equal(exists("styles.css"), true);
  assert.equal(exists("assets/orchard-background.jpg"), true);
  assert.equal(exists("assets/channel-icon.png"), true);
  assert.ok(fs.statSync(url("assets/orchard-background.jpg")).size > 100_000);
  assert.ok(fs.statSync(url("assets/channel-icon.png")).size > 10_000);
});

test("shared theme is responsive, accessible, and local-only", () => {
  const css = read("styles.css");
  for (const token of [".site-shell", ".legal-card", ".brand", ".legal-nav", ".effective", ".notice", ".site-footer"]) {
    assert.match(css, new RegExp(token.replace(".", "\\.")));
  }
  assert.match(css, /@media\s*\(max-width:\s*680px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /url\(["']?https?:/i);
});

test("privacy policy describes verified local-only behavior", () => {
  const html = read("privacy-policy.html");
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>Privacy Policy \| Wormhole Orchard<\/title>/);
  assert.match(html, /Effective date:\s*August 19, 2026/);
  for (const copy of [
    "does not collect, transmit, sell, or share personal information",
    "does not require an account",
    "advertising, analytics, telemetry, or third-party tracking software",
    "completed levels and unlocked levels",
    "music and sound-effect settings",
    "tutorial prompts you have completed",
    "Roku device registry",
    "Google Play or the Apple App Store",
    "does not receive information when you scan these codes",
  ]) {
    assert.match(html, new RegExp(copy, "i"));
  }
});

test("privacy page is semantic and uses local resources", () => {
  const html = read("privacy-policy.html");
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /href="terms-of-use\.html"/);
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /src="assets\/channel-icon\.png"/);
  assert.doesNotMatch(html, /<script\b|<form\b|https?:\/\/[^"']+\.(?:js|css|woff2?)/i);
});

test("terms cover the game license and local progress", () => {
  const html = read("terms-of-use.html");
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>Terms of Use \| Wormhole Orchard<\/title>/);
  assert.match(html, /Effective date:\s*August 19, 2026/);
  for (const copy of [
    "limited, non-exclusive, non-transferable, revocable license",
    "personal, non-commercial entertainment",
    "except where applicable law expressly permits",
    "game progress and settings are local gameplay data",
    "have no cash value",
    "provided \"as is\" and \"as available\"",
    "Roku platform remains subject to Roku's own agreements",
  ]) {
    assert.match(html, new RegExp(copy, "i"));
  }
});

test("terms page is semantic and uses local resources", () => {
  const html = read("terms-of-use.html");
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /href="privacy-policy\.html"/);
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /src="assets\/channel-icon\.png"/);
  assert.doesNotMatch(html, /<script\b|<form\b|https?:\/\/[^"']+\.(?:js|css|woff2?)/i);
});

test("public files are GitHub Pages-safe and contain no reference residue", () => {
  for (const file of ["privacy-policy.html", "terms-of-use.html", "styles.css"]) {
    const source = read(file);
    assert.doesNotMatch(source, /Sky Strike/i);
    assert.doesNotMatch(source, /TODO|TBD|placeholder/i);
    assert.doesNotMatch(source, /<script\b|<form\b|document\.cookie|localStorage|sessionStorage/i);
  }
  assert.match(read("privacy-policy.html"), /href="terms-of-use\.html"/);
  assert.match(read("terms-of-use.html"), /href="privacy-policy\.html"/);
});

test("both pages declare the existing local channel icon", () => {
  for (const file of ["privacy-policy.html", "terms-of-use.html"]) {
    assert.match(read(file), /<link rel="icon" href="assets\/channel-icon\.png" type="image\/png">/);
  }
});
