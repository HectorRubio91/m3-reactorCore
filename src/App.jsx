import { useMemo, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

import Header from "./components/Header";
import StatsOverview from "./components/StatsOverview";
import SearchBar from "./components/SearchBar";
import HeroFilters from "./components/HeroFilters";
import HeroCatalog from "./components/HeroCatalog";
import HeroModal from "./components/HeroModal";
import HeroComparison from "./components/HeroComparison";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

import { useHeroes } from "./hooks/useHeroes";
import {
  filtrarHeroes,
  ordenarHeroes,
  calcularResumen
} from "./utils/heroUtils";

export default function App() {
  const { heroes, loading, error, reload } = useHeroes();

  const [search, setSearch] = useLocalStorage("dc-hero-search", "");
  const [selectedType, setSelectedType] = useLocalStorage("dc-hero-type", "Todos");
  const [sortBy, setSortBy] = useLocalStorage("dc-hero-sort", "power-desc");
  const [selectedHeroId, setSelectedHeroId] = useState(null);
  const [storedComparisonIds, setComparisonIds] = useLocalStorage("dc-hero-comparison", [null, null]);
  const comparisonIds = Array.isArray(storedComparisonIds)
    ? [storedComparisonIds[0] ?? null, storedComparisonIds[1] ?? null]
    : [null, null];
  
  const [showComparison, setShowComparison] = useState(false);

  const selectedHero = heroes.find((hero) => hero.id === selectedHeroId) ?? null;

  const types = useMemo(() => {
    return [
      "Todos",
      ...new Set(
        heroes
          .map((hero) => hero.type)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b, "es"))
      )
    ];
  }, [heroes]);

  const filteredHeroes = useMemo(() => {
    const filtered = filtrarHeroes(heroes, search, selectedType);
    return ordenarHeroes(filtered, sortBy);
  }, [heroes, search, selectedType, sortBy]);

  const stats = useMemo(() => {
    return calcularResumen(filteredHeroes);
  }, [filteredHeroes]);

  function toggleComparison(heroId) {
    setComparisonIds((currentIds) => {
      const ids = Array.isArray(currentIds)
        ? [currentIds[0] ?? null, currentIds[1] ?? null]
        : [null, null];

      if (ids.includes(heroId)) {
        return ids.map((id) => id === heroId ? null : id);
      }

      const emptySlot = ids.indexOf(null);

      if (emptySlot !== -1) {
        const nextIds = [...ids];
        nextIds[emptySlot] = heroId;
        return nextIds;
      }

      return [ids[1], heroId];
    });
  }

  function selectComparisonHero(slot, heroId) {
    setComparisonIds((currentIds) => {
      const nextIds = Array.isArray(currentIds)
        ? [currentIds[0] ?? null, currentIds[1] ?? null]
        : [null, null];

      const otherSlot = slot === 0 ? 1 : 0;

      if (nextIds[otherSlot] === heroId) {
        nextIds[otherSlot] = nextIds[slot];
      }

      nextIds[slot] = heroId;

      return nextIds;
    });
  }
  

  function openComparison() {
    setSelectedHeroId(null);
    setShowComparison(true);
  }

  function closeComparison() {
    setShowComparison(false);
  }

  return (
    <div className="app-shell">
      <Header
        comparisonCount={comparisonIds.filter(Boolean).length}
        onOpenComparison={openComparison}
      />

      <main className="main-content">
        <section className="intro-section">
          <p className="eyebrow">JUSTICE LEAGUE DATABASE</p>
          <h1>Multiverse Archive</h1>
          <p className="intro-text">
            Explora las capacidades, los perfiles y la historia
            de los personajes del universo DC.
          </p>
        </section>

        {loading && <LoadingState />}

        {!loading && error && (
          <ErrorState message={error} onRetry={reload} />
        )}

        {!loading && !error && (
          <>
            <StatsOverview stats={stats} />

            <section className="catalog-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">CHARACTER DATABASE</p>
                  <h2>Archivo de personajes</h2>
                </div>

                <span className="result-count">
                  {filteredHeroes.length} resultados
                </span>
              </div>

              <div className="catalog-controls">
                <SearchBar
                  value={search}
                  onChange={setSearch}
                />

                <HeroFilters
                  types={types}
                  selectedType={selectedType}
                  onTypeChange={setSelectedType}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>

              <HeroCatalog
                heroes={filteredHeroes}
                onSelectHero={(hero) => setSelectedHeroId(hero.id)}
                comparisonIds={comparisonIds}
                onToggleCompare={toggleComparison}
                onClear={() => {
                  setSearch("");
                  setSelectedType("Todos");
                  setSortBy("power-desc");
                }}
              />
            </section>
          </>
        )}
      </main>

      {selectedHero && (
        <HeroModal
          hero={selectedHero}
          onClose={() => setSelectedHeroId(null)}
        />
      )}

      {showComparison && (
        <HeroComparison
          heroes={heroes}
          selectedIds={comparisonIds}
          onSelectHero={selectComparisonHero}
          onClose={closeComparison}
        />
      )}

      <footer className="site-footer">
        <p>DC HERO DATABASE</p>
        <span>Fan-made database · Unofficial DC character archive</span>
      </footer>
    </div>
  );
}
