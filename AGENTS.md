# AGENTS.md — Base Case Productivity

This repo is a design system, not an app. It holds the canonical tokens, CSS classes and
React components for Ben's ("Base Case") apps. Plain JavaScript + React, no TypeScript,
no test suite, no Tailwind.

## If you are here to USE this design system in another app

Do exactly this, in this order:

1. Install:
   ```bash
   npm i "github:b3tracy/base-case-productivity#semver:^1.0.0"
   ```
   No `next.config.mjs` change is needed — the package builds itself on install (`prepare`)
   and ships pre-compiled ESM with `'use client'` directives intact. Do **not** add
   `transpilePackages` for it.
2. Import the stylesheet **before** any app CSS, so token definitions land first and app
   rules still win the cascade. Next.js App Router — `app/layout.js`:
   ```js
   import '@b3tracy/base-case-productivity/fonts.css';   // omit if you use next/font (see below)
   import '@b3tracy/base-case-productivity/styles.css';
   import './globals.css';
   ```
   Vite / CRA: the same imports at the top of `src/main.jsx`.
3. Import components from the package root, hooks from `/hooks`:
   ```js
   import { PageShell, HeaderBar, SearchBar, StatPill, Field } from '@b3tracy/base-case-productivity';
   import { useIsMobile } from '@b3tracy/base-case-productivity/hooks';
   ```
4. Read `tokens.json` before writing any styles:
   ```bash
   cat node_modules/@b3tracy/base-case-productivity/tokens.json
   # or with nothing installed:
   curl -s https://cdn.jsdelivr.net/gh/b3tracy/base-case-productivity@latest/tokens.json
   ```
   Live rendering of every token, class and component:
   https://b3tracy.github.io/base-case-productivity/

Do NOT re-derive colors, fonts, spacing or radii. Do NOT add Tailwind. Do NOT add another
component library (MUI, Chakra, Radix, shadcn/ui) — this design system replaces them.

## The rules of the look

- **Dark-first.** `:root` is the dark theme. `.theme-light` is an override class applied to
  the main content wrapper only — the sidebar always stays dark.
- **Fonts.** Figtree for headings, logo and modal titles; DM Sans for everything else.
  Base font size 12.5px.
- **One accent:** muted sage `--accent: #599673`. Use it sparingly — primary buttons, links,
  focus rings, active filters. Never introduce a second accent hue.
- **Semantic colors are deliberately desaturated** so status never outshouts the accent:
  `--red #d16c6c`, `--blue #7a9ab5`, `--purple #9b8ec4`, `--tan #b4966a`, `--gold #c4a97a`.
- **Depth hierarchy**, darkest to lightest: `--surface` (sidebar/modals) → `--bg` (page) →
  `--surface2` (cards) → `--surface3` (elevated/active rows).
- **Small radii:** `--radius-sm 6px` (inputs), `--radius 8px` (buttons/cards),
  `--radius-lg 10px` (modals).
- **Dense by design:** controls 28–32px tall, table rows 7px vertical padding, list items 9px.
- **Always** reference colors as `var(--token)`. Never hardcode a hex value in a component.

## How to style something

1. Use an existing component from this package.
2. Then an existing global class: `.btn`, `.btn-ghost`, `.btn-danger`, `.stat-pill`,
   `.section`/`.section-title`, `.fields-grid`/`.field`,
   `.list-item`/`.li-name`/`.li-meta`/`.li-date`, `.li-badge` + `.badge-*`,
   `.note-entry`/`.note-date`/`.note-text`/`.note-tag`,
   `.modal-overlay`/`.modal`/`.modal-grid`/`.modal-field`.
3. Only then an inline `style` object using `var(--token)` values. This codebase uses inline
   styles rather than CSS modules — match that.

## What's in the package

Components (package root): `PageShell`, `HeaderBar`, `SearchBar`, `ViewToggle`, `StatPill`,
`FilterBar`, `FilterSelect`, `SortControls`, `SortArrow`, `ListGroupHeader`, `HintText`,
`EmptyDetail`, `Field`, `RequiredField`, `WebsiteField`, `UndoToastStack`, `ColumnPicker`,
`InteractionLog`, `AuthCard`, `PrimaryButton`, `LinkButton`, `ErrorText`, `authInputStyle`.

Hooks (`/hooks`): `useIsMobile`, `usePersistentState`, `usePaneResize`, `useColumnWidths`,
`useColumnPicker`, `useUndoableDelete`, `useUndoShortcut`.

Utilities: `/format` (dates, `safeUrl`), `/notes` (note sorting + interaction methods),
`/swipe` (touch gestures). Tokens as JS: `/tokens`. Tokens as data: `/tokens.json`.

Two components take app identity through props rather than hardcoding it:
`AuthCard` (`brand`, `tagline`) and `InteractionLog` (`methods`, `title`, `addLabel`,
`placeholder`).

## Fonts: `@import` vs `next/font`

`fonts.css` is a Google Fonts `@import` — framework-agnostic and fine. In a Next.js app you
can instead self-host and avoid the extra round trip: skip `fonts.css` and do

```js
import { Figtree, DM_Sans } from 'next/font/google';
const figtree = Figtree({ subsets: ['latin'], weight: ['400','500','600','700','800'], variable: '--font-figtree' });
const dmSans  = DM_Sans({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-dm-sans' });
// <html className={`${figtree.variable} ${dmSans.variable}`}>
```

The stylesheet references the families by name (`'Figtree'`, `'DM Sans'`), so either
approach works. Pick one — loading both just duplicates the fonts.

## Copy-mode (no dependency)

For apps that shouldn't take a dependency (or aren't React), this repo is also a shadcn
registry:

```bash
npx shadcn@latest add b3tracy/base-case-productivity/conventions   # AGENTS.md + tokens + CSS + skill
npx shadcn@latest add b3tracy/base-case-productivity/toolbar       # just the component source
```

Or link the stylesheet straight off the CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/b3tracy/base-case-productivity@v1.0.0/styles/base-case.css">
```

## If you are here to CHANGE this design system

- `src/tokens.js` is the source of truth for token *values*; `styles/base-case.css` is the
  source of truth for the *cascade*. They must agree — run `npm run tokens` after editing
  either (it regenerates `tokens.json` and fails if a token is missing from the stylesheet).
- Components must stay app-agnostic: no data fetching, no Supabase, no router imports, no
  hardcoded product names. Everything comes in through props.
- Any component or hook using state, effects or browser APIs needs `'use client'` as the
  first line of its own file (not on `src/index.js`) so it keeps working in the App Router.
- Internal imports must use explicit `.js` extensions.
- `npm run build` (esbuild) must pass. There are no tests — verify visually:
  `npm run docs` and open http://localhost:3000.
- Release: `npm version <patch|minor|major> && git push --follow-tags`. Consumers install by
  tag, so an unpushed tag is an unreleased change. Bump `THEME_VERSION` in `src/tokens.js`
  to match and re-run `npm run tokens`.

## Layout

```
src/tokens.js          token values, themeCss(), themeJson()
src/index.js           public barrel
src/components/*.js    React components
src/lib/*.js           hooks + utilities
styles/base-case.css   tokens, resets, global classes
styles/fonts.css       Google Fonts @import
scripts/gen-tokens.mjs tokens.json generator + drift check
tokens.json            generated; the machine-readable contract
registry.json          shadcn registry (copy-mode)
docs/                  the live style guide (Next.js, output: 'export' → GitHub Pages)
```
