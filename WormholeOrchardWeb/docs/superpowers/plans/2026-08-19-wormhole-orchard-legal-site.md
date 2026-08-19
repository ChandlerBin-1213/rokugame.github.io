# Wormhole Orchard Legal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two polished, English, GitHub Pages-ready legal pages for the Roku game Wormhole Orchard.

**Architecture:** Two semantic static HTML documents share one stylesheet and two local game assets. A dependency-free Node test suite checks the legal copy, navigation, privacy claims, local-only asset loading, accessibility hooks, and absence of Sky Strike residue or executable web code.

**Tech Stack:** HTML5, CSS3, local JPG/PNG assets, Node.js built-in test runner, GitHub Pages-compatible relative URLs.

**Spec:** `docs/superpowers/specs/2026-08-19-wormhole-orchard-legal-site-design.md`

## Global Constraints

- Publish exactly `privacy-policy.html` and `terms-of-use.html`; do not create a marketing homepage.
- Use English copy and the effective date `August 19, 2026`.
- Use no JavaScript, cookies, analytics, forms, trackers, external fonts, remote images, framework, server code, or build step.
- Load all styles and images through relative GitHub Pages-safe paths.
- State only behavior verified in the current Wormhole Orchard Roku package.
- Reuse the existing orchard background and channel icon from `/Users/guoqingyuan/Desktop/rokutvgame`.
- Keep the copy factual, responsive, keyboard accessible, and visually consistent with the game.

## File Structure

- `privacy-policy.html` — privacy disclosures for the Roku game and its QR codes.
- `terms-of-use.html` — license, use, progress, IP, availability, and liability terms.
- `styles.css` — shared responsive game-themed presentation.
- `assets/orchard-background.jpg` — local backdrop copied from the Roku game.
- `assets/channel-icon.png` — local page identity copied from the Roku game.
- `package.json` — exposes the dependency-free test command, not a site build.
- `tests/site-contract.test.mjs` — verifies static publishing and legal-content contracts.

---

### Task 1: Shared Theme and Test Harness

**Files:**
- Create: `package.json`
- Create: `tests/site-contract.test.mjs`
- Create: `styles.css`
- Create: `assets/orchard-background.jpg`
- Create: `assets/channel-icon.png`

**Interfaces:**
- Consumes: the existing Roku game background and channel icon.
- Produces: `.site-shell`, `.legal-card`, `.brand`, `.legal-nav`, `.effective`, `.notice`, and `.site-footer` for both pages.

- [ ] **Step 1: Add the dependency-free command and failing theme tests**

Create `package.json`:

```json
{
  "name": "wormhole-orchard-legal",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "test": "node --test tests/site-contract.test.mjs"
  }
}
```

Create `tests/site-contract.test.mjs`:

```js
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
```

- [ ] **Step 2: Verify RED**

Run: `npm test`

Expected: failures for missing `styles.css` and local assets.

- [ ] **Step 3: Copy the game assets**

```bash
mkdir -p assets
cp /Users/guoqingyuan/Desktop/rokutvgame/assets/images/orchard-background.jpg assets/orchard-background.jpg
cp /Users/guoqingyuan/Desktop/rokutvgame/assets/channel/channel-icon-fhd.png assets/channel-icon.png
```

- [ ] **Step 4: Implement the shared stylesheet**

Create `styles.css` with this foundation, then complete the listed component rules in the same file:

