export default function HeroFilters({
  types,
  selectedType,
  onTypeChange,
  sortBy,
  onSortChange
}) {
  return (
    <div className="filters-row">
      <div className="filter-control">
        <label className="sr-only" htmlFor="hero-type-filter">
          Filtrar por tipo
        </label>

        <select
          id="hero-type-filter"
          className="filter-select"
          value={selectedType}
          onChange={(event) => onTypeChange(event.target.value)}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type === "Todos" ? "Todos los tipos" : type}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-control">
        <label className="sr-only" htmlFor="hero-sort">
          Ordenar personajes
        </label>

        <select
          id="hero-sort"
          className="filter-select"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="power-desc">Mayor poder</option>
          <option value="power-asc">Menor poder</option>
          <option value="name-asc">Nombre: A-Z</option>
          <option value="name-desc">Nombre: Z-A</option>
        </select>
      </div>
    </div>
  );
}