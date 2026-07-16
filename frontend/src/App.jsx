import { useEffect, useState } from 'react';
import BrewFilter from './components/BrewFilter.jsx';
import BrewForm from './components/BrewForm.jsx';
import BrewList from './components/BrewList.jsx';
import { createBrew, deleteBrew, fetchBrews, updateBrew } from './services/brewService.js';

export default function App() {
  const [brews, setBrews] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedBrew, setSelectedBrew] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [message, setMessage] = useState(null);

  async function loadBrews(method = filter) {
    setLoading(true);
    try {
      setBrews(await fetchBrews(method));
      setMessage(null);
    } catch (error) {
      setMessage({ type: 'danger', text: error.response?.data?.message || 'Could not load brews.' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBrews(filter);
  }, [filter]);

  function openCreate() {
    setSelectedBrew(null);
    setFormOpen(true);
  }

  function openEdit(brew) {
    setSelectedBrew(brew);
    setFormOpen(true);
  }

  async function saveBrew(payload) {
    setSaving(true);
    try {
      if (selectedBrew) {
        await updateBrew(selectedBrew.id, payload);
        setMessage({ type: 'success', text: 'Brew updated successfully.' });
      } else {
        await createBrew(payload);
        setMessage({ type: 'success', text: 'Brew created successfully.' });
      }
      setFormOpen(false);
      await loadBrews();
    } catch (error) {
      setMessage({ type: 'danger', text: error.response?.data?.message || 'Could not save the brew.' });
    } finally {
      setSaving(false);
    }
  }

  async function removeBrew(brew) {
    const confirmed = window.confirm(`Delete “${brew.coffeeName}”? This cannot be undone.`);
    if (!confirmed) return;
    try {
      await deleteBrew(brew.id);
      setMessage({ type: 'success', text: 'Brew deleted.' });
      await loadBrews();
    } catch (error) {
      setMessage({ type: 'danger', text: error.response?.data?.message || 'Could not delete the brew.' });
    }
  }

  return (
    <>
      <header className="hero">
        <div className="container py-5">
          <div className="row align-items-end g-4">
            <div className="col-lg-8">
              <p className="eyebrow">Micro-roastery journal</p>
              <h1 className="display-4 fw-bold mb-3">Brews: {brews.length}</h1>
              <p className="lead mb-0">Track recipes, record tasting notes, and refine every cup.</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <button className="btn btn-coffee btn-lg" onClick={openCreate}>
                <i className="bi bi-plus-lg me-2" />Log a brew
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-5">
        {message && (
          <div className={`alert alert-${message.type} alert-dismissible`} role="alert">
            {message.text}
            <button type="button" className="btn-close" onClick={() => setMessage(null)} aria-label="Close" />
          </div>
        )}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
          <div>
            <p className="eyebrow mb-1">Your coffee history</p>
            <h2 className="h3 mb-0">Brew log</h2>
          </div>
          <BrewFilter value={filter} onChange={setFilter} />
        </div>
        <BrewList brews={brews} loading={loading} onEdit={openEdit} onDelete={removeBrew} />
      </main>

      <BrewForm brew={selectedBrew} open={formOpen} saving={saving} onClose={() => setFormOpen(false)} onSubmit={saveBrew} />
    </>
  );
}
