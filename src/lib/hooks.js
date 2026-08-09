'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

export const MOBILE_BREAKPOINT = 768;

export function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

// 'profile' on narrow screens, 'table' otherwise — evaluated once, before the
// resize listener in useIsMobile has run.
export function defaultView() {
  return typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT ? 'profile' : 'table';
}

export function usePersistentState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
    } catch {}
    return defaultValue;
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
}

// Horizontal drag-to-resize for the list/detail split pane.
export function usePaneResize({ initial = 280, min = 200, max = 500 } = {}) {
  const [width, setWidth] = useState(initial);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const onDragStart = useCallback((e) => {
    dragging.current = true;
    startX.current = e.clientX;
    startWidth.current = width;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [width]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      setWidth(Math.min(max, Math.max(min, startWidth.current + (e.clientX - startX.current))));
    };
    const onUp = () => {
      dragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [min, max]);

  return { width, onDragStart };
}

// Drag-to-resize table columns, keyed by column `key`.
export function useColumnWidths(cols, { minWidth = 60 } = {}) {
  const [colWidths, setColWidths] = useState(() => Object.fromEntries(cols.map(c => [c.key, c.width])));
  const resizing = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!resizing.current) return;
      const { key, startX, startW } = resizing.current;
      setColWidths(w => ({ ...w, [key]: Math.max(minWidth, startW + (e.clientX - startX)) }));
    };
    const onUp = () => {
      resizing.current = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [minWidth]);

  const startResize = useCallback((e, key) => {
    e.preventDefault();
    resizing.current = { key, startX: e.clientX, startW: colWidths[key] };
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [colWidths]);

  return { colWidths, startResize };
}

// Right-click-a-header column picker: position, open state and outside-click close.
export function useColumnPicker({ width = 210, height = 300 } = {}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const openFromEvent = useCallback((e) => {
    e.preventDefault();
    setPosition({
      x: Math.min(e.clientX, window.innerWidth - width),
      y: Math.min(e.clientY, window.innerHeight - height),
    });
    setOpen(true);
  }, [width, height]);

  useEffect(() => {
    if (!open) return;
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return { open, position, menuRef, openFromEvent, close: () => setOpen(false) };
}

// Optimistic delete with an undo window: the row is removed from local state by
// the caller, `commit` runs after the delay, `restore` runs if undone first.
export function useUndoableDelete(delayMs = 5000) {
  const [pending, setPending] = useState(null);
  const timerRef = useRef(null);
  const restoreRef = useRef(null);

  const schedule = useCallback((payload, { commit, restore }) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    restoreRef.current = restore;
    setPending(payload);
    timerRef.current = setTimeout(async () => {
      await commit(payload);
      setPending(null);
    }, delayMs);
  }, [delayMs]);

  const undo = useCallback(() => {
    setPending(current => {
      if (!current) return current;
      clearTimeout(timerRef.current);
      restoreRef.current?.(current);
      return null;
    });
  }, []);

  return { pending, schedule, undo };
}

// Ctrl/Cmd+Z undoes the first slot with a pending delete.
export function useUndoShortcut(slots) {
  const pendingSlots = slots.filter(s => s.pending);
  useEffect(() => {
    if (pendingSlots.length === 0) return;
    function handleKey(e) {
      if (!(e.ctrlKey || e.metaKey) || e.key !== 'z') return;
      pendingSlots[0].undo();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });
}
