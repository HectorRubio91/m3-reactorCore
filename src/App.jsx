import { useMemo, useState } from "react";

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

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [sortBy, setSortBy] = useState("power-desc");
  const [selectedHero, setSelectedHero] = useState(null);
  const [comparisonIds, setComparisonIds] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

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
      if (currentIds.includes(heroId)) {
        return currentIds.filter((id) => id !== heroId);
      }

      if (currentIds.length >= 2) {
        return [...currentIds.slice(1), heroId];
      }

      return [...currentIds, heroId];
    });
  }

  function openComparison() {
    setSelectedHero(null);
    setShowComparison(true);
  }

  function closeComparison() {
    setShowComparison(false);
  }

  return (
    <div className="app-shell">
      <Header
        comparisonCount={comparisonIds.length}
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
                onSelectHero={setSelectedHero}
                comparisonIds={comparisonIds}
                onToggleCompare={toggleComparison}
              />
            </section>
          </>
        )}
      </main>

      {selectedHero && (
        <HeroModal
          hero={selectedHero}
          onClose={() => setSelectedHero(null)}
        />
      )}

      {showComparison && (
        <HeroComparison
          heroes={heroes}
          selectedIds={comparisonIds}
          onChangeSelection={setComparisonIds}
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
