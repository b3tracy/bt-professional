'use client';

export function ColumnPicker({ cols, visible, onToggle, onReset, position, menuRef, lockedKey = 'Company' }) {
  return (
    <div ref={menuRef} style={{
      position: 'fixed', left: position.x, top: position.y, zIndex: 50, background: 'var(--surface-deep)',
      border: '1px solid var(--border)', borderRadius: 7, padding: '8px 0',
      minWidth: 200, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    }}>
      <div style={{ padding: '4px 12px 8px', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-dim)', borderBottom: '1px solid var(--border-soft)' }}>Visible Columns</div>
      <div style={{ maxHeight: 320, overflowY: 'auto', padding: '4px 0' }}>
        {cols.map(col => {
          const isLocked = col.key === lockedKey;
          return (
            <label key={col.key} style={{
              display: 'flex', alignItems: 'center', gap: 9, padding: '5px 14px',
              cursor: isLocked ? 'default' : 'pointer', opacity: isLocked ? 0.45 : 1,
            }}
            onMouseOver={e => { if (!isLocked) e.currentTarget.style.background = 'var(--surface-hover)'; }}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
              <input type="checkbox" checked={visible.includes(col.key)} disabled={isLocked}
                onChange={() => onToggle(col.key)}
                style={{ accentColor: 'var(--accent)', width: 12, height: 12 }} />
              <span style={{ fontSize: 12.5, color: 'var(--text)', whiteSpace: 'nowrap' }}>{col.key}</span>
            </label>
          );
        })}
      </div>
      <div style={{ borderTop: '1px solid var(--border-soft)', padding: '7px 12px 3px' }}>
        <button onClick={onReset} style={{ fontSize: 11, color: 'var(--text-dim)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onMouseOver={e => e.target.style.color = 'var(--text)'}
          onMouseOut={e => e.target.style.color = 'var(--text-dim)'}>Reset defaults</button>
      </div>
    </div>
  );
}
