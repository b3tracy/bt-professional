// "BT Professional" — the design system shared by every one of Ben's apps.
// This file is the machine-readable copy of the tokens declared in
// styles/bt-professional.css; docs/ renders both and flags any token whose computed
// value has drifted from the value declared here. `npm run tokens` regenerates
// tokens.json from this file and fails if a token is missing from the stylesheet.

export const THEME_NAME = 'BT Professional';
export const THEME_VERSION = '1.1.0';
export const THEME_DESCRIPTION =
  'Dense, low-chrome productivity UI: near-black depth hierarchy, a single muted sage accent, ' +
  'Figtree for display type and DM Sans for everything else, small radii and 28-32px controls.';

export const FONTS = {
  display: {
    family: 'Figtree',
    stack: "'Figtree', sans-serif",
    weights: [400, 500, 600, 700, 800],
    usage: 'Logo, modal titles — anything that should read as a heading.',
  },
  body: {
    family: 'DM Sans',
    stack: "'DM Sans', sans-serif",
    weights: [300, 400, 500, 600],
    usage: 'Body copy, labels, buttons, inputs, tables — the default for the whole app.',
  },
  import:
    "@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');",
  baseSize: '12.5px',
};

// Groups mirror the comment blocks in styles/bt-professional.css so the styleguide can render
// them in the same order the stylesheet declares them.
export const COLOR_GROUPS = [
  {
    name: 'Depth hierarchy',
    note: 'Sidebar is the darkest layer, then the page, then cards stacked on top.',
    tokens: [
      { token: '--bg', dark: '#11151A', light: '#F1F2F4', usage: 'Main page surface' },
      { token: '--surface', dark: '#0C0E12', light: '#FFFFFF', usage: 'Sidebar / modals' },
      { token: '--surface2', dark: '#171B21', light: '#FFFFFF', usage: 'Cards and panels' },
      { token: '--surface3', dark: '#1C2028', light: '#D8DBE0', usage: 'Elevated cards, active rows' },
      { token: '--surface-hover', dark: '#1A1F26', light: '#E4E6EA', usage: 'Row / list hover' },
      { token: '--surface-deep', dark: '#13171E', light: '#EEEFF2', usage: 'Popovers and menus' },
    ],
  },
  {
    name: 'Borders',
    tokens: [
      { token: '--border', dark: '#232830', light: '#D7D9DC', usage: 'Default 1px border' },
      { token: '--border-soft', dark: '#1E2329', light: '#E3E5E8', usage: 'Internal dividers' },
    ],
  },
  {
    name: 'Accent',
    note: 'One muted sage green, used sparingly — primary buttons, links, focus rings.',
    tokens: [
      { token: '--accent', dark: '#599673', light: '#599673', usage: 'Primary action' },
      { token: '--accent-dim', dark: '#4a7d60', light: '#4a7d60', usage: 'Hover / pressed' },
      { token: '--accent-soft', dark: 'rgba(89,150,115,0.10)', light: 'rgba(89,150,115,0.10)', usage: 'Active filter background' },
      { token: '--accent-hover', dark: 'rgba(89,150,115,0.12)', light: 'rgba(89,150,115,0.12)', usage: 'Subtle hover wash' },
    ],
  },
  {
    name: 'Text scale',
    tokens: [
      { token: '--text', dark: '#cfd4d0', light: '#17191B', usage: 'Primary copy' },
      { token: '--text-muted', dark: '#7e8b84', light: '#52565C', usage: 'Secondary copy, section titles' },
      { token: '--text-dim', dark: '#4a5568', light: '#82868D', usage: 'Labels, metadata, placeholders' },
    ],
  },
  {
    name: 'Semantic',
    note: 'Desaturated hues so status colors never outshout the accent.',
    tokens: [
      { token: '--green', dark: '#599673', light: '#599673', usage: 'Positive / in person' },
      { token: '--red', dark: '#d16c6c', light: '#d16c6c', usage: 'Destructive, missing data' },
      { token: '--blue', dark: '#7a9ab5', light: '#7a9ab5', usage: 'Informational / call' },
      { token: '--purple', dark: '#9b8ec4', light: '#9b8ec4', usage: 'In-progress states' },
      { token: '--tan', dark: '#b4966a', light: '#b4966a', usage: 'Email tag' },
      { token: '--gold', dark: '#c4a97a', light: '#c4a97a', usage: 'Charts' },
    ],
  },
  {
    name: 'Badges',
    note: 'Status pill pairs, desaturated like the semantic hues so status never outshouts the accent. Theme-aware: a pill sits on a card, so the light theme is a pale tint with darker text rather than the dark theme inverted. Every pair meets WCAG AA (4.5:1) for small text, the smallest being 4.65:1 — check any replacement before shipping it.',
    tokens: [
      { token: '--badge-slate-bg', dark: '#1b2128', light: '#E7EAEE', usage: 'Neutral / not started — pill background' },
      { token: '--badge-slate-fg', dark: '#93A1B0', light: '#455160', usage: 'Neutral / not started — pill text' },
      { token: '--badge-blue-bg', dark: '#182530', light: '#E2EAF0', usage: 'Informational, early stage — pill background' },
      { token: '--badge-blue-fg', dark: '#7a9ab5', light: '#3A5570', usage: 'Informational, early stage — pill text' },
      { token: '--badge-indigo-bg', dark: '#1c2233', light: '#E4E7F0', usage: 'Between blue and violet in a sequence — pill background' },
      { token: '--badge-indigo-fg', dark: '#8994B8', light: '#414B70', usage: 'Between blue and violet in a sequence — pill text' },
      { token: '--badge-violet-bg', dark: '#221f33', light: '#E8E5F1', usage: 'In progress — pill background' },
      { token: '--badge-violet-fg', dark: '#9b8ec4', light: '#544A75', usage: 'In progress — pill text' },
      { token: '--badge-purple-bg', dark: '#271f33', light: '#EBE4F2', usage: 'In progress, later than violet — pill background' },
      { token: '--badge-purple-fg', dark: '#A98EC4', light: '#5E4478', usage: 'In progress, later than violet — pill text' },
      { token: '--badge-tan-bg', dark: '#2a2317', light: '#F0E9DD', usage: 'Awaiting a counterparty — pill background' },
      { token: '--badge-tan-fg', dark: '#b4966a', light: '#6B5227', usage: 'Awaiting a counterparty — pill text' },
      { token: '--badge-teal-bg', dark: '#14262a', light: '#DEEBE9', usage: 'Near-complete — pill background' },
      { token: '--badge-teal-fg', dark: '#6BB3AC', light: '#265E58', usage: 'Near-complete — pill text' },
      { token: '--badge-green-bg', dark: '#16251c', light: '#E1EDE5', usage: 'Complete / positive — pill background' },
      { token: '--badge-green-fg', dark: '#6FAF8A', light: '#2C6046', usage: 'Complete / positive — pill text' },
      { token: '--badge-red-bg', dark: '#2b1e1e', light: '#F3E2E2', usage: 'Lost / failed — pill background' },
      { token: '--badge-red-fg', dark: '#d16c6c', light: '#8E3131', usage: 'Lost / failed — pill text' },
      { token: '--badge-grey-bg', dark: '#212326', light: '#E8E9EB', usage: 'Inactive / archived — pill background' },
      { token: '--badge-grey-fg', dark: '#9CA3AF', light: '#4E535A', usage: 'Inactive / archived — pill text' },
    ],
  },
  {
    name: 'Sidebar',
    note: 'Always dark — the sidebar opts out of .theme-light.',
    tokens: [
      { token: '--sidebar-text', dark: '#E6EAE7', light: '#E6EAE7', usage: 'Sidebar copy' },
      { token: '--sidebar-text-dim', dark: '#A9B1AC', light: '#A9B1AC', usage: 'Inactive nav item' },
      { token: '--sidebar-item-hover', dark: '#262C2A', light: '#262C2A', usage: 'Nav hover' },
    ],
  },
  {
    name: 'Tables',
    tokens: [
      { token: '--table-header', dark: '#1D2129', light: '#E9EAED', usage: 'Sticky header row' },
      { token: '--table-header-border', dark: '#2e3440', light: '#D2D4D8', usage: 'Header underline' },
      { token: '--row-even', dark: '#13161B', light: '#FFFFFF', usage: 'Zebra striping' },
      { token: '--row-odd', dark: '#161A20', light: '#F6F7F8', usage: 'Zebra striping' },
    ],
  },
];

