import { useUI } from '../contexts/UIContext';

export function CardSizeSlider() {
  const { cardSize, setCardSize } = useUI();
  return (
    <div className="ts-sizer">
      <span>размер</span>
      <input
        type="range"
        min={200}
        max={440}
        step={10}
        value={cardSize}
        onChange={(e) => setCardSize(Number(e.target.value))}
      />
    </div>
  );
}
