'use client';
import { useState } from 'react';
import {
  COLOR_GROUPS, COMPONENTS, CSS_CLASSES, FONTS, LAYOUT, RADII,
  THEME_DESCRIPTION, THEME_NAME, THEME_VERSION, themeCss, themeJson,
} from '@b3tracy/base-case-productivity/tokens';
import { useColumnPicker, useIsMobile, useUndoableDelete } from '@b3tracy/base-case-productivity/hooks';
import {
  authInputStyle, ColumnPicker, EmptyDetail, ErrorText, Field, FilterBar, FilterSelect,
  HeaderBar, HintText, InteractionLog, LinkButton, ListGroupHeader, PrimaryButton,
  RequiredField, SearchBar, SortArrow, SortControls, StatPill, UndoToastStack,
  ViewToggle, WebsiteField,
} from '@b3tracy/base-case-productivity';

const DEMO_COLS = [
  { key: 'Company' }, { key: 'Name' }, { key: 'Industry' },
  { key: 'Function' }, { key: 'Title' }, { key: 'Last Contact' },
];
const DEMO_SORTS = [
  { value: 'company', label: 'Company' },
  { value: 'name', label: 'Name' },
  { value: 'recent', label: 'Last Contact' },
];
const DEMO_NOTES = [
  { id: 1, date: '2026-07-14', in_person: 'Y', text: 'Coffee downtown. Walked through the Q3 roadmap; wants an intro to the platform team.' },
  { id: 2, date: '2026-06-02', in_person: 'C', text: 'Intro call — 20 minutes, mostly background.' },
];
const BADGES = ['Exploring', 'Applied', 'Interviewing', 'Offer', 'Passed'];

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} style={{ padding: '28px 0', borderBottom: '1px solid var(--border-soft)' }}>
      <h2 style={{ fontFamily: "'Figtree', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4, lineHeight: 1.6, maxWidth: 720 }}>{subtitle}</p>}
      <div style={{ marginTop: 18 }}>{children}</div>
    </section>
  );
}

// Every live example sits on a labelled card so the surrounding page chrome is
// never mistaken for part of the component.
function Demo({ label, code, children, padded = true }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
        {code && <code style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{code}</code>}
      </div>
      <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: padded ? 16 : 0, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

// Reads what base-case.css actually resolves each custom property to, so the page
// can flag tokens where src/tokens.js has drifted from the stylesheet.
function readComputedTokens(mode) {
  const probe = document.createElement('div');
  if (mode === 'light') probe.className = 'theme-light';
  document.body.appendChild(probe);
  const style = getComputedStyle(probe);
  const values = Object.fromEntries(
    COLOR_GROUPS.flatMap(g => g.tokens).map(t => [t.token, style.getPropertyValue(t.token).trim()])
  );
  probe.remove();
  return values;
}

// Browsers re-serialize colors (#5996731a vs rgba(...,0.10)), so compare parsed
// channels with a little slack on alpha rather than the raw strings.
function parseColor(value) {
  if (!value) return null;
  const probe = document.createElement('div');
  probe.style.color = value;
  const m = probe.style.color.match(/[\d.]+/g);
  if (!m) return null;
  const [r, g, b, a = '1'] = m;
  return { r: +r, g: +g, b: +b, a: +a };
}

function sameColor(a, b) {
  const x = parseColor(a);
  const y = parseColor(b);
  if (!x || !y) return a === b;
  return x.r === y.r && x.g === y.g && x.b === y.b && Math.abs(x.a - y.a) < 0.02;
}

function Swatch({ entry, mode, computed }) {
  const declared = entry[mode];
  const drifted = computed && !sameColor(computed, declared);

  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '7px 0' }}>
      <div style={{ width: 34, height: 34, borderRadius: 6, flexShrink: 0, background: declared, border: '1px solid var(--border)' }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 12, color: 'var(--text)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{entry.token}</div>
        <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
          {declared}
          {drifted && <span style={{ color: 'var(--red)' }}> · css says {computed}</span>}
          {entry.usage && <span> · {entry.usage}</span>}
        </div>
      </div>
    </div>
  );
}