```css
:root {
  color-scheme: light;
  --forest: #245b3f;
  --forest-dark: #173e2c;
  --apple: #b9382e;
  --apple-dark: #8f241f;
  --cream: #fff8dd;
  --paper: rgba(255, 250, 226, 0.97);
  --ink: #332b2a;
  --muted: #675c55;
  --wood: #9a552d;
  --line: rgba(89, 75, 53, 0.24);
  --shadow: 0 24px 64px rgba(33, 62, 35, 0.28);
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-height: 100vh;
  color: var(--ink);
  background:
    linear-gradient(rgba(221, 244, 208, 0.24), rgba(228, 248, 202, 0.58)),
    url("assets/orchard-background.jpg") center / cover fixed;
  font: 17px/1.7 ui-rounded, "Arial Rounded MT Bold", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
a { color: var(--apple-dark); text-underline-offset: 0.18em; }
a:hover { color: var(--forest-dark); }
a:focus-visible { outline: 4px solid #f6b73c; outline-offset: 4px; border-radius: 4px; }
.skip-link { position: fixed; left: 20px; top: 16px; z-index: 10; transform: translateY(-160%); padding: 10px 16px; border-radius: 999px; color: #fff; background: var(--forest-dark); }
.skip-link:focus { transform: translateY(0); }
.site-shell { width: min(960px, calc(100% - 40px)); margin: 0 auto; padding: 48px 0; }
.legal-card { overflow: hidden; border: 4px solid rgba(119, 65, 34, 0.9); border-radius: 30px; background: var(--paper); box-shadow: var(--shadow), inset 0 0 0 4px rgba(255,255,255,.62); }
.site-header { display: flex; align-items: center; justify-content: space-between; gap: 28px; padding: 24px 32px; border-bottom: 1px solid var(--line); background: rgba(255,255,255,.44); }
.brand { display: flex; align-items: center; gap: 16px; min-width: 0; color: var(--forest-dark); text-decoration: none; }
.brand img { width: 96px; height: 72px; object-fit: cover; border-radius: 14px; box-shadow: 0 8px 20px rgba(36,91,63,.2); }
.brand-copy { display: grid; gap: 2px; }
.brand-name { font-size: clamp(1.15rem, 3vw, 1.55rem); font-weight: 800; }
.brand-tagline { color: var(--muted); font-size: .9rem; font-weight: 600; }
.legal-nav { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
.legal-nav a { padding: 9px 13px; border-radius: 999px; font-size: .92rem; font-weight: 800; text-decoration: none; }
.legal-nav a[aria-current="page"] { color: #fff; background: var(--apple); }
main { padding: clamp(28px, 6vw, 60px); }
.eyebrow { margin: 0 0 8px; color: var(--apple-dark); font-size: .82rem; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
h1, h2 { color: var(--forest-dark); line-height: 1.2; }
h1 { margin: 0; font-size: clamp(2.25rem, 7vw, 4.2rem); letter-spacing: -.035em; }
h2 { margin: 2.1em 0 .45em; font-size: clamp(1.32rem, 3vw, 1.65rem); }
p, li { color: var(--muted); }
ul { padding-left: 1.25em; }
li + li { margin-top: .35em; }
.effective { margin: 10px 0 34px; color: var(--forest); font-weight: 800; }
.notice { margin: 28px 0; padding: 18px 20px; border-left: 6px solid var(--apple); border-radius: 0 14px 14px 0; background: rgba(246,222,138,.34); }
.notice p { margin: 0; color: #54483e; }
.page-links { margin-top: 42px; padding-top: 24px; border-top: 1px solid var(--line); font-weight: 800; }
.site-footer { padding: 20px 32px 26px; border-top: 1px solid var(--line); color: var(--muted); text-align: center; font-size: .9rem; background: rgba(255,255,255,.32); }
.site-footer p { margin: 0; }
@media (max-width: 680px) {
  body { background-attachment: scroll; font-size: 16px; }
  .site-shell { width: min(100% - 20px, 960px); padding: 10px 0; }
  .legal-card { border-width: 2px; border-radius: 20px; }
  .site-header { align-items: flex-start; flex-direction: column; padding: 20px; }
  .brand img { width: 80px; height: 60px; }
  .legal-nav { justify-content: flex-start; width: 100%; }
  main { padding: 30px 22px 38px; }
  h1 { font-size: clamp(2rem, 12vw, 3rem); }
  .site-footer { padding: 18px 22px 22px; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}
```

- [ ] **Step 5: Verify GREEN and commit**

Run `npm test`; expect 2 passes.

```bash
git add package.json tests/site-contract.test.mjs styles.css assets
git commit -m "feat: add Wormhole Orchard legal theme"
```

---

### Task 2: Privacy Policy

**Files:**
- Modify: `tests/site-contract.test.mjs`
- Create: `privacy-policy.html`

**Interfaces:**
- Consumes: the shared theme and local icon.
- Produces: the public privacy-policy URL and a link to the terms page.

- [ ] **Step 1: Add failing privacy contracts**

Append:

```js
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
  ]) assert.match(html, new RegExp(copy, "i"));
});

test("privacy page is semantic and uses local resources", () => {
  const html = read("privacy-policy.html");
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /href="terms-of-use\.html"/);
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /src="assets\/channel-icon\.png"/);
  assert.doesNotMatch(html, /<script\b|<form\b|https?:\/\/[^"']+\.(?:js|css|woff2?)/i);
});
```

- [ ] **Step 2: Verify RED**

Run `npm test`; expect the two new tests to fail because the page is missing.

- [ ] **Step 3: Implement the privacy page**

Create a full HTML5 shell with `lang="en"`, viewport and description metadata, shared stylesheet, skip link, local icon, Privacy/Terms navigation, `<main id="main-content">`, footer, and these sections:

