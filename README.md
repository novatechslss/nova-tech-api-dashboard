# NOVA TECH API

A premium React dashboard for browsing, testing, and documenting public APIs.

## Features

- 20 API modules with dedicated pages
- Real request execution using Fetch API
- Health checks with timeout and CORS awareness
- Local per-session request statistics
- REST code generation for cURL, Fetch, and Python
- Responsive dark premium UI

## Install

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- No database or user auth is used.
- All statistics are local browser/session data only.
- Some external APIs may be blocked by CORS or rate limits.

## Deployment

Deploy the produced `dist` folder to any static host such as Vercel, Netlify, or GitHub Pages.
