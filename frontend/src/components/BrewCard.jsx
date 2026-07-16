function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export default function BrewCard({ brew, onEdit, onDelete }) {
  return (
    <article className="brew-card card border-0 shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <span className="method-badge">{brew.brewMethod}</span>
            <h2 className="h5 mt-3 mb-1">{brew.coffeeName}</h2>
            <small className="text-secondary">
              {new Date(brew.createdAt).toLocaleString()}
            </small>
          </div>
          <div className="rating" aria-label={`${brew.rating} out of 5 stars`}>
            {'★'.repeat(brew.rating)}{'☆'.repeat(5 - brew.rating)}
          </div>
        </div>

        <div className="brew-stats my-4">
          <div><span>Grounds</span><strong>{brew.coffeeWeight} g</strong></div>
          <div><span>Water</span><strong>{brew.waterAmount} ml</strong></div>
          <div><span>Time</span><strong>{formatTime(Number(brew.brewTime))}</strong></div>
        </div>

        <p className="text-secondary flex-grow-1 mb-4">{brew.notes}</p>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-dark flex-grow-1" onClick={() => onEdit(brew)}>
            <i className="bi bi-pencil me-2" />Edit
          </button>
          <button className="btn btn-outline-danger" onClick={() => onDelete(brew)} aria-label={`Delete ${brew.coffeeName}`}>
            <i className="bi bi-trash" />
          </button>
        </div>
      </div>
    </article>
  );
}
