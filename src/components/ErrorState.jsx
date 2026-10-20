export default function ErrorState({ message, onRetry }) {
  return (
    <section className="state-panel" role="alert">
      <h2>No se ha podido cargar el archivo</h2>

      <p className="error-message">
        {message || "Ha ocurrido un error inesperado."}
      </p>

      <p>
        Comprueba tu conexión e inténtalo de nuevo.
      </p>

      <button
        className="button button-primary"
        type="button"
        onClick={onRetry}
      >
        Reintentar
      </button>
    </section>
  );
}