# Gamura — Changelog

All notable changes to the Gamura web ecosystem and Google Play Store TWA (Trusted Web Activity) release will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0-pwa] - 2026-11-08

### Added
- **Web App Manifest (`public/manifest.json`)**:
  - Configured application name `Gamura`, standalone display mode, orientation `portrait`.
  - Brand colors: theme `#10b981` (emerald) and background `#0f172a` (slate 900).
  - Integrated 192x192 and 512x512 high-resolution PNG icons and Android maskable safe-zone icon (`/icons/maskable-512.png`).
  - Added start URL `/?source=pwa` and category tags (`games`, `entertainment`, `productivity`).
- **Service Worker (`public/sw.js`)**:
  - Implemented versioned cache (`gamura-v1`) with instant update hooks (`skipWaiting`, `clients.claim`).
  - Added navigation fallback to offline page and runtime asset caching.
- **Offline Fallback Page (`public/offline.html`)**:
  - Styled branded offline experience with connection status badge and retry button.
- **Domain Verification (`public/.well-known/assetlinks.json`)**:
  - Established Digital Asset Links template for package `com.gamura.app` with placeholder for Google Play App Signing SHA-256 certificate fingerprint.
- **Vercel Server Headers (`vercel.json`)**:
  - Forced `Content-Type: application/json` and CORS headers for `/.well-known/assetlinks.json`.
- **Legal & Google Play Compliance**:
  - Created `/privacy` page detailing data collection, Firebase Authentication, third parties, user rights, and children's privacy.
  - Created `/terms` page defining acceptable use, user accounts, and intellectual property.
  - Created `/delete-account` self-service deletion portal allowing users to request instant purge of their Firebase Auth user credentials and Firestore database records.
- **PWA Meta Tags & Installation**:
  - Added mobile viewport, `theme-color`, `apple-touch-icon`, and manifest links to `index.html`.
  - Added interactive in-app PWA install button (`PWAInstallButton`) with Android prompt and iOS Safari instructions.
  - Added real-time offline status pill indicator.
- **Documentation**:
  - Created `PLAY_STORE_CHECKLIST.md` tracking all 5 launch phases (PWA builder, Play Console registration, 14-day 12-tester closed test, and production review).

### Changed
- Refined navigation bar and footer to link directly to Privacy Policy, Terms of Service, and Account Deletion pages.
- Preserved all portfolio and ecosystem showcase features.
