# BT Professional

Design tokens, CSS classes and React components behind Ben's apps: dense, dark-first,
low-chrome productivity UI — one muted sage accent, Figtree + DM Sans, small radii,
28–32px controls.

**Live style guide:** https://b3tracy.github.io/bt-professional/
**Machine-readable tokens:** [`tokens.json`](./tokens.json) ·
[via CDN](https://cdn.jsdelivr.net/gh/b3tracy/bt-professional@latest/tokens.json)
**Working with an AI agent?** Point it at [AGENTS.md](./AGENTS.md).

## Install

```bash
npm i "github:b3tracy/bt-professional#semver:^1.0.0"
```

Installed from this repo, imported as `@b3tracy/bt-professional`.

Plain JS + React, published straight from git tags — no registry, and no build config in the
consuming app: the package compiles itself on install and ships ESM with `'use client'`
preserved, so it works in the Next.js App Router and in Vite without `transpilePackages`.

## Use

```js
// app/layout.js
import '@b3tracy/bt-professional/fonts.css';
import '@b3tracy/bt-professional/styles.css';
import './globals.css';   // your overrides come after
```

```js
// app/page.js
import { PageShell, HeaderBar, StatPill, Field } from '@b3tracy/bt-professional';
import { useIsMobile } from '@b3tracy/bt-professional/hooks';

export default function Page() {
  return (
    <PageShell>
      <HeaderBar title="Contacts"><StatPill label="Total" value={42} /></HeaderBar>
      <Field label="Company" value="Base Case Partners" />
    </PageShell>
  );
}
```

Not a React app? Link the stylesheet and use the custom properties:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/b3tracy/bt-professional@v1.0.0/styles/bt-professional.css">
```

Prefer owning the code (shadcn-style) over a dependency:

```bash
npx shadcn@latest add b3tracy/bt-professional/conventions
npx shadcn@latest add b3tracy/bt-professional/toolbar
```

## What's inside

| | |
|---|---|
| `src/tokens.js` | token values + `themeCss()` / `themeJson()` |
| `styles/bt-professional.css` | `:root` dark theme, `.theme-light`, global classes |
| `styles/fonts.css` | Google Fonts import (skip it if you use `next/font`) |
| `src/components/` | Toolbar kit, Field, InteractionLog, ColumnPicker, UndoToast, AuthCard |
| `src/lib/` | hooks (`useIsMobile`, `usePersistentState`, `usePaneResize`, `useColumnWidths`, `useColumnPicker`, `useUndoableDelete`, `useUndoShortcut`), formatters, note helpers, swipe |
| `tokens.json` | generated contract for tools and agents |
| `docs/` | the style guide, statically exported to GitHub Pages |

## Develop

```bash
npm install          # also builds dist/ via prepare
npm run build        # esbuild: src → dist
npm run tokens       # regenerate tokens.json, fail on token drift
npm run docs         # style guide at http://localhost:3000
```

Release: `npm version <patch|minor|major> && git push --follow-tags`.

MIT.
