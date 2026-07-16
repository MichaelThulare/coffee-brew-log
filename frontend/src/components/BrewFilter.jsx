const METHODS = ['', 'V60', 'Chemex', 'Aeropress', 'French Press', 'Espresso', 'Moka Pot'];

export default function BrewFilter({ value, onChange }) {
  return (
    <div className="filter-panel">
      <label htmlFor="brew-filter" className="form-label mb-1 fw-semibold">
        Filter by method
      </label>
      <select
        id="brew-filter"
        className="form-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {METHODS.map((method) => (
          <option key={method || 'all'} value={method}>
            {method || 'All methods'}
          </option>
        ))}
      </select>
    </div>
  );
}
