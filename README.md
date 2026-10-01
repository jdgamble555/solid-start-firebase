# SolidStart

This app ports the [Qwik City Firebase todo example](https://code.build/p/P2rX5i/qwik-city-todo-app-with-firebase.ai.md)
to SolidStart: Google sign-in, shared reactive auth state, per-user realtime
todos, and a server-loaded About page validated with Valibot.

## Firebase setup

1. Copy `.env.example` to `.env` and replace the JSON with your Firebase web
   app configuration. Keep the `VITE_PUBLIC_FIREBASE_CONFIG` variable name;
   Vite exposes this public web configuration to the browser. Never put
   service-account credentials in it.
2. Enable Google in Firebase Authentication and add your local and deployed
   hostnames to its authorized domains.
3. Create a Firestore database. Publish the supplied `firestore.rules` and
   create the composite `todos` index on `uid` ascending and `createdAt`
   ascending from `firestore.indexes.json`. These files are setup artifacts;
   building this app does not deploy them. You can create the index through
   the Firebase console; a missing-index error also includes a creation link.
4. Create `about/ZlNJrKd6LcATycPRmBPA` with string fields `name` and
   `description` through the Firebase console. This document is publicly
   readable so the server can load it using Firestore Lite. Writes are denied
   by the supplied client rules.

Todos contain `uid`, `text`, `complete`, and `createdAt` (server timestamp).
Completion changes also set `updatedAt`. If you have documents from this
app's previous implementation, copy their `created` timestamps to `createdAt`
before using this version: Firestore's `orderBy('createdAt')` excludes
documents without that field.

The Firebase auth listener starts in a browser effect. Solid context shares the auth
store; an effect reconnects the todo listener when the user changes and
cleans up on sign-out or unmount. The About route uses a SolidStart server
query and a separate named Firebase app with Firestore Lite, keeping the
server read separate from the browser's realtime Firestore client.

Everything you need to build a Solid project, powered by [`solid-start`](https://start.solidjs.com);

## Creating a project

```bash
# create a new project in the current directory
npm init solid@latest

# create a new project in my-app
npm init solid@latest my-app
```

## Developing

Use Node.js 24 or newer. This project uses SolidStart 2, Vite 8, and Nitro 3.

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Local development uses Nitro's Node worker runner. No Vercel CLI login,
`vercel env pull`, or `VERCEL_OIDC_TOKEN` is required. Keep local application
environment variables in `.env`.

## Building

Solid apps are built with _presets_, which optimise your project for deployment to different environments.

`npm run build` generates Vercel deployment output in `.vercel/output`, using the
`vercel` preset in `vite.config.ts`. This replaces the old `vercel-edge` preset;
the server now runs as a Vercel Function. Configure Node.js 24 on Vercel.
Push changes to GitHub as usual; Vercel's GitHub integration builds and deploys
them. Set deployment environment variables in the Vercel project settings.

Use `npm run preview` (or `npm start`) to check a production build locally.
These commands are local preview servers, not production deployment commands.
Run `npm run typecheck` to check TypeScript.

The Nitro 3 dependency is pinned to its current beta release because SolidStart 2
uses Nitro's Vite integration for deployment.

Firestore currently requests an older gRPC version. The scoped override in
`package.json` selects patched `@grpc/grpc-js` 1.14.5 or newer until Firebase
updates that dependency.

## This project was created with the [Solid CLI](https://solid-cli.netlify.app)
