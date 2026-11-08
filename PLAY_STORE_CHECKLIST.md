# Gamura — Google Play Store Launch Checklist

Complete launch roadmap and step-by-step instructions for wrapping **Gamura** (https://gamura.vercel.app/) as an Android Trusted Web Activity (TWA) and publishing on Google Play.

---

## Phase 1: PWA Core Verification (Completed in Codebase)
- [x] **Web App Manifest**: `public/manifest.json` configured with name `Gamura`, standalone display, theme `#10b981`, background `#0f172a`.
- [x] **Icons**: Standard 192x192, 512x512, and 512x512 maskable PNG icons generated in `public/icons/`.
- [x] **Service Worker**: `public/sw.js` with versioned cache, auto-updates (`skipWaiting`, `clients.claim`), and offline intercept.
- [x] **Offline Page**: `public/offline.html` styled with Gamura emerald theme.
- [x] **Digital Asset Links**: `public/.well-known/assetlinks.json` template added with `com.gamura.app`.
- [x] **Server Headers**: `vercel.json` serves `assetlinks.json` with `Content-Type: application/json`.
- [x] **Privacy Policy**: `/privacy` live with founder name (Selvaranjan G), email (`selva6ranjan@gmail.com`), Firebase auth disclosures, and third-party details.
- [x] **Terms of Service**: `/terms` live with user responsibilities and acceptable use policy.
- [x] **Account Deletion**: `/delete-account` live offering self-service deletion of Firebase Auth user + Firestore data, satisfying Google Play requirements.
- [x] **In-App Install Prompt**: `PWAInstallButton` mounted in app header/navbar.

---

## Phase 2: Build the Android Package (.aab) via PWABuilder
1. Open [https://www.pwabuilder.com/](https://www.pwabuilder.com/).
2. Enter your live deployment URL: `https://gamura.vercel.app/` and run the audit.
3. Click **Package for Stores** > **Android (Google Play)**.
4. Fill in Package details:
   - **Package ID**: `com.gamura.app`
   - **App Name**: `Gamura`
   - **Launcher Name**: `Gamura`
   - **Version Code**: `1`
   - **Version Name**: `1.0.0`
5. Under **Signing Options**, select **Generate new signing key**.
6. Download the generated `.aab` file and the signing key files (`signing.keystore`, password text file).
   > **CRITICAL**: Store the signing key, alias, and password in a secure cloud drive. If you lose this key, you will never be able to update Gamura on Google Play.

---

## Phase 3: Google Play Console Setup & App Signing Fingerprint
1. Register a Google Play Developer account ($25 one-time fee) at [play.google.com/console](https://play.google.com/console) and complete identity verification.
2. Click **Create app**:
   - **App name**: `Gamura`
   - **Default language**: English (United States)
   - **App or game**: App
   - **Free or paid**: Free
3. Navigate to **Setup** > **App signing**. Confirm Google Play App Signing is enabled.
4. Copy the **SHA-256 certificate fingerprint** from the **App signing key certificate**.
5. Open `public/.well-known/assetlinks.json` in your repository and replace `"PASTE:SHA256:FINGERPRINT:HERE"` with the copied SHA-256 string (e.g. `14:6D:E9:...`).
6. Push changes to GitHub and allow Vercel to redeploy.
7. Verify in your browser by visiting: `https://gamura.vercel.app/.well-known/assetlinks.json`.

---

## Phase 4: Store Listing & Mandatory Policy Forms
Complete all required questionnaires in Google Play Console under **Policy and programs** > **App content**:
- **Privacy Policy**: Provide URL `https://gamura.vercel.app/?page=privacy` (or `https://gamura.vercel.app/privacy`).
- **Account Deletion URL**: Provide URL `https://gamura.vercel.app/?page=delete-account` (or `https://gamura.vercel.app/delete-account`).
- **Data Safety Form**:
  - Does your app collect data? **Yes**.
  - What data? **Name, Email, Profile Picture** (via Firebase Auth / Google Sign-In) and optional **User Content** (saved code/simulated trades).
  - Is data encrypted in transit? **Yes** (HTTPS).
  - Can users request data deletion? **Yes** (link to account deletion page).
- **Target Audience & Content**: Select **13+ or 18+** (Do not target children under 13).
- **Ads Declaration**: Select **No, my app does not contain ads** (or update if AdMob is added).
- **App Access**: Provide test credentials if any portion of Gamura is restricted behind a login.

### Store Listing Creative Assets
- **App Icon**: 512 x 512 PNG, 32-bit color, max 1 MB (use `/icons/icon-512.png`).
- **Feature Graphic**: 1024 x 500 PNG or JPEG (emerald glowing Gamura emblem).
- **Phone Screenshots**: At least 4 screenshots (aspect ratio 16:9 or 9:16, min 320px width).
- **Short Description** (max 80 chars):
  > `Gamura - games, tools and your digital identity in one app.`
- **Full Description** (max 4000 chars):
  Highlight the Gamura ecosystem: games, developer sandbox, code preview, AI interactive chat (BuBuBai), simulated markets (GTrade), and lightning-fast file rollout.

---

## Phase 5: Closed Testing (Mandatory for Personal Accounts)
*Note: Personal developer accounts created after November 13, 2023 must run a closed test with at least 12 opted-in testers for 14 continuous days.*
1. In Play Console, navigate to **Testing** > **Closed testing**.
2. Create a track (e.g. `Alpha` or `Closed Beta`).
3. Create a release and upload your `Gamura.aab` file.
4. Add at least 12 testers via an email list or Google Group.
5. Send testers the opt-in link.
6. Ensure testers install the app, keep it installed for 14 consecutive days, and periodically open and interact with it.
7. Monitor feedback and address any crash reports in Play Console.

---

## Phase 6: Apply for Production Review
1. Once the 14-day closed testing period completes with zero policy violations, click **Apply for production**.
2. Answer the final production readiness questions.
3. Submit for review (standard Google Play review timeline is 2–7 business days).

---

## Phase 7: App Updates & Maintenance
- **Web updates**: Any changes pushed to GitHub and deployed to Vercel go live instantly to Android users without needing a new Play Store upload.
- **Cache release**: When making major web changes, bump `const CACHE = "gamura-v2";` in `public/sw.js`.
- **When a new .aab upload IS required**:
  - Updating app icon, splash screen, or Android permissions.
  - Complying with Google's yearly target API level updates.
  - Increasing `versionCode` (2, 3...) in PWABuilder before building new `.aab`.
