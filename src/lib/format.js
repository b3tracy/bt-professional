// Date-only strings ('YYYY-MM-DD') are parsed at noon so timezone offsets
// never shift them to the previous/next day.
export function parseDateOnly(d) {
  return d ? new Date(d + 'T12:00:00') : null;
}

export function formatDate(d, fallback = '') {
  if (!d) return fallback;
  return parseDateOnly(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function today() {
  return new Date().toISOString().split('T')[0];
}

export function daysSince(d) {
  if (!d) return null;
  return Math.round((new Date() - parseDateOnly(d)) / (1000 * 60 * 60 * 24));
}

export function isDue(d) {
  const parsed = parseDateOnly(d);
  return !!parsed && parsed <= new Date();
}

export function safeUrl(raw) {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed);
  const candidate = hasScheme ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(candidate);
    return (u.protocol === 'http:' || u.protocol === 'https:') ? u.href : null;
  } catch {
    return null;
  }
}

export function formatPhone(val) {
  const digits = val.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return digits.slice(0, 3) + '-' + digits.slice(3);
  return digits.slice(0, 3) + '-' + digits.slice(3, 6) + '-' + digits.slice(6);
}

export function formatComp(val) {
  const digits = val.replace(/\D/g, '');
  if (!digits) return '';
  return '$' + parseInt(digits).toLocaleString();
}

export function compareText(a, b) {
  return (a || '').localeCompare(b || '');
}

export function uniqueSorted(rows, field) {
  return [...new Set(rows.filter(Boolean).map(r => r[field]).filter(Boolean))].sort();
}
