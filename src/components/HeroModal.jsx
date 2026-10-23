import { useRef } from "react";
import { POWER_STATS } from "../utils/heroUtils";
import { useModalBehavior } from "../hooks/useModalBehavior";
import StatRow from "./StatRow";

export default function HeroModal({ hero, onClose }) {
    const closeButtonRef = useRef(null);

    useModalBehavior(onClose, closeButtonRef);

    if (!hero) return null;

    const powerstats = hero.powerstats || {};

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="hero-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="hero-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    ref={closeButtonRef}
                    className="modal-close"
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar ventana"
                >
                    ×
                </button>

                <div className="hero-modal-content">
                    <div className="hero-modal-image">
                        <img
                            src={hero.image}
                            alt={hero.name}
                            onError={(event) => {
                                event.currentTarget.style.display = "none";
                            }}
                        />
                    </div>

                    <div className="hero-modal-info">
                        <h2 id="hero-modal-title">{hero.name}</h2>

                        <p className="hero-modal-type">
                            {hero.type || "Sin categoría"}
                        </p>

                        <div className="hero-modal-power">
                            <span>Poder general</span>
                            <strong>{hero.power}/10</strong>
                        </div>

                        <section className="hero-modal-stats">
                            <h3>Estadísticas</h3>

                            {POWER_STATS.map(({ key, label }) => (
                                <StatRow
                                    key={key}
                                    label={label}
                                    value={powerstats[key]}
                                    variant="bar"
                                />
                            ))}
                        </section>

                        <section className="hero-modal-biography">
                            <h3>Biografía</h3>

                            <p>
                                <strong>Nombre completo:</strong>{" "}
                                {hero.fullName || "Desconocido"}
                            </p>

                            <p>
                                <strong>Primera aparición:</strong>{" "}
                                {hero.firstAppearance || "Desconocida"}
                            </p>

                            <p>
                                <strong>Editorial:</strong>{" "}
                                {hero.publisher || "Desconocida"}
                            </p>

                            <p>
                                <strong>Ocupación:</strong>{" "}
                                {hero.occupation || "Desconocida"}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}