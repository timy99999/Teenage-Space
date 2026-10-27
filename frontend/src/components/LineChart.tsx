export interface LineSeries {
  label: string;
  /** A CSS colour or custom property, e.g. 'var(--ts-blue)'. */
  color: string;
  /** null = not measured on that day. Drawn as a gap, never as zero. */
  values: (number | null)[];
}

interface LineChartProps {
  /** Pre-formatted x labels, one per point. */
  labels: string[];
  series: LineSeries[];
  formatValue?: (n: number) => string;
}

// The SVG is drawn in its own coordinate space and stretched to the container
// width; non-scaling-stroke keeps the lines an even thickness regardless.
const W = 600;
const H = 170;
const PAD = 10;

/** A small multi-series line chart. Hover text uses the native title tooltip,
 *  same as BarChart, rather than a bespoke hover layer. */
export function LineChart({ labels, series, formatValue = String }: LineChartProps) {
  const points = series.flatMap((s) => s.values).filter((v): v is number => v !== null);
  const hasData = points.length > 0;
  const max = Math.max(1, ...points);
  const n = labels.length;

  const x = (i: number) => (n <= 1 ? W / 2 : PAD + (i * (W - PAD * 2)) / (n - 1));
  const y = (v: number) => H - PAD - (v / max) * (H - PAD * 2);

  // A break in the data has to break the path too: a line drawn straight across
  // a gap would invent values that were never measured.
  const pathOf = (values: (number | null)[]) => {
    let d = '';
    let drawing = false;
    values.forEach((v, i) => {
      if (v === null || v === undefined) {
        drawing = false;
        return;
      }
      d += `${drawing ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)} `;
      drawing = true;
    });
    return d.trim();
  };

  if (!hasData) {
    return <div className="desc ts-chart-empty">Пока нет данных за этот период.</div>;
  }

  return (
    <div className="ts-line-chart">
      <div className="ts-chart-legend">
        {series.map((s) => (
          <span className="ts-chart-legend-item" key={s.label}>
            <i style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
        <span className="ts-chart-max">макс. {formatValue(max)}</span>
      </div>

      <svg
        className="ts-line-chart-svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={series.map((s) => s.label).join(', ')}
      >
        <line className="ts-line-chart-grid" x1={PAD} y1={PAD} x2={W - PAD} y2={PAD} />
        <line className="ts-line-chart-grid" x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} />

        {series.map((s) => (
          <path
            key={s.label}
            d={pathOf(s.values)}
            fill="none"
            stroke={s.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {labels.map((label, i) => (
          <rect key={`${label}-${i}`} x={x(i) - 3} y={0} width={6} height={H} fill="transparent">
            <title>
              {`${label}\n` +
                series
                  .map((s) => {
                    const v = s.values[i];
                    return `${s.label}: ${v === null || v === undefined ? 'нет данных' : formatValue(v)}`;
                  })
                  .join('\n')}
            </title>
          </rect>
        ))}
      </svg>

      <div className="ts-line-chart-labels">
        <span>{labels[0]}</span>
        {n > 2 && <span>{labels[Math.floor((n - 1) / 2)]}</span>}
        <span>{labels[n - 1]}</span>
      </div>
    </div>
  );
}
