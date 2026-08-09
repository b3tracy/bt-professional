'use client';

export const authInputStyle = {
  height: 36, padding: '0 12px', fontSize: 13, background: 'var(--surface2)',
  border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)',
  outline: 'none', width: '100%', boxSizing: 'border-box',
};

// `brand` and `tagline` are the only app-specific bits; everything else is theme.
export function AuthCard({ children, brand, tagline }) {
  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', fontFamily: 'DM Sans, sans-serif',
    }}>
      <div style={{
        width: 360, background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        {(brand || tagline) && (
          <div style={{ textAlign: 'center', marginBottom: 4 }}>
            {brand && <div style={{ fontFamily: 'Figtree, sans-serif', fontSize: 22, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.04em' }}>{brand}</div>}
            {tagline && <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.08em', marginTop: 2 }}>{tagline}</div>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export function PrimaryButton({ children, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ height: 36, background: disabled ? 'var(--surface3)' : 'var(--accent)', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, color: disabled ? 'var(--text-dim)' : '#1a2e23', cursor: disabled ? 'default' : 'pointer', transition: 'background 0.15s', fontFamily: 'DM Sans, sans-serif' }}>
      {children}
    </button>
  );
}

export function LinkButton({ children, onClick }) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--text-dim)', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
      {children}
    </button>
  );
}

export function ErrorText({ children }) {
  if (!children) return null;
  return <div style={{ fontSize: 11.5, color: 'var(--red)' }}>{children}</div>;
}
