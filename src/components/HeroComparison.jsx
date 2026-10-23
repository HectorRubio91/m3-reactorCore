import { useMemo, useRef, useState } from "react";
import { POWER_STATS } from "../utils/heroUtils";
import StatRow from "./StatRow";
import { useModalBehavior } from "../hooks/useModalBehavior";

export default function HeroComparison({
    heroes,
    selectedIds,
    onSelectHero,
    onClose,
}) {
    const [failedImages, setFailedImages] = useState([]);

    const closeButtonRef = useRef(null);

    useModalBehavior(onClose, closeButtonRef);

    const selectedHeroes = useMemo(
        () =>
            selectedIds.map((id) =>
                heroes.find((hero) => hero.id === id) || null
            ),
        [heroes, selectedIds]
    );

    function handleImageError(heroId) {
        setFailedImages((current) =>
            current.includes(heroId) ? current : [...current, heroId]
        );
    }

    function renderHeroSelector(slot, selectedHero) {
        return (
            <select
                value={selectedHero?.id ?? ""}
                onChange={(event) =>
                    onSelectHero(
                        slot,
                        event.target.value === ""
                            ? null
                            : Number(event.target.value)
                    )
                }
                aria-label={`Seleccionar héroe ${slot + 1}`}
            >
                <option value="">Selecciona un héroe</option>

                {heroes.map((hero) => (
                    <option
                        key={hero.id}
                        value={hero.id}
                        disabled={
                            selectedIds.includes(hero.id) &&
                            hero.id !== selectedHero?.id
                        }
                    >
                        {hero.name}
                    </option>
                ))}
            </select>
        );
    }

    function renderHeroColumn(hero, slot) {
        if (!hero) {
            return (
                <div className="comparison-column" key={slot}>
                    {renderHeroSelector(slot, null)}
                    <p className="comparison-empty">
                        Selecciona un héroe para compararlo.
                    </p>
                </div>
            );
        }

        return (
            <div className="comparison-column" key={slot}>
                {renderHeroSelector(slot, hero)}

                <div className="comparison-hero">
                    {failedImages.includes(hero.id) ? (
                        <div
                            className="hero-image-placeholder"
                            role="img"
                            aria-label={`Imagen no disponible para ${hero.name}`}
                        >
                            Imagen no disponible
                        </div>
                    ) : (
                        <img
                            src={hero.image}
                            alt={hero.name}
                            onError={() => handleImageError(hero.id)}
                        />
                    )}

                    <h3>{hero.name}</h3>
                    <p>{hero.type || "Sin categoría"}</p>
                    <strong>{hero.power}/10</strong>
                </div>

                <div className="comparison-stats">
                    {POWER_STATS.map(({ key, label }) => {
                        const opponent = selectedHeroes[1 - slot];
                        const value = Number(hero.powerstats?.[key]) || 0;
                        const opponentValue = Number(
                            opponent?.powerstats?.[key]
                        ) || 0;

                        let result = "equal";

                        if (opponent) {
                            if (value > opponentValue) {
                                result = "better";
                            } else if (value < opponentValue) {
                                result = "worse";
                            }
                        }

                        return (
                            <StatRow
                                key={key}
                                label={label}
                                value={value}
                                opponentValue={opponent ? opponentValue : undefined}
                                variant="comparison"
                                result={result}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <section
                className="comparison-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="comparison-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    ref={closeButtonRef}
                    className="modal-close"
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar comparación"
                >
                    ×
                </button>

                <h2 id="comparison-title">Comparar héroes</h2>

                <div className="comparison-columns">
                    {selectedHeroes.map((hero, slot) =>
                        renderHeroColumn(hero, slot)
                    )}
                </div>

                {selectedHeroes.every(Boolean) && (
                    <div className="comparison-result">
                        <h3>Resultado de la comparación</h3>

                        {selectedHeroes[0].power === selectedHeroes[1].power ? (
                            <p>Ambos héroes tienen el mismo poder general.</p>
                        ) : (
                            <p>
                                El héroe con mayor poder general es{" "}
                                <strong>
                                    {
                                        selectedHeroes.reduce((strongest, hero) =>
                                            hero.power > strongest.power
                                                ? hero
                                                : strongest
                                        ).name
                                    }
                                </strong>
                                .
                            </p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}