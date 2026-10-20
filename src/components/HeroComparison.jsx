const POWER_STATS = [
  { key: "intelligence", label: "Inteligencia" },
  { key: "strength", label: "Fuerza" },
  { key: "speed", label: "Velocidad" },
  { key: "durability", label: "Resistencia" },
  { key: "power", label: "Poder" },
  { key: "combat", label: "Combate" }
];

export default function HeroComparison({
  heroes,
  selectedIds,
  onChangeSelection,
  onClose
}) {
  const selectedHeroes = selectedIds.map((id) =>
    heroes.find((hero) => hero.id === id)
  );

  function handleSelection(slot, value) {
    const heroId = Number(value);

    onChangeSelection((currentIds) => {
      const nextIds = [...currentIds];
      const otherSlot = slot === 0 ? 1 : 0;

      if (nextIds[otherSlot] === heroId) {
        nextIds[otherSlot] = nextIds[slot] ?? null;
      }

      nextIds[slot] = heroId;

      return nextIds.filter((id) => id !== null && id !== undefined);
    });
  }

  function renderStats(hero, opponent) {
    return POWER_STATS.map(({ key, label }) => {
      const rawValue = Number(hero.powerstats?.[key]);
      const value = Number.isFinite(rawValue) ? rawValue : 0;

      const opponentValue = Number(opponent?.powerstats?.[key]);
      const safeOpponentValue = Number.isFinite(opponentValue)
        ? opponentValue
        : 0;

      let result = "Empate";

      if (value > safeOpponentValue) {
        result = "Superior";
      } else if (value < safeOpponentValue) {
        result = "Inferior";
      }

      return (
        <div className="comparison-stat" key={key}>
          <span>{label}</span>
          <strong>{value}</strong>
          <span className="comparison-result">{result}</span>
        </div>
      );
    });
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="comparison-title"
      >
        <button
          className="icon-button modal-close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar comparador"
        >
          Cerrar
        </button>

        <p className="eyebrow">VERSUS ANALYSIS</p>
        <h2 id="comparison-title">Comparador de héroes</h2>

        <p>
          Selecciona dos personajes para enfrentar sus estadísticas.
        </p>

        <div className="comparison-grid">
          {[0, 1].map((slot) => {
            const hero = selectedHeroes[slot] || null;
            const opponent = selectedHeroes[slot === 0 ? 1 : 0] || null;

            return (
              <article className="comparison-column" key={slot}>
                <label htmlFor={`comparison-hero-${slot}`}>
                  {slot === 0 ? "Primer héroe" : "Segundo héroe"}
                </label>

                <select
                  id={`comparison-hero-${slot}`}
                  className="comparison-select"
                  value={hero?.id ?? ""}
                  onChange={(event) =>
                    handleSelection(slot, event.target.value)
                  }
                >
                  <option value="">Selecciona un héroe</option>

                  {heroes.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      disabled={
                        item.id === opponent?.id &&
                        item.id !== hero?.id
                      }
                    >
                      {item.name}
                    </option>
                  ))}
                </select>

                {hero && (
                  <>
                    {hero.image && (
                      <img
                        className="hero-detail-image"
                        src={hero.image}
                        alt={`Retrato de ${hero.name}`}
                        loading="lazy"
                      />
                    )}

                    <h3>{hero.name}</h3>

                    <p className="hero-type">{hero.type}</p>

                    <p className="power-badge">
                      Poder global: {hero.power}/10
                    </p>

                    <div className="comparison-stats">
                      {renderStats(hero, opponent)}
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>

        {selectedHeroes.filter(Boolean).length < 2 && (
          <p className="comparison-hint">
            Selecciona dos personajes para completar la comparación.
          </p>
        )}
      </section>
    </div>
  );
}