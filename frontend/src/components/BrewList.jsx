import BrewCard from './BrewCard.jsx';

export default function BrewList({ brews, loading, onEdit, onDelete }) {
  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border" role="status" /></div>;
  }

  if (brews.length === 0) {
    return (
      <div className="empty-state text-center p-5">
        <div className="display-5 mb-3">☕</div>
        <h2 className="h4">No brews found</h2>
        <p className="text-secondary mb-0">Create your first brew or change the selected filter.</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {brews.map((brew) => (
        <div className="col-12 col-md-6 col-xl-4" key={brew.id}>
          <BrewCard brew={brew} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
