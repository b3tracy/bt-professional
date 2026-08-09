'use client';

const selectStyle = (isMobile, active) => ({
  width: isMobile ? 100 : 130, height: 28, padding: '0 26px 0 8px', fontSize: 12,
  background: active ? 'var(--accent-soft)' : 'var(--surface2)',
  border: `1px solid ${active ? 'var(--accent-dim)' : 'var(--border)'}`,
  color: active ? 'var(--accent)' : 'var(--text-muted)',
  lineHeight: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
});

export function PageShell({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden', background: 'var(--bg)' }}>
      {children}
    </div>
  );
}

export function HeaderBar({ children }) {
  return (
    <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexShrink: 0, background: 'var(--bg)' }}>
      {children}
    </div>
  );
}

export function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, padding: '0 10px', height: 32 }}>
      <svg width="11" height="11" fill="none" stroke="var(--text-dim)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ background: 'transparent', border: 'none', fontSize: 'max(12.5px, 16px)', color: 'var(--text)', outline: 'none', flex: 1, minWidth: 0, padding: 0, height: '100%' }} />
      {value && <button onClick={() => onChange('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', fontSize: 14, lineHeight: 1, padding: '0 2px', flexShrink: 0, display: 'flex', alignItems: 'center' }}
        onMouseOver={e => e.currentTarget.style.color = 'var(--text)'}
        onMouseOut={e => e.currentTarget.style.color = 'var(--text-dim)'}
      >×</button>}
    </div>
  );
}

// Segmented table/profile switch on desktop, single toggle button on mobile.
export function ViewToggle({ view, onChange, isMobile }) {
  if (isMobile) {
    return (
      <button onClick={() => onChange(view === 'table' ? 'profile' : 'table')} style={{
        height: 32, width: 32, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6,
        color: 'var(--text-muted)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
      }}>{view === 'table' ? 'P' : 'T'}</button>
    );
  }
  return (
    <div style={{ display: 'flex', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
      {['table', 'profile'].map(v => (
        <button key={v} onClick={() => onChange(v)} style={{
          height: 28, padding: '0 12px', fontSize: 11.5, fontWeight: view === v ? 500 : 400,
          background: view === v ? 'var(--surface3)' : 'transparent',
          color: view === v ? 'var(--text)' : 'var(--text-dim)',
          border: 'none', cursor: 'pointer', textTransform: 'capitalize', letterSpacing: '0.01em',
          borderRight: v === 'table' ? '1px solid var(--border)' : 'none',
        }}>{v}</button>
      ))}
    </div>
  );
}

export function StatPill({ count, label, showLabel = true }) {
  return (
    <span className="stat-pill">
      <span style={{ color: 'var(--text-muted)' }}>{count}</span>{showLabel && ` ${label}`}
    </span>
  );
}

export function FilterBar({ isMobile, children }) {
  return (
    <div style={{ padding: '6px 16px', borderBottom: '1px solid var(--border-soft)', display: 'flex', gap: 5, alignItems: 'center', flexShrink: 0, background: 'var(--bg)', overflowX: isMobile ? 'auto' : 'visible', flexWrap: 'nowrap' }}>
      <span style={{ fontSize: 11, color: 'var(--text-dim)', marginRight: 3, flexShrink: 0 }}>Filter</span>
      {children}
    </div>
  );
}

export function FilterSelect({ value, onChange, options, placeholder, mobilePlaceholder, isMobile }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={selectStyle(isMobile, !!value)}>
      <option value="">{isMobile ? mobilePlaceholder : placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export function SortControls({ value, onChange, options, sortDir, onToggleDir, isMobile }) {
  return (
    <>
      <span style={{ fontSize: 11, color: 'var(--text-dim)', marginLeft: 6, flexShrink: 0 }}>Sort</span>
      <select value={value} onChange={e => onChange(e.target.value)} style={selectStyle(isMobile, false)}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <button onClick={onToggleDir} style={{
        height: 28, width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 5, cursor: 'pointer', flexShrink: 0,
        color: 'var(--text-muted)',
      }}
      onMouseOver={e => e.currentTarget.style.color = 'var(--text)'}
      onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
        {sortDir === 'asc'
          ? <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7-7 7 7"/></svg>
          : <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7 7 7-7"/></svg>
        }
      </button>
    </>
  );
}

export function SortArrow({ sortDir }) {
  return (
    <svg width="8" height="8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      {sortDir === 'asc' ? <path d="M5 15l7-7 7 7"/> : <path d="M5 9l7 7 7-7"/>}
    </svg>
  );
}

export function ListGroupHeader({ children }) {
  return (
    <div style={{ padding: '4px 14px 3px', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em', color: 'var(--text-dim)', background: 'var(--surface2)', borderBottom: '1px solid var(--border-soft)', position: 'sticky', top: 0, zIndex: 1, textTransform: 'uppercase' }}>
      {children}
    </div>
  );
}

export function HintText({ children, padding = 20, fontSize = 12 }) {
  return <div style={{ padding, color: 'var(--text-dim)', fontSize }}>{children}</div>;
}

export function EmptyDetail({ icon, children }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>{children}</p>
    </div>
  );
}
