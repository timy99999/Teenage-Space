interface BarChartProps {
  data: { label: string; value: number }[];
  peakIndex?: number | null;
}

export function BarChart({ data, peakIndex }: BarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="ts-bar-chart">
      {data.map((d, i) => (
        <div className="ts-bar-chart-col" key={d.label}>
          <div className="ts-bar-chart-track">
            <div
              className={`ts-bar-chart-bar${i === peakIndex ? ' peak' : ''}`}
              style={{ height: `${(d.value / max) * 100}%` }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
          <div className="ts-bar-chart-label">{d.label}</div>
        </div>
      ))}
    </div>
  );
}