export const RADII = [
  { token: '--radius-sm', value: '6px', usage: 'Inputs, selects, small buttons' },
  { token: '--radius', value: '8px', usage: 'Buttons, cards' },
  { token: '--radius-lg', value: '10px', usage: 'Modals' },
];

export const LAYOUT = {
  sidebarWidth: { token: '--sidebar-w', value: '188px' },
  mobileBreakpoint: '768px',
  controlHeights: { pill: 28, button: 30, input: 32, authInput: 36 },
  density: 'Table rows 7px vertical padding, list items 9px — the UI is deliberately dense.',
};

export const STYLESHEETS = [
  { specifier: '@b3tracy/bt-professional/styles.css', usage: 'Tokens, resets and global classes. Import before any app CSS.' },
  { specifier: '@b3tracy/bt-professional/fonts.css', usage: 'Google Fonts import for Figtree + DM Sans. Skip it if you use next/font.' },
];

// Classes that live in styles/bt-professional.css; components below assume they are present.
export const CSS_CLASSES = [
  { name: '.btn', usage: 'Primary button (accent fill, 30px tall)' },
  { name: '.btn-ghost', usage: 'Secondary button (border only, accent on hover)' },
  { name: '.btn-danger', usage: 'Destructive text button' },
  { name: '.stat-pill', usage: 'Inline count chip in headers' },
  { name: '.section / .section-title', usage: 'Detail-pane section with uppercase title' },
  { name: '.fields-grid / .field', usage: 'Auto-fill label+value grid' },
  { name: '.list-item / .li-name / .li-meta / .li-date', usage: 'Master list rows' },
  { name: '.note-entry / .note-date / .note-text / .note-tag', usage: 'Interaction log entries' },
  { name: '.li-badge + .badge-*', usage: 'Status badges' },
  { name: '.modal-overlay / .modal / .modal-grid / .modal-field', usage: 'Centered form modal' },
  { name: '.theme-light', usage: 'Light content theme; apply to the main content wrapper, not the sidebar' },
];

