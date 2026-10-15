# Ballot Paper — Interactive Election Demo

Animated, responsive, frontend-only digital ballot demonstration inspired by the supplied concept. Five ballot cards, animated red Swastik ink stamp, simulated results, and demo reset.

> This is a **simulation**, not a secure election system. No authenticated voters, server storage, or real votes. Results are mock data and client-side only.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Customize

Edit `src/data.js` to update the candidate names, symbols, and starting counts. The interface is a React + Vite project with CSS animations. Backend integration is intentionally deferred.
