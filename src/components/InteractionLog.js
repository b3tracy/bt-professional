'use client';
import { useState } from 'react';
import { formatDate, today } from '../lib/format.js';
import { INTERACTION_METHODS } from '../lib/notes.js';

function MethodSelect({ value, onChange, style, methods }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={style}>
      {methods.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
    </select>
  );
}

function MethodTag({ value, methods }) {
  const method = methods.find(m => m.value === value);
  if (!method) return null;
  return method.tagClass
    ? <span className={`note-tag ${method.tagClass}`}>{method.label}</span>
    : <span className="note-tag" style={{ background: 'rgba(122,154,181,0.08)', color: 'var(--text-dim)' }}>{method.label}</span>;
}

const emptyDraft = () => ({ text: '', date: today(), in_person: 'N' });

// Shared interaction log: renders the note list plus the edit and add forms.
// `onAdd`/`onUpdate` must resolve truthy for the draft/edit state to reset.
// `methods` overrides the tag/select options; each entry is
// { value, label, tagClass } and tagClass maps to a .note-tag modifier.
export function InteractionLog({
  notes,
  emptyText,
  onAdd,
  onUpdate,
  onDelete,
  methods = INTERACTION_METHODS,
  title = 'Interaction Log',
  addLabel = 'Log Interaction',
  placeholder = 'Notes, next steps, impressions…',
}) {
  const [draft, setDraft] = useState(emptyDraft);
  const [editing, setEditing] = useState(null);

  async function handleAdd() {
    if (!draft.text.trim()) return;
    if (await onAdd({ ...draft, text: draft.text.trim() })) setDraft(emptyDraft());
  }

  async function handleUpdate() {
    if (await onUpdate(editing.id, { text: editing.text, date: editing.date, in_person: editing.in_person })) setEditing(null);
  }

  return (
    <div className="section">
      <div className="section-title">{title}</div>
      {notes.length === 0 && (
        <div style={{ fontSize: 12.5, color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: 16 }}>{emptyText}</div>
      )}
      {notes.map(n => (
        <div key={n.id} className="note-entry">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className="note-date">{formatDate(n.date)}</span>
              <MethodTag value={n.in_person} methods={methods} />
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {editing?.id === n.id ? (
                <>
                  <button className="btn-ghost" style={{ padding: '2px 8px', fontSize: 11 }} onClick={handleUpdate}>Save</button>
                  <button className="btn-ghost" style={{ padding: '2px 8px', fontSize: 11 }} onClick={() => setEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: 12, cursor: 'pointer', padding: '2px 6px', borderRadius: 4 }}
                    onMouseOver={e => e.target.style.color = 'var(--accent)'} onMouseOut={e => e.target.style.color = 'var(--text-dim)'}
                    onClick={() => setEditing({ id: n.id, text: n.text, date: n.date, in_person: n.in_person || 'N' })}>Edit</button>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: 12, cursor: 'pointer', padding: '2px 6px', borderRadius: 4 }}
                    onMouseOver={e => e.target.style.color = 'var(--red)'} onMouseOut={e => e.target.style.color = 'var(--text-dim)'}
                    onClick={() => onDelete(n.id)}>Delete</button>
                </>
              )}
            </div>
          </div>
          {editing?.id === n.id ? (
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', gap: 7 }}>
                <input type="date" value={editing.date} onChange={e => setEditing(s => ({ ...s, date: e.target.value }))} style={{ height: 32, flex: 1 }} />
                <MethodSelect value={editing.in_person} onChange={v => setEditing(s => ({ ...s, in_person: v }))} style={{ height: 32, flex: 1 }} methods={methods} />
              </div>
              <textarea value={editing.text} onChange={e => setEditing(s => ({ ...s, text: e.target.value }))} style={{ width: '100%' }} />
            </div>
          ) : (
            <div className="note-text">{n.text}</div>
          )}
        </div>
      ))}

      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ display: 'flex', gap: 7 }}>
          <input type="date" value={draft.date} onChange={e => setDraft(d => ({ ...d, date: e.target.value }))} style={{ flex: 1, height: 32 }} />
          <MethodSelect value={draft.in_person} onChange={v => setDraft(d => ({ ...d, in_person: v }))} style={{ flex: 1, height: 32 }} methods={methods} />
        </div>
        <textarea value={draft.text} onChange={e => setDraft(d => ({ ...d, text: e.target.value }))} placeholder={placeholder} style={{ fontSize: 12.5 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn" onClick={handleAdd}>{addLabel}</button>
        </div>
      </div>
    </div>
  );
}
