import { safeUrl } from '../lib/format.js';

export function Field({ label, value }) {
  if (!value) return null;
  return (
    <div className="field">
      <label>{label}</label>
      <div className="value">{value}</div>
    </div>
  );
}

// Same as Field, but flags an empty value instead of hiding it.
export function RequiredField({ label, value }) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="value" style={value ? undefined : { color: 'var(--red)' }}>{value || 'Missing'}</div>
    </div>
  );
}

export function WebsiteField({ value, label = 'Website' }) {
  if (!value) return null;
  const url = safeUrl(value);
  return (
    <div className="field">
      <label style={{ fontSize: 10.5, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 3, fontWeight: 400 }}>{label}</label>
      {url
        ? <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--accent)', lineHeight: 1.4 }}>{value}</a>
        : <div className="value">{value}</div>}
    </div>
  );
}
