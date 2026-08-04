# Game Controller Static Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the framework-heavy website with a lightweight static product site, privacy policy, and user agreement modeled on the clear delivery structure of MirrorCueWeb.

**Architecture:** The root entry redirects to a self-contained `static` site. Privacy and terms have stable top-level redirect paths and English source documents under `static`. A dependency-free Node build copies the validated static files into the hosting output and emits a minimal static-asset worker.

**Tech Stack:** HTML5, CSS, minimal browser JavaScript, Node.js build and tests, Cloudflare-compatible static worker.

## Global Constraints

- English only.
- Preserve the current app icon and use real Game Controller interface captures.
- Do not claim casting, screen mirroring, voice control, or unsupported channel installation.
- Document Local Network, SSDP/ECP, on-device settings, Google Mobile Ads, UMP, ATT, Apple, and Roku relationships accurately.
- Keep `PrivacyPolicy/` and `UserAgreement/` as stable public paths.
- Use a responsive, accessible layout with no provisional links or fabricated contact address.

---

### Task 1: Static product website

**Files:**
- Create: `index.html`
- Create: `static/index.html`
- Create: `static/css/app.css`
- Create: `static/js/app.js`
- Create: `static/images/*`

- [ ] Build a product-first home page with a real interface hero, feature sections, local-network explanation, game mode, FAQ, and legal links.
- [ ] Add responsive desktop, tablet, and mobile layouts.
- [ ] Optimize existing interface captures for web delivery.

### Task 2: Legal pages and stable routes

**Files:**
- Create: `PrivacyPolicy/index.html`
- Create: `UserAgreement/index.html`
- Create: `static/PrivacyPolicy/index.html`
- Create: `static/PrivacyPolicy/en.html`
- Create: `static/UserAgreement/index.html`
- Create: `static/UserAgreement/en.html`
- Create: `static/css/legal.css`

- [ ] Write a complete app-specific privacy policy.
- [ ] Write a complete app-specific user agreement with Apple and Roku disclosures.
- [ ] Add stable redirects and consistent navigation.

### Task 3: Static build and validation

**Files:**
- Create: `scripts/build.mjs`
- Create: `scripts/serve.mjs`
- Create: `tests/static-site.test.mjs`
- Modify: `package.json`
- Modify: `README.md`

- [ ] Add a dependency-free development server and build pipeline.
- [ ] Add tests for required pages, legal disclosures, links, and output files.
- [ ] Build and test the exact static deliverable.
- [ ] Remove obsolete framework-generated source and dependencies after validation.