```html
<h1>Privacy Policy</h1>
<p class="effective">Effective date: August 19, 2026</p>
<p>This Privacy Policy explains how Wormhole Orchard handles information when you play the game on a Roku device.</p>

<h2>Information We Collect</h2>
<p>Wormhole Orchard does not collect, transmit, sell, or share personal information. The game does not require an account and does not include advertising, analytics, telemetry, or third-party tracking software.</p>

<h2>Game Data Stored on Your Device</h2>
<p>Wormhole Orchard stores a small amount of game data in the Roku device registry so your progress and preferences are available the next time you play. This local data may include:</p>
<ul>
  <li>Completed levels and unlocked levels</li>
  <li>Your last played level</li>
  <li>Music and sound-effect settings</li>
  <li>Tutorial prompts you have completed</li>
</ul>
<p>This data remains on your Roku device and is not transmitted to us or to third parties by Wormhole Orchard.</p>

<h2>QR Codes and Third-Party Services</h2>
<p>The game may display static QR codes that can open Google Play or the Apple App Store on a separate mobile device. Wormhole Orchard does not receive information when you scan these codes. Any interaction with those stores or an app reached through them is governed by that service's own privacy policy.</p>

<h2>Data Sharing</h2>
<p>Because Wormhole Orchard does not collect personal information or transmit game data, we do not sell, rent, or share user data with advertisers, data brokers, or other third parties.</p>

<h2>Data Retention and Deletion</h2>
<p>Local game data remains on the Roku device until you use the game's Reset Progress option or it is removed through the Roku platform. Uninstalling the game or resetting the device may also remove local data. Reinstalling the game may begin with a new save depending on the Roku device and account configuration.</p>

<h2>Children's Privacy</h2>
<p>Wormhole Orchard does not knowingly collect personal information from children or from any other users.</p>

<h2>Roku Platform Services</h2>
<p>Roku may process platform-level information under Roku's own privacy policy and terms. That processing is controlled by Roku and is separate from Wormhole Orchard.</p>

<h2>Changes to This Policy</h2>
<p>We may update this Privacy Policy if the game's features or data practices change. The effective date at the top of this page identifies the latest version.</p>

<h2>Contact</h2>
<p>Questions about this Privacy Policy may be directed to the publisher contact listed on Wormhole Orchard's Roku Streaming Store page.</p>

<p class="page-links"><a href="terms-of-use.html">Read the Wormhole Orchard Terms of Use</a></p>
```

Use `<title>Privacy Policy | Wormhole Orchard</title>`, set Privacy to `aria-current="page"`, and use `© 2026 Wormhole Orchard. All rights reserved.` in the footer.

- [ ] **Step 4: Verify GREEN and commit**

Run `npm test`; expect 4 passes.

```bash
git add privacy-policy.html tests/site-contract.test.mjs
git commit -m "feat: add Wormhole Orchard privacy policy"
```

---

### Task 3: Terms of Use

**Files:**
- Modify: `tests/site-contract.test.mjs`
- Create: `terms-of-use.html`

**Interfaces:**
- Consumes: the shared theme and local icon.
- Produces: the public terms URL and a link to the privacy page.

- [ ] **Step 1: Add failing terms contracts**

Append:

```js
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
  ]) assert.match(html, new RegExp(copy, "i"));
});

test("terms page is semantic and uses local resources", () => {
  const html = read("terms-of-use.html");
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /href="privacy-policy\.html"/);
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /src="assets\/channel-icon\.png"/);
  assert.doesNotMatch(html, /<script\b|<form\b|https?:\/\/[^"']+\.(?:js|css|woff2?)/i);
});
```

- [ ] **Step 2: Verify RED**

Run `npm test`; expect the two new tests to fail because the page is missing.

- [ ] **Step 3: Implement the terms page**

Use the same HTML shell, set Terms to `aria-current="page"`, and include:

