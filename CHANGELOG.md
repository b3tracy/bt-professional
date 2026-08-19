# Changelog

## 2.0.0

Badge hues are rebuilt for distinguishability. **Breaking:** `--badge-indigo-*`,
`--badge-purple-*` and `--badge-tan-*` are gone, replaced by `--badge-sky-*`,
`--badge-magenta-*` and `--badge-amber-*`.

1.1.0 kept the badges in the desaturated semantic register, and at pill sizes that failed
its own purpose: the closest pairs measured 0.014 in OKLab, at or below the just-noticeable
threshold. Slate and grey were indistinguishable, so were violet and purple, and blue and
indigo. Ten statuses that cannot be told apart are not ten statuses.

- Hues are spread around the wheel instead of clustered - four crowded blue-purples become
  sky, blue, violet and magenta.
- Chroma roughly doubles (mean 0.067 to 0.132). `AGENTS.md` now records this as a
  deliberate exception to the desaturation rule, with the reasoning, so it does not get
  quietly reverted.
- The two neutrals are separated by lightness rather than hue, since neither has one.
- Closest pair goes from 0.014 to 0.066, and worst contrast *improves* from 4.65:1 to
  5.20:1 - more colourful and more readable, not a trade.

`.badge-exploring/-applied/-interviewing/-offer/-passed` keep their hues (blue, green,
violet, teal, red all survive) and need no change, but they will look more vivid.

## 1.1.0

Status badge colors are now tokens, and theme-aware.

- New `Badges` token group: `--badge-<hue>-bg` / `--badge-<hue>-fg` for ten hues (slate,
  blue, indigo, violet, purple, tan, teal, green, red, grey). Desaturated in the same
  register as the semantic hues, so status still never outshouts the accent.
- The light theme is a pale tint with darker text rather than the dark values inverted. A
  badge sits on a card, and inverting a dark pill onto a white card is what made the old
  ones unreadable.
- `.badge-exploring`, `-applied`, `-interviewing`, `-offer` and `-passed` now draw from
  these tokens. Each keeps its hue. They previously paired a 12% tint with the semantic
  token as text, which measured 2.6-3.1:1 on a white card - below WCAG AA, and at 10px.
- Every pair now meets AA (4.5:1) in both themes; the smallest is 4.65:1.

## 1.0.0

Initial extraction from `b3tracy/bft-dashboard`: design tokens, `styles/bt-professional.css`,
the Toolbar kit, `Field`, `InteractionLog`, `ColumnPicker`, `UndoToastStack`, `AuthCard`,
hooks and utilities, plus the style guide (`docs/`) and the agent layer (`AGENTS.md`,
`SKILL.md`, `registry.json`, `tokens.json`).

Changes from the dashboard versions:
- `AuthCard` takes `brand` / `tagline` props instead of hardcoding "BFT / PERSONAL DASHBOARD".
- `InteractionLog` takes `methods` / `title` / `addLabel` / `placeholder` props; the CRM
  interaction methods remain the default.
- The Google Fonts `@import` moved out of the main stylesheet into `styles/fonts.css`.
