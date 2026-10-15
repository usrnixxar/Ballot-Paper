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


## Separate admin backend integration

Backend source: https://github.com/usrnixxar/Ballet-backend

To enable *real* verified voting, live candidate updates and visitor analytics:
1. Deploy the backend as a persistent Node.js server with a PostgreSQL database.
2. Configure `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, SMTP settings and permitted `FRONTEND_ORIGIN` in the backend host's private environment variables.
3. Run backend `schema.sql` once to create the tables.
4. In the frontend hosting environment, set `VITE_API_URL` to the full HTTPS backend origin (no slash at the end).
5. Redeploy the frontend. Its forms will require email OTP and the counts will be taken from the backend. Admin dashboard is at `https://YOUR-BACKEND/admin`.

**Important:** Without `VITE_API_URL` the current frontend remains a local demonstration. It does not save votes server-side. No official election or government affiliation is implied.