```html
<h1>Terms of Use</h1>
<p class="effective">Effective date: August 19, 2026</p>
<p>These Terms of Use govern your use of Wormhole Orchard on the Roku platform. By installing or using the game, you agree to these terms.</p>

<h2>License</h2>
<p>You are granted a limited, non-exclusive, non-transferable, revocable license to use Wormhole Orchard for personal, non-commercial entertainment on compatible Roku devices. No ownership rights are transferred to you.</p>

<h2>Permitted Use</h2>
<p>You may use the game only in accordance with these terms, applicable law, and Roku platform rules. You may not:</p>
<ul>
  <li>Copy, redistribute, sell, rent, or sublicense the game</li>
  <li>Modify, reverse engineer, decompile, or attempt to extract source code except where applicable law expressly permits</li>
  <li>Use the game or its content for unlawful, abusive, or commercial purposes</li>
  <li>Interfere with the operation or security of the game or Roku platform</li>
</ul>

<h2>Game Progress and Settings</h2>
<p>Game progress and settings are local gameplay data. Completed levels, unlocked levels, tutorial status, and audio preferences have no cash value, cannot be exchanged for money, and are not transferable. Local data may be lost if you reset progress, uninstall the game, reset the Roku device, or if stored data becomes unavailable or corrupted.</p>

<h2>Third-Party Services</h2>
<p>Static QR codes in the game may direct a separate mobile device to Google Play, the Apple App Store, or another third-party service. Those services are governed by their own terms. We are not responsible for third-party availability, content, products, or data practices.</p>

<h2>Intellectual Property</h2>
<p>Wormhole Orchard and its software, artwork, audio, design, and other content are owned by or licensed to the publisher and are protected by applicable intellectual property laws. Roku and other third-party platform names and trademarks belong to their respective owners.</p>

<h2>Availability and Updates</h2>
<p>The game may be updated, changed, suspended, or discontinued at any time. Features, level design, compatibility, and availability may change without notice. Continued use after an update means that you accept the updated version of these terms.</p>

<h2>Disclaimer</h2>
<p>Wormhole Orchard is provided "as is" and "as available" without warranties of any kind, to the fullest extent permitted by applicable law. We do not guarantee uninterrupted operation, compatibility with every Roku device, or preservation of local game progress.</p>

<h2>Limitation of Liability</h2>
<p>To the fullest extent permitted by applicable law, the publisher will not be liable for indirect, incidental, special, consequential, or punitive damages arising from use of or inability to use the game. Nothing in these terms excludes rights or liabilities that cannot legally be excluded.</p>

<h2>Roku Terms</h2>
<p>Your use of the Roku platform remains subject to Roku's own agreements, policies, and technical requirements. Roku is not responsible for the content or operation of Wormhole Orchard.</p>

<h2>Changes to These Terms</h2>
<p>We may update these Terms of Use when the game, applicable law, or platform requirements change. The effective date at the top of this page identifies the latest version.</p>

<h2>Contact</h2>
<p>Questions about these Terms of Use may be directed to the publisher contact listed on Wormhole Orchard's Roku Streaming Store page.</p>

<p class="page-links"><a href="privacy-policy.html">Read the Wormhole Orchard Privacy Policy</a></p>
```

Use `<title>Terms of Use | Wormhole Orchard</title>` and the same footer as the privacy page.

- [ ] **Step 4: Verify GREEN and commit**

Run `npm test`; expect 6 passes.

```bash
git add terms-of-use.html tests/site-contract.test.mjs
git commit -m "feat: add Wormhole Orchard terms of use"
```

---

### Task 4: Publishing-Safety and Visual Validation

**Files:**
- Modify: `tests/site-contract.test.mjs`
- Modify only if a specific defect is found: `privacy-policy.html`, `terms-of-use.html`, `styles.css`

**Interfaces:**
- Consumes: the complete static site.
- Produces: a validated folder ready to push to GitHub Pages.

- [ ] **Step 1: Add the final integration contract**

Append:

```js
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
```

- [ ] **Step 2: Run the complete automated suite**

Run: `npm test`

Expected: 7 tests pass.

- [ ] **Step 3: Validate files and HTML entry points**

```bash
test -f privacy-policy.html
test -f terms-of-use.html
test -f styles.css
test -f assets/orchard-background.jpg
test -f assets/channel-icon.png
grep -q '<html lang="en">' privacy-policy.html
grep -q '<html lang="en">' terms-of-use.html
git diff --check
```

Expected: every command exits 0; the diff check prints nothing.

- [ ] **Step 4: Preview both pages**

Run `python3 -m http.server 4173`, then open both HTML URLs. At approximately 1440px and 390px widths verify:

- header, icon, navigation, title, body, and footer are visible;
- no text clips or overflows;
- the paper card remains readable over the orchard background;
- current-page navigation states are correct;
- keyboard focus is visible;
- each cross-link opens the other page;
- no remote script, font, style, or image request appears.

- [ ] **Step 5: Re-run final checks after any correction**

```bash
npm test
git diff --check
git status --short
```

Expected: 7 tests pass and only intended site files are changed.

- [ ] **Step 6: Commit final validation**

```bash
git add privacy-policy.html terms-of-use.html styles.css tests/site-contract.test.mjs
git commit -m "test: validate legal site publishing safety"
```
