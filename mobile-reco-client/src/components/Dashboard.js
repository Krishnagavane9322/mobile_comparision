import React, { useMemo, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const BRANDS = [
  'Any',
  'Samsung',
  'Apple',
  'OnePlus',
  'Xiaomi',
  'Realme',
  'Oppo',
  'Vivo',
  'Motorola',
  'Nothing',
];

const PURPOSES = [
  { key: 'photography', label: 'Photography', icon: '📷' },
  { key: 'everyday', label: 'Everyday Use', icon: '🧰' },
  { key: 'gaming', label: 'Gaming', icon: '🎮' },
  { key: 'business', label: 'Business / Work', icon: '💼' },
  { key: 'students', label: 'Students / Online Classes', icon: '🎓' },
  { key: 'creation', label: 'Content Creation', icon: '🎬' },
  { key: 'battery', label: 'Long Battery / Travel', icon: '🔋' },
  { key: '5g', label: '5G Support', icon: '📶' },
];

const Dashboard = () => {
  const [minBudget, setMinBudget] = useState(100);
  const [maxBudget, setMaxBudget] = useState(1000);
  const [selectedBrands, setSelectedBrands] = useState(['Any']);
  const [selectedPurposes, setSelectedPurposes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [compareIds, setCompareIds] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) => {
      if (brand === 'Any') return ['Any'];
      const withoutAny = prev.filter((b) => b !== 'Any');
      if (withoutAny.includes(brand)) {
        const next = withoutAny.filter((b) => b !== brand);
        return next.length === 0 ? ['Any'] : next;
      }
      return [...withoutAny, brand];
    });
  };

  const handlePurposeToggle = (key) => {
    setSelectedPurposes((prev) => (
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    ));
  };

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      setError('');
      const body = {
        minPrice: minBudget,
        maxPrice: maxBudget,
      };
      const chosenBrands = selectedBrands.filter((b) => b !== 'Any');
      if (chosenBrands.length === 1) body.brand = chosenBrands[0];
      // Purposes can later map to fields like camera rating, battery, etc.
      const { data } = await axios.post('/api/mobiles/recommend', body);
      setResults(data.items || []);
    } catch (e) {
      setError(e?.response?.data?.error || e.message || 'Failed to fetch suggestions');
    } finally {
      setLoading(false);
    }
  };

  const toggleCompare = (id) => {
    setCompareIds((prev) => (
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    ));
  };

  const comparedItems = useMemo(
    () => results.filter((m) => compareIds.includes(m._id)),
    [results, compareIds]
  );

  const highlightFor = useMemo(() => {
    const hi = { price: null, ram: null, storage: null, battery: null };
    if (comparedItems.length) {
      const maxRam = Math.max(...comparedItems.map((m) => Number(m.ram || 0)));
      const maxStorage = Math.max(...comparedItems.map((m) => Number(m.storage || 0)));
      const maxBattery = Math.max(...comparedItems.map((m) => Number(m.battery || 0)));
      const minPrice = Math.min(...comparedItems.map((m) => Number(m.price || 0)));
      hi.ram = maxRam; hi.storage = maxStorage; hi.battery = maxBattery; hi.price = minPrice;
    }
    return hi;
  }, [comparedItems]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h1 className="title">Home Dashboard</h1>
        <p className="subtitle">Find the best mobile for your needs using our smart recommendation system.</p>

        <section className="section">
          <h2 className="section-title">Budget Range</h2>
          <div className="budget-grid">
            <div className="budget-input">
              <label>Min ($)</label>
              <input type="number" value={minBudget} min={0} onChange={(e) => setMinBudget(Number(e.target.value) || 0)} />
            </div>
            <div className="budget-input">
              <label>Max ($)</label>
              <input type="number" value={maxBudget} min={0} onChange={(e) => setMaxBudget(Number(e.target.value) || 0)} />
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Brands</h2>
          <div className="brands">
            {BRANDS.map((b) => (
              <label key={b} className={"chip " + (selectedBrands.includes(b) ? 'chip-selected' : '')}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b)}
                  onChange={() => handleBrandToggle(b)}
                />
                <span>{b === 'Any' ? 'Any Brand' : b}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Purpose of Mobile</h2>
          <div className="purposes">
            {PURPOSES.map((p) => (
              <button
                key={p.key}
                className={"purpose " + (selectedPurposes.includes(p.key) ? 'purpose-selected' : '')}
                onClick={() => handlePurposeToggle(p.key)}
                type="button"
              >
                <span className="icon" aria-hidden>{p.icon}</span>
                <span className="label">{p.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section actions">
          <button className="btn primary" onClick={fetchSuggestions} disabled={loading}>
            {loading ? 'Loading...' : 'Get Suggestions'}
          </button>
          <button className="btn outline" onClick={() => setShowCompare(true)} disabled={compareIds.length < 2}>
            Compare Mobiles ({compareIds.length})
          </button>
        </section>

        {error && <div className="error">{error}</div>}

        <section className="section">
          <h2 className="section-title">Results</h2>
          {results.length === 0 ? (
            <div className="empty">No results yet. Try Get Suggestions.</div>
          ) : (
            <div className="results-grid">
              {results.map((m) => (
                <div key={m._id} className="result-card">
                  <div className="result-header">
                    <div className="result-title">{m.name || m.model || 'Mobile'}</div>
                    <div className="result-brand">{m.brand}</div>
                  </div>
                  <div className="specs">
                    <div className="spec"><span>Price:</span> ${m.price}</div>
                    <div className="spec"><span>Processor:</span> {m.processor || m.chipset || '—'}</div>
                    <div className="spec"><span>RAM:</span> {m.ram ? `${m.ram} GB` : '—'}</div>
                    <div className="spec"><span>Storage:</span> {m.storage ? `${m.storage} GB` : '—'}</div>
                    <div className="spec"><span>Camera:</span> {m.camera || m.cameraSpecs || '—'}</div>
                    <div className="spec"><span>Battery:</span> {m.battery ? `${m.battery} mAh` : '—'}</div>
                    <div className="spec"><span>OS:</span> {m.os || '—'}</div>
                    <div className="spec"><span>Features:</span> {m.features?.join(', ') || m.specialFeatures || '—'}</div>
                  </div>
                  <label className="compare-select">
                    <input type="checkbox" checked={compareIds.includes(m._id)} onChange={() => toggleCompare(m._id)} />
                    <span>Select to compare</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {showCompare && (
        <div className="modal-backdrop" onClick={() => setShowCompare(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Compare Mobiles</h3>
              <button className="icon-btn" onClick={() => setShowCompare(false)}>✕</button>
            </div>
            {comparedItems.length < 2 ? (
              <div className="empty">Select at least two mobiles to compare.</div>
            ) : (
              <div className="table-wrap">
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th>Spec</th>
                      {comparedItems.map((m) => (
                        <th key={m._id}>{m.name || m.model || 'Mobile'}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Price</td>
                      {comparedItems.map((m) => (
                        <td key={m._id} className={highlightFor.price === m.price ? 'best' : ''}>${m.price}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Processor</td>
                      {comparedItems.map((m) => (
                        <td key={m._id}>{m.processor || m.chipset || '—'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>RAM</td>
                      {comparedItems.map((m) => (
                        <td key={m._id} className={Number(m.ram) === highlightFor.ram ? 'best' : ''}>{m.ram ? `${m.ram} GB` : '—'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Storage</td>
                      {comparedItems.map((m) => (
                        <td key={m._id} className={Number(m.storage) === highlightFor.storage ? 'best' : ''}>{m.storage ? `${m.storage} GB` : '—'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Camera</td>
                      {comparedItems.map((m) => (
                        <td key={m._id}>{m.camera || m.cameraSpecs || '—'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Battery</td>
                      {comparedItems.map((m) => (
                        <td key={m._id} className={Number(m.battery) === highlightFor.battery ? 'best' : ''}>{m.battery ? `${m.battery} mAh` : '—'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>OS</td>
                      {comparedItems.map((m) => (
                        <td key={m._id}>{m.os || '—'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Special Features</td>
                      {comparedItems.map((m) => (
                        <td key={m._id}>{m.features?.join(', ') || m.specialFeatures || '—'}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


