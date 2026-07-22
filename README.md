# Contacts Management

A responsive Angular contacts application. It loads contacts from a REST API, lets you
search them (by name, phone, or email), and shows a details pane per contact — with loading
skeletons, an empty state, and a mobile‑friendly single‑pane layout that expands to a
two‑pane layout on larger screens.

Built with **Angular 21** (standalone components, signals, control flow), **SCSS**, and
**Tailwind CSS v4**. Contact data is fetched from a hosted **mockapi.io** endpoint (no
backend to run locally).

---

## Prerequisites

Make sure the following are installed:

- **Node.js** `>= 20.19` (or `>= 22.12`) — check with `node --version`
- **npm** `>= 10` (bundled with Node) — check with `npm --version`

> The project pins npm as its package manager (`npm@10.8.2`) and includes a
> `package-lock.json`, so use **npm** (not yarn/pnpm) for reproducible installs.

The Angular CLI is included as a dev dependency, so a global install is **not** required.
Commands below use `npx ng …`; if you prefer a global CLI you can `npm install -g @angular/cli`
and drop the `npx`.

---

## Setup

1. Get the code and move into the project folder:

   ```bash
   git clone <repository-url>
   cd contacts-management
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

That's the entire setup — there is no local database or backend to configure. The app talks
to a preconfigured mock API (see [Configuration](#configuration)).

---

## Running the app

Start the development server:

```bash
npm start
```

(equivalent to `npx ng serve`)

Then open **http://localhost:4200/** in your browser. The app reloads automatically when you
edit source files.

To use a different port:

```bash
npx ng serve --port 4300
```

---

## Configuration

The API base URL lives in the environment files — no other configuration is needed:

- `src/environments/environment.ts` — used for development
- `src/environments/environment.prod.ts` — used for production builds

Both are preconfigured to a hosted mock API:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://6a5fa294b1933e9d25fc8b40.mockapi.io/api/v1'
};
```

To point the app at a different backend, change `apiUrl` in these files. The app calls:

- `GET  /contacts` — the contact list
- `GET  /contacts/:id/email_addresses` — a contact's email addresses (loaded on selection)

---

## Building for production

```bash
npm run build
```

(equivalent to `npx ng build`)

Compiled, optimized artifacts are written to `dist/contacts-management/`. To serve that output
locally for a quick check:

```bash
npx http-server dist/contacts-management/browser -p 8080
```

For a continuous development build that rebuilds on change:

```bash
npm run watch
```

---

## Running tests

Unit tests run on the [Vitest](https://vitest.dev/) runner:

```bash
npm test
```

Run once (no watch mode), e.g. for CI:

```bash
npx ng test --watch=false
```

---

## Project structure

```
src/
├─ app/
│  ├─ core/                      # app-wide singletons
│  │  ├─ api/                    # API endpoint definitions
│  │  ├─ interceptors/           # HTTP interceptor (resolves the API base URL)
│  │  └─ services/               # ContactsApiService (HTTP calls)
│  ├─ shared/
│  │  ├─ components/             # reusable UI (avatar, buttons, social icons)
│  │  └─ models/                 # Contact / ContactEmail types + mock fallback data
│  └─ features/
│     └─ contacts/               # the contacts feature (list + details, lazy-loaded)
├─ assets/svg/                   # SVG icons used across the UI
├─ environments/                 # environment.ts / environment.prod.ts
└─ styles.scss                   # global styles (Tailwind entry)
```

---

## Troubleshooting

- **Port 4200 already in use** — start on another port: `npx ng serve --port 4300`.
- **Contacts don't load** — confirm you have internet access (the API is remote). If it's
  unreachable, the app falls back to a small set of bundled sample contacts and shows a notice.
- **`ng: command not found`** — use `npx ng …`, or install the CLI globally with
  `npm install -g @angular/cli`.
- **Dependency/build errors after pulling changes** — reinstall cleanly:
  `rm -rf node_modules && npm install`.
