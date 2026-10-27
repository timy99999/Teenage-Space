interface CohortRow {
  label: string;
  size: number;
  /** Percentages, one per column. null = that window hasn't elapsed yet. */
  cells: (number | null)[];
}

interface CohortGridProps {
  columns: string[];
  rows: CohortRow[];
}

/** Retention grid. A cell's tint tracks its percentage, so the shape of the
 *  table is readable before any single number is. An empty cell means the
 *  window hasn't finished yet — not that nobody came back. */
export function CohortGrid({ columns, rows }: CohortGridProps) {
  const withPeople = rows.filter((r) => r.size > 0);
  if (withPeople.length === 0) return <div className="desc">Пока нет когорт с регистрациями.</div>;

  return (
    <div className="ts-cohort-wrap">
      <table className="ts-cohort-grid">
        <thead>
          <tr>
            <th>Неделя</th>
            <th>Людей</th>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {withPeople.map((row) => (
            <tr key={row.label}>
              <td className="ts-cohort-week">{row.label}</td>
              <td>{row.size}</td>
              {row.cells.map((cell, i) => (
                <td
                  key={columns[i]}
                  className="ts-cohort-cell"
                  style={cell === null ? undefined : { background: `rgba(36, 18, 200, ${0.08 + (cell / 100) * 0.62})` }}
                  data-filled={cell !== null && cell >= 55 ? 'strong' : undefined}
                >
                  {cell === null ? '—' : `${cell}%`}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
