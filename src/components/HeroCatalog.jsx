import HeroCard from "./HeroCard";
import EmptyState from "./EmptyState";

export default function HeroCatalog({
  heroes,
  onSelectHero,
  comparisonIds,
  onToggleCompare,
  onClear
}) {
  if (heroes.length === 0) {
    return <EmptyState onClear={onClear} />;
  }

  return (
    <div className="hero-grid">
      {heroes.map((hero) => (
        <HeroCard
          key={hero.id}
          hero={hero}
          onSelect={onSelectHero}
          isCompared={comparisonIds.includes(hero.id)}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </div>
  );
}