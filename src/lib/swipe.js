// Touch handler props for horizontal swipe gestures (mobile back/drawer).
// onTouchEnd also returns the detected direction ('left' | 'right' | null) for
// callers that need to react without a callback.
export function swipeHandlers({ enabled = true, onSwipeRight, onSwipeLeft, threshold = 60 } = {}) {
  if (!enabled) return {};
  return {
    onTouchStart: e => { e.currentTarget._touchX = e.touches[0].clientX; },
    onTouchEnd: e => {
      const dx = e.changedTouches[0].clientX - (e.currentTarget._touchX || 0);
      if (dx > threshold) { onSwipeRight?.(e); return 'right'; }
      if (dx < -threshold) { onSwipeLeft?.(e); return 'left'; }
      return null;
    },
  };
}
