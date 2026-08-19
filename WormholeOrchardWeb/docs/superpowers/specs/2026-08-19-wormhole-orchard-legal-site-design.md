# Wormhole Orchard Legal Site Design

## Goal

Create a small English-language legal website for the Roku game **Wormhole Orchard**. The site will be suitable for GitHub Pages and will provide the two URLs requested by the Roku publishing workflow: a privacy policy and terms of use.

## Scope

The project will contain:

- `privacy-policy.html`
- `terms-of-use.html`
- `styles.css`
- `assets/orchard-background.jpg`
- `assets/channel-icon.png`

There will be no marketing homepage, application framework, build step, server code, form, JavaScript, cookies, analytics, external font request, or third-party runtime dependency.

## Visual Design

Both pages will share one responsive stylesheet. The presentation will match the game rather than the dark Sky Strike theme:

- bright orchard artwork from the existing Wormhole Orchard project;
- a readable cream paper panel with a restrained wood-toned border;
- deep orchard green headings and apple-red interactive accents;
- the Wormhole Orchard channel icon beside the page identity;
- a compact top navigation linking the two legal pages;
- a single-column reading width suitable for desktop, tablet, and mobile;
- visible keyboard focus, sufficient contrast, semantic headings, and reduced-motion-safe decoration.

All image and page references will use relative paths so the folder can be published directly with GitHub Pages.

## Privacy Policy Content

The privacy policy will be effective **August 19, 2026** and will accurately describe the current Roku package:

- Wormhole Orchard does not require an account.
- The game does not collect, transmit, sell, or share personal information.
- The game contains no advertising, analytics, telemetry, or tracking SDK.
- The game stores only local Roku registry data: completed levels, highest unlocked level, last played level, music and sound-effect preferences, and completed tutorial prompts.
- Local data can be reset inside the game and may also be removed when the channel is uninstalled or the Roku device is reset.
- Static QR codes shown by the game may lead users, on a separate mobile device, to Google Play or the Apple App Store. Those services operate under their own privacy policies; Wormhole Orchard does not receive information from the scan.
- Roku may process platform-level information under Roku's own policy, independently of the game publisher.
- Questions may be sent through the publisher contact listed on the game's Roku Streaming Store page.

The policy will not claim compliance certifications or legal guarantees that have not been established.

## Terms of Use Content

The terms will be effective **August 19, 2026** and will cover:

- acceptance through installing or using the game;
- a limited personal, non-commercial, non-exclusive, non-transferable, revocable license;
- prohibited redistribution, resale, abusive use, interference, and reverse engineering except where applicable law permits;
- local level progress and settings as non-transferable gameplay data with no cash value;
- possible loss of local progress after reset, uninstall, device reset, corruption, or platform changes;
- ownership or licensing of the game's software, artwork, audio, design, and other content;
- updates, compatibility, availability, suspension, and discontinuation;
- an as-is disclaimer and a limitation of liability, each limited by applicable law;
- separation from Roku and third-party app-store terms;
- policy updates and publisher contact through the Roku Streaming Store listing.

The privacy policy and terms will link to each other.

## Validation

Before delivery:

1. Parse both pages as HTML and verify the expected document titles, language, headings, and cross-links.
2. Check every local link and asset path for missing files.
3. Search the public HTML and stylesheet files for accidental references to Sky Strike and remove them.
4. Confirm there are no scripts, trackers, remote assets, cookies, forms, or placeholder text.
5. Preview both pages locally at desktop and narrow mobile widths and correct any clipping or unreadable layout.
6. Confirm the project is directly publishable as a static GitHub Pages folder.

## Legal Boundary

The pages will be tailored to the verified behavior of the current Wormhole Orchard codebase and the Roku publishing fields. They are practical publisher-facing drafts, not a substitute for advice from a qualified lawyer for any particular jurisdiction.
