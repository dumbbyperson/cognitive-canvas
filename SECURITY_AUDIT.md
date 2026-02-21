# Security Audit — Cognitive Canvas

**Date:** 2026-02-21  
**Scope:** Full codebase (front-end React app, scripts, config, CI).

---

## Executive summary

The project is a **static Vite + React portfolio** with no backend, no auth, and no use of env-based secrets. Risk is low. A few hardening changes were applied; the rest are recommendations for production and future changes.

---

## 1. Findings and status

### 1.1 Addressed in code

| Issue | Location | Fix |
|-------|----------|-----|
| **Unvalidated URLs in links** | `CertificationsSection.tsx` — `credentialUrl` from JSON used in `<a href>` | Added `isSafeCredentialUrl()` so only `https://` and relative (`/`) URLs are used. Prevents `javascript:`, `data:`, etc. if `certifications.json` is ever from an untrusted source. |
| **Unsafe localStorage parse** | `EasterEggSystem.tsx` — `JSON.parse(localStorage.getItem('easterEggs'))` | Wrapped in try/catch and validate that parsed value is an array of strings before `setFoundEggs()`. Avoids crashes on corrupted or malicious localStorage. |

### 1.2 No action required (verified safe)

| Area | Notes |
|------|--------|
| **Secrets / env** | No `process.env` or `import.meta.env` usage; no `.env` in repo. |
| **Target="_blank"** | `CertificationsSection` and `StickyContactButton` use `rel="noopener noreferrer"` with `target="_blank"`. Hero/Footer external links do not use `target="_blank"` (same-tab navigation). |
| **dangerouslySetInnerHTML** | `src/components/ui/chart.tsx`: used only to inject CSS from fixed `THEMES` and chart config. No user or remote input. Chart config is not used from fetched JSON. |
| **Fetch** | Only `fetch('/data/certifications.json')` (same-origin static file). No external APIs or credentials. |
| **Auth / tokens** | None. Contact is mailto and static links. |
| **GitHub Actions** | `deploy.yml` uses standard actions; no secrets in `env`; only `CI: false` for build. |
| **Dependencies** | Standard React/Radix/Vite stack. Run `npm audit` regularly and before release. |

### 1.3 Recommendations (no code change or optional)

| Recommendation | Details |
|----------------|---------|
| **Content Security Policy (CSP)** | `index.html` has no CSP. For GitHub Pages you cannot set custom HTTP headers; consider a meta CSP if you move to a host that allows it, or use a proxy that adds headers. |
| **404 logging** | `NotFound.tsx` logs `location.pathname` with `console.error`. Harmless but noisy in production; consider removing or gating on `import.meta.env.DEV`. |
| **Console messages** | `EasterEggSystem.tsx` logs playful dev messages. Safe; remove or gate in production if you want a clean console. |
| **Sync script path** | `scripts/sync-linkedin-certs.js` takes a path from `process.argv[2]` and reads that path. For local use only. If ever run in a service, validate the path (e.g. restrict to a known directory) to avoid reading arbitrary files. |
| **Dependency audit** | Run `npm audit` and fix reported vulnerabilities before production. |
| **Future dynamic content** | If you ever load certifications or links from an API or user input, keep validating URLs (e.g. allow only `https:` and relative) and avoid rendering raw HTML from that data. |

---

## 2. Data and privacy

- **PII:** No collection or sending of PII. Contact form is placeholder (no backend).
- **localStorage:** Only easter-egg IDs (e.g. `['konami','name-click']`); no sensitive data.
- **Static data:** `public/data/certifications.json` and in-code defaults contain public credential/badge URLs and course info; no secrets.

---

## 3. Summary

- **Vulnerabilities:** No critical or high-severity issues found. Two defensive improvements were applied: URL validation for certification links and safe parsing of easter-egg localStorage.
- **Production readiness:** Safe to ship from a security perspective, with dependency audit and optional CSP/console cleanup as follow-ups.
