export default function Header({ comparisonCount, onOpenComparison }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#" aria-label="DC Hero Database, inicio">
          DC <span>HERO DATABASE</span>
        </a>

        <button
          className="button"
          type="button"
          onClick={onOpenComparison}
          aria-label={`Abrir comparador. ${comparisonCount} héroes seleccionados`}
        >
          Comparador
          <span aria-hidden="true"> ({comparisonCount}/2)</span>
        </button>
      </div>
    </header>
  );
}