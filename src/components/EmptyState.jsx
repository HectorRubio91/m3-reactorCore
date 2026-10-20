export default function EmptyState({ onClear }) {
  return (
    <section className="state-panel" aria-live="polite">
      <h2>No se han encontrado héroes</h2>

      <p>
        No hay personajes que coincidan con tu búsqueda.
        Prueba con otro nombre o cambia los filtros.
      </p>

      <button
        className="button button-primary"
        type="button"
        onClick={onClear}
      >
        Limpiar búsqueda y filtros
      </button>
    </section>
  );
}