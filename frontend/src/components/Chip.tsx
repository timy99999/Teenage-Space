interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  small?: boolean;
  onGrey?: boolean;
}

export function Chip({ label, active, onClick, small, onGrey }: ChipProps) {
  const cls = ['ts-chip', small ? 'small' : '', onGrey ? 'on-grey' : '', active ? 'active' : '']
    .filter(Boolean)
    .join(' ');
  return (
    <span className={cls} onClick={onClick} role="button" tabIndex={0}>
      {label}
    </span>
  );
}
