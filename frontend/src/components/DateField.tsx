import { useEffect, useRef, useState } from 'react';

interface DateFieldProps {
  /** ISO date (yyyy-mm-dd) or '' */
  value: string;
  onChange: (isoValue: string) => void;
  placeholder?: string;
  className?: string;
}

function isoToDisplay(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return '';
  const [, y, mo, d] = m;
  return `${d}.${mo}.${y}`;
}

function displayToIso(display: string): string | null {
  const m = display.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!m) return null;
  const [, d, mo, y] = m;
  const day = Number(d);
  const month = Number(mo);
  const year = Number(y);
  if (month < 1 || month > 12) return null;
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return null;
  return `${y}-${mo}-${d}`;
}

function maskDigitsAsDate(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean).join('.');
}

/** Date field that accepts free manual typing (дд.мм.гггг) as well as picking from the native calendar. */
export function DateField({ value, onChange, placeholder = 'дд.мм.гггг', className }: DateFieldProps) {
  const [text, setText] = useState(() => isoToDisplay(value));
  const pickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setText(isoToDisplay(value));
  }, [value]);

  function handleTextChange(raw: string) {
    const masked = maskDigitsAsDate(raw);
    setText(masked);
    if (masked === '') {
      onChange('');
      return;
    }
    const iso = displayToIso(masked);
    if (iso) onChange(iso);
  }

  function openPicker() {
    const el = pickerRef.current;
    if (!el) return;
    if (typeof el.showPicker === 'function') {
      try {
        el.showPicker();
        return;
      } catch {
        // fall through to focus
      }
    }
    el.focus();
  }

  return (
    <div className={`ts-date-field ${className ?? ''}`}>
      <input
        className="ts-input auth"
        inputMode="numeric"
        placeholder={placeholder}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
      />
      <button type="button" className="ts-date-field-icon" onClick={openPicker} aria-label="Выбрать дату из календаря">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M3 9.5H21" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 3V6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M16 3V6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>
      <input
        ref={pickerRef}
        type="date"
        className="ts-date-field-native"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
