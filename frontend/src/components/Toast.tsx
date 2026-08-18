import { useUI } from '../contexts/UIContext';

export function Toast() {
  const { toast } = useUI();
  if (!toast) return null;
  return <div className="ts-toast">{toast}</div>;
}
