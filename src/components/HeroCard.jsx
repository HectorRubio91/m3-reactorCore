import { useState } from "react";

export default function HeroCard({
  hero,
  onSelect,
  isCompared,
  onToggleCompare
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="hero-card">
      <button
        className="hero-image-button"
        type="button"
        onClick={() => onSelect(hero)}
        aria-label={`Ver ficha de ${hero.name}`}
      >
        {hero.image && !imageFailed ? (
          <img
            className="hero-image"
            src={hero.image}
            alt={`Retrato de ${hero.name}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="hero-image-placeholder">
            <span>{hero.name}</span>
            <span>Imagen no disponible</span>
          </div>
        )}
      </button>

      <div className="hero-card-content">
        <h3>{hero.name}</h3>

        <p className="hero-type">
          {hero.type || "Sin categoría"}
        </p>

        <div className="hero-card-footer">
          <span className="power-badge">
            Poder: {hero.power}/10
          </span>

          <button
            className="compare-toggle"
            type="button"
            aria-pressed={isCompared}
            onClick={() => onToggleCompare(hero.id)}
          >
            {isCompared ? "Seleccionado" : "Comparar"}
          </button>
        </div>
      </div>
    </article>
  );
}