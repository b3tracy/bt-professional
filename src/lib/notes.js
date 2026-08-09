export const INTERACTION_METHODS = [
  { value: 'Y', label: 'In Person', tagClass: 'inperson' },
  { value: 'N', label: 'Email',     tagClass: 'email' },
  { value: 'C', label: 'Call',      tagClass: 'callvideo' },
  { value: 'G', label: 'General',   tagClass: null },
];

export function methodLabel(value) {
  return INTERACTION_METHODS.find(m => m.value === value)?.label || value || '';
}

export function sortNotesDesc(notes) {
  return [...notes].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

// Notes belonging to one record, newest first. `foreignKey` is 'contact_id' or 'opp_id'.
export function notesFor(notes, foreignKey, id) {
  return sortNotesDesc(notes.filter(n => n[foreignKey] === id));
}

export function latestNoteDate(notes, foreignKey, id) {
  return notesFor(notes, foreignKey, id)[0]?.date || '';
}
