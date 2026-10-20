export default function LoadingState() {
  return (
    <section
      className="state-panel"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="spinner" aria-hidden="true" />

      <h2>Cargando archivo</h2>

      <p>
        Estamos recuperando los perfiles y las estadísticas
        de los personajes...
      </p>
    </section>
  );
}