import { useEffect, useMemo, useState } from 'react';

const emptyForm = {
  coffeeName: '',
  brewMethod: '',
  coffeeWeight: '',
  waterAmount: '',
  brewTime: '',
  rating: '',
  notes: '',
};

const METHODS = ['V60', 'Chemex', 'Aeropress', 'French Press', 'Espresso', 'Moka Pot'];

export default function BrewForm({ brew, open, saving, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setForm(brew ? { ...brew } : emptyForm);
    setTouched({});
  }, [brew, open]);

  const errors = useMemo(() => {
    const next = {};
    Object.entries(form).forEach(([key, value]) => {
      if (['id', 'createdAt', 'updatedAt'].includes(key)) return;
      if (value === null || value === undefined || String(value).trim() === '') {
        next[key] = 'This field is required';
      }
    });
    if (form.rating && (Number(form.rating) < 1 || Number(form.rating) > 5)) {
      next.rating = 'Rating must be between 1 and 5';
    }
    return next;
  }, [form]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTouched(Object.fromEntries(Object.keys(emptyForm).map((key) => [key, true])));
    if (Object.keys(errors).length > 0) return;
    onSubmit(form);
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop-custom" role="presentation" onMouseDown={onClose}>
      <div className="form-panel" role="dialog" aria-modal="true" aria-labelledby="brew-form-title" onMouseDown={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="eyebrow mb-1">Brew details</p>
            <h2 id="brew-form-title" className="h3 mb-0">{brew ? 'Edit brew' : 'Log a new brew'}</h2>
          </div>
          <button className="btn-close" type="button" onClick={onClose} aria-label="Close" />
        </div>

        <form noValidate onSubmit={handleSubmit}>
          <div className="row g-3">
            <Field label="Coffee name" name="coffeeName" value={form.coffeeName} onChange={updateField} error={touched.coffeeName && errors.coffeeName} />
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="brewMethod">Brew method</label>
              <select id="brewMethod" name="brewMethod" className={`form-select ${touched.brewMethod && errors.brewMethod ? 'is-invalid' : ''}`} value={form.brewMethod} onChange={updateField}>
                <option value="">Select a method</option>
                {METHODS.map((method) => <option key={method}>{method}</option>)}
              </select>
              <div className="invalid-feedback">{errors.brewMethod}</div>
            </div>
            <Field label="Coffee weight (g)" name="coffeeWeight" type="number" min="0.1" step="0.1" value={form.coffeeWeight} onChange={updateField} error={touched.coffeeWeight && errors.coffeeWeight} />
            <Field label="Water amount (ml)" name="waterAmount" type="number" min="0.1" step="0.1" value={form.waterAmount} onChange={updateField} error={touched.waterAmount && errors.waterAmount} />
            <Field label="Brew time (seconds)" name="brewTime" type="number" min="1" value={form.brewTime} onChange={updateField} error={touched.brewTime && errors.brewTime} />
            <Field label="Rating (1–5)" name="rating" type="number" min="1" max="5" value={form.rating} onChange={updateField} error={touched.rating && errors.rating} />
            <div className="col-12">
              <label className="form-label" htmlFor="notes">Tasting notes</label>
              <textarea id="notes" name="notes" rows="4" className={`form-control ${touched.notes && errors.notes ? 'is-invalid' : ''}`} value={form.notes} onChange={updateField} placeholder="Chocolate, berries, bright acidity…" />
              <div className="invalid-feedback">{errors.notes}</div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-coffee" disabled={saving || Object.keys(errors).length > 0}>
              {saving ? 'Saving…' : brew ? 'Save changes' : 'Create brew'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type = 'text', value, onChange, error, ...props }) {
  return (
    <div className="col-12 col-md-6">
      <label className="form-label" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} className={`form-control ${error ? 'is-invalid' : ''}`} value={value ?? ''} onChange={onChange} {...props} />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
}