// Reusable building blocks published with the theme, so a new app can copy the
// files rather than re-deriving the patterns.
export const COMPONENTS = [
  { name: 'PageShell / HeaderBar / SearchBar', file: 'src/components/Toolbar.js', import: '@b3tracy/bt-professional', usage: 'Full-height page frame with a search + actions header' },
  { name: 'ViewToggle / StatPill', file: 'src/components/Toolbar.js', import: '@b3tracy/bt-professional', usage: 'Table↔profile switch and inline counts' },
  { name: 'FilterBar / FilterSelect / SortControls / SortArrow', file: 'src/components/Toolbar.js', import: '@b3tracy/bt-professional', usage: 'Filter and sort chrome; selects highlight when active' },
  { name: 'ListGroupHeader / HintText / EmptyDetail', file: 'src/components/Toolbar.js', import: '@b3tracy/bt-professional', usage: 'List dividers, loading/empty copy, empty detail pane' },
  { name: 'Field / RequiredField / WebsiteField', file: 'src/components/Field.js', import: '@b3tracy/bt-professional', usage: 'Label+value display; required flags missing data in red' },
  { name: 'InteractionLog', file: 'src/components/InteractionLog.js', import: '@b3tracy/bt-professional', usage: 'Dated note list with inline edit and an add form; pass `methods` to relabel the tags' },
  { name: 'ColumnPicker', file: 'src/components/ColumnPicker.js', import: '@b3tracy/bt-professional', usage: 'Right-click column visibility menu' },
  { name: 'UndoToastStack', file: 'src/components/UndoToast.js', import: '@b3tracy/bt-professional', usage: 'Bottom-center undo toasts for deferred deletes' },
  { name: 'AuthCard / PrimaryButton / LinkButton / ErrorText', file: 'src/components/AuthCard.js', import: '@b3tracy/bt-professional', usage: '360px centered auth card and its controls; `brand` and `tagline` are props' },
  { name: 'useIsMobile / usePersistentState / usePaneResize / useColumnWidths / useColumnPicker / useUndoableDelete / useUndoShortcut', file: 'src/lib/hooks.js', import: '@b3tracy/bt-professional/hooks', usage: 'Behavior behind the components above' },
];

export function themeJson() {
  return {
    name: THEME_NAME,
    version: THEME_VERSION,
    description: THEME_DESCRIPTION,
    package: '@b3tracy/bt-professional',
    install: 'npm i "github:b3tracy/bt-professional#semver:^1.0.0"',
    docs: 'https://b3tracy.github.io/bt-professional/',
    fonts: FONTS,
    colors: COLOR_GROUPS,
    radii: RADII,
    layout: LAYOUT,
    stylesheets: STYLESHEETS,
    cssClasses: CSS_CLASSES,
    components: COMPONENTS,
    css: themeCss(),
  };
}

// The :root / .theme-light custom property block, ready to paste into a new
// app's stylesheet.
export function themeCss() {
  const decls = (mode) => COLOR_GROUPS
    .flatMap(g => g.tokens.map(t => `  ${t.token}: ${t[mode]};`))
    .join('\n');
  const radii = RADII.map(r => `  ${r.token}: ${r.value};`).join('\n');
  return [
    FONTS.import,
    '',
    ':root {',
    decls('dark'),
    radii,
    `  ${LAYOUT.sidebarWidth.token}: ${LAYOUT.sidebarWidth.value};`,
    '}',
    '',
    '.theme-light {',
    decls('light'),
    '}',
  ].join('\n');
}
