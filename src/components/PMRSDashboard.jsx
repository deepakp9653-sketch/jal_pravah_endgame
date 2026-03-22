import React, { useState, useEffect } from 'react';
import { hotspots, districts } from '../data/hotspots';

const params = [
  { key: 'rainfall', label: 'Historical Rainfall Patterns', weight: 25, icon: '🌧️' },
  { key: 'drainage', label: 'Drainage Capacity & Conditions', weight: 35, icon: '🏗️' },
  { key: 'terrain', label: 'Terrain Elevation & Slope', weight: 20, icon: '⛰️' },
  { key: 'soil', label: 'Soil Permeability', weight: 20, icon: '🌱' },
];

// Simulated PMRS scores per district based on FCO data
const districtData = {
  'Central': { rainfall: 45, drainage: 38, terrain: 62, soil: 55, floods: ['2023','1978'], hotspotCount: 12 },
  'North': { rainfall: 58, drainage: 52, terrain: 70, soil: 60, floods: ['2023'], hotspotCount: 8 },
  'North East': { rainfall: 42, drainage: 30, terrain: 45, soil: 40, floods: ['2023','1978'], hotspotCount: 10 },
  'North West': { rainfall: 60, drainage: 55, terrain: 65, soil: 58, floods: [], hotspotCount: 7 },
  'East': { rainfall: 55, drainage: 48, terrain: 60, soil: 52, floods: ['1978'], hotspotCount: 6 },
  'West': { rainfall: 65, drainage: 60, terrain: 72, soil: 63, floods: ['1978'], hotspotCount: 5 },
  'South': { rainfall: 70, drainage: 65, terrain: 78, soil: 70, floods: [], hotspotCount: 4 },
  'South East': { rainfall: 50, drainage: 42, terrain: 55, soil: 48, floods: ['2023','1978'], hotspotCount: 9 },
  'South West': { rainfall: 62, drainage: 58, terrain: 68, soil: 62, floods: ['1978'], hotspotCount: 6 },
  'New Delhi': { rainfall: 72, drainage: 68, terrain: 80, soil: 75, floods: [], hotspotCount: 3 },
  'Shahdara': { rainfall: 40, drainage: 32, terrain: 42, soil: 38, floods: ['2023','1978'], hotspotCount: 11 },
};

function calcPMRS(data) {
  return Math.round(
    (data.rainfall * 0.25) + (data.drainage * 0.35) + (data.terrain * 0.20) + (data.soil * 0.20)
  );
}

function getRiskLabel(score) {
  if (score < 45) return { label: 'Critical', color: '#DC2626' };
  if (score < 60) return { label: 'High Risk', color: '#F97316' };
  if (score < 75) return { label: 'Moderate', color: '#EAB308' };
  return { label: 'Low Risk', color: '#22C55E' };
}

export default function PMRSDashboard() {
  const [selected, setSelected] = useState('Central');
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [selected]);

  const data = districtData[selected];
  const score = calcPMRS(data);
  const risk = getRiskLabel(score);

  // Rankings
  const rankings = Object.entries(districtData)
    .map(([name, d]) => ({ name, score: calcPMRS(d) }))
    .sort((a, b) => b.score - a.score);

  // Pie/Donut via SVG
  const circleR = 80;
  const circumference = 2 * Math.PI * circleR;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div style={{ padding: '1.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <h1 className="section-title">📊 Pre-Monsoon Readiness Score</h1>
      <p className="section-subtitle">Ward-wise flood preparedness index based on FCO 2025 drainage, terrain, rainfall, and soil data</p>

      {/* District Selector */}
      <div className="district-selector">
        {districts.map(d => (
          <button key={d.name} className={`district-chip ${selected === d.name ? 'active' : ''}`}
            onClick={() => setSelected(d.name)}>
            {d.name}
          </button>
        ))}
      </div>

      <div className="pmrs-grid">
        {/* Score Card */}
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            {selected} District
          </div>
          {/* SVG Ring */}
          <div className="pmrs-score-ring">
            <svg viewBox="0 0 200 200" width="180" height="180">
              <circle cx="100" cy="100" r={circleR} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16" />
              <circle cx="100" cy="100" r={circleR} fill="none"
                stroke={risk.color} strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={animated ? dashOffset : circumference}
                transform="rotate(-90 100 100)"
                style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
              />
            </svg>
            <div className="pmrs-score-text">
              <div className="pmrs-score-value" style={{ color: risk.color }}>{score}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>/ 100</div>
              <div style={{ fontSize: '0.75rem', color: risk.color, fontWeight: 600, marginTop: '0.2rem' }}>{risk.label}</div>
            </div>
          </div>

          {/* Flood History */}
          <div style={{ marginTop: '1.2rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>FLOOD HISTORY</div>
            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {data.floods.length > 0 ? data.floods.map(yr => (
                <span key={yr} style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', color: '#FCA5A5', padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.75rem' }}>{yr}</span>
              )) : <span style={{ color: 'var(--success)', fontSize: '0.82rem' }}>✅ No major flood history</span>}
            </div>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            {data.hotspotCount} hotspots in this district
          </div>
        </div>

        {/* Params + Rankings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Parameter Breakdown */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '1.25rem' }}>Parameter Breakdown</div>
            {params.map(p => {
              const val = data[p.key];
              return (
                <div key={p.key} className="param-bar">
                  <div className="param-label">
                    <span className="param-name">{p.icon} {p.label} <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>({p.weight}%)</span></span>
                    <span className="param-score" style={{ color: getRiskLabel(val).color }}>{val}/100</span>
                  </div>
                  <div className="param-bar-track">
                    <div className="param-bar-fill" style={{ width: animated ? `${val}%` : '0%', background: `linear-gradient(90deg, ${getRiskLabel(val).color}80, ${getRiskLabel(val).color})` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* District Rankings */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '1rem' }}>District Rankings (Best → Worst Prepared)</div>
            {rankings.map((r, i) => (
              <div key={r.name} className="rank-row" style={{ cursor: 'pointer' }} onClick={() => setSelected(r.name)}>
                <span className="rank-num" style={{ color: i < 3 ? '#F59E0B' : 'var(--text-muted)' }}>#{i + 1}</span>
                <span className="rank-name">{r.name}</span>
                <div style={{ width: 80, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: '50px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${r.score}%`, background: getRiskLabel(r.score).color, borderRadius: '50px' }} />
                </div>
                <span className="rank-score" style={{ color: getRiskLabel(r.score).color }}>{r.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
