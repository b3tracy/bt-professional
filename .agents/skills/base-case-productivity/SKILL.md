---
name: base-case-productivity
description: >
  Use when building or restyling any of Ben's apps so the UI matches the "Base Case
  Productivity" design system — dark-first, single sage accent, Figtree + DM Sans, dense
  productivity layout. Invoke at the START of any task that scaffolds a new app, adds a
  page, or touches styling, colors, fonts, buttons, tables, lists, modals or layout.
---

# Base Case Productivity

The design system lives at https://github.com/b3tracy/bt-professional and installs as the
package `@b3tracy/base-case-productivity`.
Never invent a visual language for Ben's apps — install this one.

## Step 1 — install (skip if already a dependency)

```bash
npm i "github:b3tracy/bt-professional#semver:^1.0.0"
```

No `next.config.mjs` change is needed: the package builds itself on install and ships
pre-compiled ESM with `'use client'` directives intact. Do not add `transpilePackages`.

## Step 2 — wire up the stylesheet

It must be imported **before** any app CSS, so tokens are defined first and app rules still
win the cascade.

Next.js App Router — `app/layout.js` (Vite: same lines at the top of `src/main.jsx`):

```js
import '@b3tracy/base-case-productivity/fonts.css';
import '@b3tracy/base-case-productivity/styles.css';
import './globals.css';
```

Skip `fonts.css` only if you set up `next/font/google` for Figtree + DM Sans instead.

## Step 3 — read the tokens before writing any styles

```bash
cat node_modules/@b3tracy/base-case-productivity/tokens.json
# or, with nothing installed:
curl -s https://cdn.jsdelivr.net/gh/b3tracy/bt-professional@latest/tokens.json
```

`tokens.json` lists every custom property with its dark value, light value and intended
usage, plus the class and component inventories. Live rendering:
https://b3tracy.github.io/bt-professional/

## Step 4 — build UI out of what already exists

```js
import { PageShell, HeaderBar, SearchBar, ViewToggle, StatPill, FilterBar, FilterSelect,
         SortControls, SortArrow, ListGroupHeader, HintText, EmptyDetail, Field,
         RequiredField, WebsiteField, UndoToastStack, ColumnPicker, InteractionLog,
         AuthCard, PrimaryButton, LinkButton, ErrorText } from '@b3tracy/base-case-productivity';
import { useIsMobile, usePersistentState, usePaneResize, useColumnWidths, useColumnPicker,
         useUndoableDelete, useUndoShortcut } from '@b3tracy/base-case-productivity/hooks';
```

Escalation order for anything not covered: existing global class (`.btn`, `.btn-ghost`,
`.btn-danger`, `.stat-pill`, `.section`, `.fields-grid`/`.field`, `.list-item`, `.li-badge`,
`.note-*`, `.modal*`) → inline `style` using `var(--token)`. Never a hardcoded hex, never a
new font, never Tailwind, never MUI/Chakra/Radix.

## Non-negotiables

- Dark by default; `.theme-light` only on the main content wrapper, never the sidebar.
- Exactly one accent hue (`--accent: #599673`), used sparingly.
- Figtree for headings, DM Sans for body, 12.5px base.
- Dense: 28–32px controls, radii 6/8/10px.
- `'use client'` on any file of your own that uses hooks, state or browser APIs.

## If a component is missing

Build it in the app first, matching the conventions above. If it turns out generic (no
app-specific data or copy), propose adding it to the design-system repo — do not silently
fork the design system.
