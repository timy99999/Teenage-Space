export interface RankBarItem {
  label: string;
  value: number;
  /** Small text under the label — a percentage, a group name, a raw count. */
  hint?: string;
  /** Change versus the previous period; null or undefined hides the arrow. */
  delta?: number | null;
}

interface RankBarsProps {
  items: RankBarItem[];
  formatValue?: (n: number) => string;
  emptyNote?: string;
}

/** A ranked list with proportional bars — readable for fifteen features or
 *  twenty search queries, which the stat-tile grid is not. Bars are scaled to
 *  the largest item, so this shows relative order, not absolute scale. */
export function RankBars({ items, formatValue = String, emptyNote = 'Пока нет данных.' }: RankBarsProps) {
  if (items.length === 0) return <div className="desc">{emptyNote}</div>;

  const max = Math.max(1, ...items.map((i) => i.value));

  return (
    <div className="ts-rank-bars">
      {items.map((item) => {
        const delta = item.delta ?? null;
        return (
          <div className="ts-rank-row" key={item.label}>
            <div className="ts-rank-head">
              <span className="ts-rank-label" title={item.label}>
                {item.label}
              </span>
              <span className="ts-rank-value">
                {formatValue(item.value)}
                {delta !== null && delta !== 0 && (
                  <span className={`ts-rank-delta${delta > 0 ? ' up' : ' down'}`}>
                    {delta > 0 ? '↑' : '↓'}
                    {Math.abs(delta)}
                  </span>
                )}
              </span>
            </div>
            <div className="ts-rank-track">
              <div className="ts-rank-fill" style={{ width: `${(item.value / max) * 100}%` }} />
            </div>
            {item.hint && <div className="ts-rank-hint">{item.hint}</div>}
          </div>
        );
      })}
    </div>
  );
}
