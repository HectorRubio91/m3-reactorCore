export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <label className="sr-only" htmlFor="hero-search">
        Buscar personajes por nombre
      </label>

      <input
        id="hero-search"
        className="search-input"
        type="search"
        placeholder="Buscar un héroe..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
    </div>
  );
}