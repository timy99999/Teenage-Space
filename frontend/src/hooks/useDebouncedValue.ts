import { useEffect, useState } from 'react';

/** Returns `value` delayed by `delayMs` — the timer resets on every change,
 *  so a fast-changing value (e.g. a search box) only "settles" once typing pauses. */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}
