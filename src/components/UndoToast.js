'use client';

// `toasts` entries with a falsy message are skipped, so callers can pass one
// entry per undoable slot.
export function UndoToastStack({ toasts }) {
  const visible = toasts.filter(t => t.message);
  if (visible.length === 0) return null;
  return (
    <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', flexDirection: 'column-reverse', gap: 8 }}>
      {visible.map(t => (
        <div key={t.message} style={{ background: 'var(--surface3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.4)', fontSize: 13, color: 'var(--text)', whiteSpace: 'nowrap' }}>
          <span>{t.message}</span>
          <button onClick={t.onUndo} style={{ background: 'var(--accent)', border: 'none', borderRadius: 5, color: '#fff', fontSize: 12, fontWeight: 600, padding: '3px 10px', cursor: 'pointer' }}>Undo</button>
        </div>
      ))}
    </div>
  );
}
