# Changelog

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