function CopyButton({ label, getText }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(getText());
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      setDone(false);
    }
  }
  return <button className="btn-ghost" onClick={copy}>{done ? 'Copied ✓' : label}</button>;
}

export default function StyleguidePage() {
  const isMobile = useIsMobile();
  const [mode, setMode] = useState('dark');

  const [search, setSearch] = useState('Renewable');
  const [view, setView] = useState('table');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('company');
  const [sortDir, setSortDir] = useState('asc');
  const [visibleCols, setVisibleCols] = useState(['Company', 'Name', 'Industry', 'Last Contact']);
  const [computedTokens, setComputedTokens] = useState(null);
  const [notes, setNotes] = useState(DEMO_NOTES);
  const [authError, setAuthError] = useState('');
  const colPicker = useColumnPicker();
  const demoDeletion = useUndoableDelete();

  function addNote(draft) {
    setNotes(ns => [{ id: Date.now(), ...draft }, ...ns]);
    return true;
  }
  function updateNote(id, patch) {
    setNotes(ns => ns.map(n => (n.id === id ? { ...n, ...patch } : n)));
    return true;
  }
  function deleteNote(id) {
    const note = notes.find(n => n.id === id);
    setNotes(ns => ns.filter(n => n.id !== id));
    demoDeletion.schedule('Interaction deleted', {
      commit: () => {},
      restore: () => setNotes(ns => [...ns, note].sort((a, b) => b.date.localeCompare(a.date))),
    });
  }

  return (
    <div className={mode === 'light' ? 'theme-light' : undefined} style={{ height: '100dvh', overflowY: 'auto', background: 'var(--bg)', color: 'var(--text)' }}>
      <UndoToastStack toasts={[{ message: demoDeletion.pending, onUndo: demoDeletion.undo }]} />
      {colPicker.open && (
        <ColumnPicker
          cols={DEMO_COLS}
          visible={visibleCols}
          onToggle={key => setVisibleCols(v => (v.includes(key) ? v.filter(k => k !== key) : [...v, key]))}
          onReset={() => setVisibleCols(['Company', 'Name', 'Industry', 'Last Contact'])}
          position={colPicker.position}
          menuRef={colPicker.menuRef}
        />
      )}

      <div style={{ maxWidth: 940, margin: '0 auto', padding: '36px 24px 80px' }}>
        <header style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Figtree', sans-serif", fontSize: 26, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.01em' }}>{THEME_NAME}</div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.08em', marginTop: 3 }}>DESIGN SYSTEM · v{THEME_VERSION}</div>
            <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.65, maxWidth: 620 }}>{THEME_DESCRIPTION}</p>
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            <ViewToggle view={mode === 'dark' ? 'table' : 'profile'} onChange={v => { setMode(v === 'table' ? 'dark' : 'light'); setComputedTokens(null); }} isMobile={false} />
            <CopyButton label="Copy CSS variables" getText={themeCss} />
            <CopyButton label="Copy theme JSON" getText={() => JSON.stringify(themeJson(), null, 2)} />
            <a className="btn" href="https://cdn.jsdelivr.net/gh/b3tracy/base-case-productivity@latest/tokens.json" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>tokens.json</a>
          </div>
        </header>

        <div style={{ marginTop: 20, padding: '12px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.65 }}>
          Install with <code style={{ color: 'var(--accent)' }}>npm i &quot;github:b3tracy/base-case-productivity#semver:^1.0.0&quot;</code>, then import
          <code style={{ color: 'var(--accent)' }}> @b3tracy/base-case-productivity/styles.css</code> before your own CSS. Point an agent at
          <a href="https://github.com/b3tracy/base-case-productivity/blob/main/AGENTS.md" style={{ color: 'var(--accent)' }}>AGENTS.md</a> or at
          <code style={{ color: 'var(--accent)' }}>tokens.json</code>, which carries the font stacks, every custom property for both themes, the radius
          and control-height scale, and the component inventory. The dark/light toggle above swaps <code style={{ color: 'var(--accent)' }}>.theme-light</code> on this page only.
        </div>

        <Section id="type" title="Typography" subtitle={`${FONTS.display.family} for display type, ${FONTS.body.family} for everything else. Base size ${FONTS.baseSize}.`}>
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ fontFamily: FONTS.display.stack, fontSize: 26, fontWeight: 700 }}>Figtree 700 — page and logo type</div>
            <div style={{ fontFamily: FONTS.display.stack, fontSize: 15, fontWeight: 600 }}>Figtree 600 — modal and section headings</div>
            <div style={{ fontFamily: FONTS.body.stack, fontSize: 13 }}>DM Sans 400 · 13px — field values and list names</div>
            <div style={{ fontFamily: FONTS.body.stack, fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.62 }}>DM Sans 400 · 12.5px — body copy and note text, 1.62 line height</div>
            <div className="section-title">Section title · 11px 600 uppercase, 0.08em tracking</div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>DM Sans 400 · 11px — metadata, placeholders, labels</div>
            <pre style={{ margin: 0, padding: 12, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, color: 'var(--text-muted)', overflowX: 'auto' }}>{FONTS.import}</pre>
          </div>
        </Section>

        <Section id="color" title="Color tokens" subtitle="Declared in styles/base-case.css and mirrored in src/tokens.js.">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <button className="btn-ghost" onClick={() => setComputedTokens(readComputedTokens(mode))}>Check against base-case.css</button>
            {computedTokens && <span style={{ fontSize: 11.5, color: 'var(--text-dim)' }}>Any token whose stylesheet value differs from this file is flagged in red below.</span>}
          </div>
          {COLOR_GROUPS.map(group => (
            <div key={group.name} style={{ marginBottom: 22 }}>
              <div className="section-title" style={{ marginBottom: 2 }}>{group.name}</div>
              {group.note && <div style={{ fontSize: 11.5, color: 'var(--text-dim)', marginBottom: 8 }}>{group.note}</div>}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0 22px' }}>
                {group.tokens.map(t => <Swatch key={t.token} entry={t} mode={mode} computed={computedTokens?.[t.token]} />)}
              </div>
            </div>
          ))}
        </Section>

        <Section id="shape" title="Radius, spacing and control heights">
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 16 }}>
            {RADII.map(r => (
              <div key={r.token} style={{ textAlign: 'center' }}>
                <div style={{ width: 74, height: 52, background: 'var(--surface3)', border: '1px solid var(--border)', borderRadius: r.value }} />
                <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6 }}>{r.token} · {r.value}</div>
              </div>
            ))}
          </div>
          <div className="fields-grid">
            {Object.entries(LAYOUT.controlHeights).map(([k, v]) => <Field key={k} label={`${k} height`} value={`${v}px`} />)}
            <Field label="Sidebar width" value={LAYOUT.sidebarWidth.value} />
            <Field label="Mobile breakpoint" value={LAYOUT.mobileBreakpoint} />
          </div>
          <p style={{ fontSize: 11.5, color: 'var(--text-dim)', marginTop: 12 }}>{LAYOUT.density}</p>
        </Section>

        <Section id="buttons" title="Buttons and inputs" subtitle="Plain CSS classes — no component import needed.">
          <Demo label="Buttons" code=".btn · .btn-ghost · .btn-danger">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn">Add Contact</button>
              <button className="btn-ghost">Cancel</button>
              <button className="btn-danger">Delete</button>
              <PrimaryButton onClick={() => {}}>Auth primary</PrimaryButton>
              <PrimaryButton disabled>Disabled</PrimaryButton>
              <LinkButton onClick={() => setAuthError(e => (e ? '' : 'Invalid login credentials'))}>Toggle error text</LinkButton>
            </div>
            <div style={{ marginTop: 10 }}><ErrorText>{authError}</ErrorText></div>
          </Demo>
          <Demo label="Inputs" code="global input / select / textarea + authInputStyle">
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
              <input placeholder="Text input" />
              <input type="date" defaultValue="2026-07-14" />
              <select defaultValue="Email"><option>In Person</option><option>Email</option><option>Call</option></select>
              <input style={authInputStyle} placeholder="Auth input (36px)" />
              <textarea placeholder="Notes, next steps, impressions…" style={{ gridColumn: '1 / -1' }} />
            </div>
          </Demo>
        </Section>

        <Section id="chrome" title="Page chrome" subtitle="The header, filter and sort strip every list page is built from.">
          <Demo label="HeaderBar + SearchBar + ViewToggle + StatPill" code="@b3tracy/base-case-productivity" padded={false}>
            <HeaderBar>
              <SearchBar value={search} onChange={setSearch} placeholder="Search contacts, company, industry…" />
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <ViewToggle view={view} onChange={setView} isMobile={isMobile} />
                <StatPill count={128} label="contacts" showLabel={!isMobile} />
                <button className="btn">+{!isMobile && ' Add Contact'}</button>
              </div>
            </HeaderBar>
            <FilterBar isMobile={isMobile}>
              <FilterSelect value={filter} onChange={setFilter} options={['Real Estate', 'Technology', 'Renewable Energy']} placeholder="All Industries" mobilePlaceholder="Industry" isMobile={isMobile} />
              <SortControls value={sort} onChange={setSort} options={DEMO_SORTS} sortDir={sortDir} onToggleDir={() => setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))} isMobile={isMobile} />
            </FilterBar>
          </Demo>
          <Demo label="ColumnPicker" code="useColumnPicker() + <ColumnPicker />">
            <div onContextMenu={colPicker.openFromEvent} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 34, padding: '0 12px', background: 'var(--table-header)', borderBottom: `1px solid var(--table-header-border)`, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-dim)', cursor: 'context-menu' }}>
              {visibleCols.map(c => <span key={c} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{c}{c === 'Company' && <SortArrow sortDir={sortDir} />}</span>)}
            </div>
            <HintText>Right-click the header row to pick columns.</HintText>
          </Demo>
          <Demo label="List rows" code=".list-item · ListGroupHeader" padded={false}>
            <ListGroupHeader>B</ListGroupHeader>
            <div className="list-item active">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><div className="li-name">Bell Renewables</div><div className="li-meta">Dana Whitfield · Strategy</div></div>
                <span className="li-date">Jul 14</span>
              </div>
            </div>
            <div className="list-item">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><div className="li-name">Brightline Health</div><div className="li-meta">Marco Ruiz · Operations</div></div>
                <span className="li-date">Jun 2</span>
              </div>
            </div>
          </Demo>
          <Demo label="EmptyDetail + HintText" code="@b3tracy/base-case-productivity">
            <div style={{ height: 150 }}>
              <EmptyDetail icon={<svg width="18" height="18" fill="none" stroke="var(--text-dim)" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4" /><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /></svg>}>
                Select a contact to view details
              </EmptyDetail>
            </div>
          </Demo>
        </Section>

        <Section id="detail" title="Detail pane" subtitle="Fields, badges and the interaction log used on every record.">
          <Demo label="Field / RequiredField / WebsiteField" code=".fields-grid + <Field /> from @b3tracy/base-case-productivity">
            <div className="section" style={{ paddingTop: 0 }}>
              <div className="section-title">Details</div>
              <div className="fields-grid">
                <Field label="Company" value="Bell Renewables" />
                <Field label="Title" value="VP Strategy" />
                <RequiredField label="Email" value="dana@bellrenew.com" />
                <RequiredField label="Phone" value="" />
                <WebsiteField value="bellrenew.com" />
              </div>
            </div>
          </Demo>
          <Demo label="Badges and tags" code=".li-badge · .note-tag · .stat-pill">
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
              {BADGES.map(b => <span key={b} className={`li-badge badge-${b.toLowerCase()}`}>{b}</span>)}
              <span className="note-tag inperson">In Person</span>
              <span className="note-tag callvideo">Call</span>
              <span className="note-tag email">Email</span>
              <StatPill count={12} label="opportunities" />
            </div>
          </Demo>
          <Demo label="InteractionLog" code="<InteractionLog /> — fully interactive, in-memory">
            <InteractionLog
              notes={notes}
              emptyText="No interactions yet."
              onAdd={addNote}
              onUpdate={updateNote}
              onDelete={deleteNote}
            />
            <HintText padding="4px 0 0">Deleting logs an undo toast at the bottom of the screen for 5 seconds.</HintText>
          </Demo>
          <Demo label="UndoToastStack" code="useUndoableDelete() + <UndoToastStack />">
            <button className="btn-ghost" onClick={() => demoDeletion.schedule('Contact deleted', { commit: () => {}, restore: () => {} })}>
              Trigger undo toast
            </button>
          </Demo>
        </Section>

        <Section id="modal" title="Modal" subtitle="The add/edit form layout: two-column grid, uppercase labels, footer actions.">
          <Demo label="Modal" code=".modal · .modal-grid · .modal-field" padded={false}>
            <div className="modal" style={{ width: '100%', maxWidth: '100%', boxShadow: 'none', border: 'none' }}>
              <h2>Add Contact</h2>
              <div className="modal-grid">
                <div className="modal-field"><label>First Name</label><input defaultValue="Dana" /></div>
                <div className="modal-field"><label>Last Name</label><input defaultValue="Whitfield" /></div>
                <div className="modal-section-label">Company</div>
                <div className="modal-field"><label>Company</label><input defaultValue="Bell Renewables" /></div>
                <div className="modal-field"><label>Title</label><input defaultValue="VP Strategy" /></div>
                <div className="modal-field full"><label>Connection Point</label><input placeholder="How did you meet?" /></div>
                <div className="modal-footer">
                  <button className="btn-ghost">Cancel</button>
                  <button className="btn">Save</button>
                </div>
              </div>
            </div>
          </Demo>
        </Section>

        <Section id="inventory" title="What ships with the theme" subtitle="Everything the package exports — behavior, not just paint.">
          <div className="section-title">Components and hooks</div>
          <div style={{ display: 'grid', gap: 8, marginBottom: 22 }}>
            {COMPONENTS.map(c => (
              <div key={c.name} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-soft)', paddingBottom: 7 }}>
                <span style={{ color: 'var(--text)', minWidth: 220 }}>{c.name}</span>
                <code style={{ color: 'var(--accent)', fontSize: 11 }}>{c.file}</code>
                <span style={{ flex: 1, minWidth: 200 }}>{c.usage}</span>
              </div>
            ))}
          </div>
          <div className="section-title">Global classes</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {CSS_CLASSES.map(c => (
              <div key={c.name} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12, color: 'var(--text-muted)' }}>
                <code style={{ color: 'var(--text)', minWidth: 280, fontSize: 11.5 }}>{c.name}</code>
                <span style={{ flex: 1, minWidth: 200 }}>{c.usage}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="css" title="CSS variables" subtitle="The exact block to paste into a new app's stylesheet.">
          <pre style={{ margin: 0, padding: 14, background: 'var(--surface-deep)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, lineHeight: 1.6, color: 'var(--text-muted)', overflowX: 'auto' }}>{themeCss()}</pre>
        </Section>
      </div>
    </div>
  );
}
