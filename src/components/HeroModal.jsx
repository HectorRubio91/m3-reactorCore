const POWER_STATS = [
  { key: "intelligence", label: "Inteligencia" },
  { key: "strength", label: "Fuerza" },
  { key: "speed", label: "Velocidad" },
  { key: "durability", label: "Resistencia" },
  { key: "power", label: "Poder" },
  { key: "combat", label: "Combate" }
];

export default function HeroModal({ hero, onClose }) {
  if (!hero) {
    return null;
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={handleBackdropClick}
    >
      <section
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hero-modal-title"
      >
        <button
          className="icon-button modal-close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar ficha del personaje"
        >
          Cerrar
        </button>

        <div className="hero-detail-layout">
          <div>
            {hero.image ? (
              <img
                className="hero-detail-image"
                src={hero.image}
                alt={`Retrato de ${hero.name}`}
              />
            ) : (
              <div className="hero-image-placeholder">
                Imagen no disponible
              </div>
            )}
          </div>

          <div>
            <p className="eyebrow">{hero.type || "Sin categoría"}</p>

            <h2 id="hero-modal-title">{hero.name}</h2>

            <p>
              <strong>Nombre completo:</strong>{" "}
              {hero.fullName || "Desconocido"}
            </p>

            <p>
              <strong>Alineación:</strong>{" "}
              {hero.alignment || "Desconocida"}
            </p>

            <p>
              <strong>Editorial:</strong>{" "}
              {hero.publisher || "Desconocida"}
            </p>

            <p>
              <strong>Primera aparición:</strong>{" "}
              {hero.firstAppearance || "Desconocida"}
            </p>

            <p>
              <strong>Lugar de nacimiento:</strong>{" "}
              {hero.placeOfBirth || "Desconocido"}
            </p>

            <p>
              <strong>Ocupación:</strong>{" "}
              {hero.occupation || "Desconocida"}
            </p>

            <p>
              <strong>Base:</strong>{" "}
              {hero.base || "Desconocida"}
            </p>

            <p>
              <strong>Altura:</strong> {hero.height || "Desconocida"}
            </p>

            <p>
              <strong>Peso:</strong> {hero.weight || "Desconocido"}
            </p>

            <p>
              <strong>Alias:</strong>{" "}
              {hero.aliases?.length
                ? hero.aliases.join(", ")
                : "Sin alias registrados"}
            </p>

            <div className="hero-power-section">
              <h3>Estadísticas</h3>

              <div className="power-stats">
                {POWER_STATS.map(({ key, label }) => {
                  const rawValue = Number(hero.powerstats?.[key]);
                  const value = Number.isFinite(rawValue)
                    ? Math.min(100, Math.max(0, rawValue))
                    : 0;

                  return (
                    <div className="power-stat-row" key={key}>
                      <span>{label}</span>

                      <div
                        className="power-stat-track"
                        role="progressbar"
                        aria-label={label}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={value}
                      >
                        <div
                          className="power-stat-fill"
                          style={{ width: `${value}%` }}
                        />
                      </div>

                      <span>{value}</span>
                    </div>
                  );
                })}
              </div>

              <p className="power-badge">
                Puntuación global: {hero.power}/10
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}