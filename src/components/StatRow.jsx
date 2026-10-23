export default function StatRow({
  label,
  value,
  opponentValue,
  variant = "bar"
}) {
  const numericValue = Number(value);

  const safeValue = Number.isFinite(numericValue)
    ? Math.min(100, Math.max(0, numericValue))
    : 0;

  if (variant === "comparison") {
    const numericOpponent = Number(opponentValue);

    const safeOpponent = Number.isFinite(numericOpponent)
      ? numericOpponent
      : 0;

    let result = "Empate";

    if (safeValue > safeOpponent) {
      result = "Superior";
    } else if (safeValue < safeOpponent) {
      result = "Inferior";
    }

    return (
      <div className="comparison-stat">
        <span>{label}</span>
        <strong>{safeValue}</strong>
        <span className="comparison-result">{result}</span>
      </div>
    );
  }

  return (
    <div className="power-stat-row">
      <span>{label}</span>

      <div
        className="power-stat-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
      >
        <div
          className="power-stat-fill"
          style={{ width: `${safeValue}%` }}
        />
      </div>

      <span>{safeValue}</span>
    </div>
  );
}