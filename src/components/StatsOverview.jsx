export default function StatsOverview({ stats }) {
  const strongestHero = stats.strongestHero;

  return (
    <section className="stats-grid" aria-label="Estadísticas del catálogo">
      <article className="stat-card">
        <p className="stat-label">Héroes encontrados</p>
        <p className="stat-value">{stats.total}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label">Poder medio</p>
        <p className="stat-value">
          {stats.total > 0 ? `${stats.averagePower}/10` : "N/A"}
        </p>
      </article>

      <article className="stat-card">
        <p className="stat-label">Más poderoso</p>
        <p className="stat-value">
          {strongestHero ? strongestHero.name : "N/A"}
        </p>
      </article>
    </section>
  );
}
