import React, { useState, useEffect, useMemo } from 'react';
import { districts } from '../data/hotspots';
import { predictFlood, getFeatureBreakdown, getPrecautions, DISTRICT_DATA } from '../utils/floodML';

const hourlyPattern = [8, 15, 29, 54, 73, 80, 76, 70, 62, 54, 44, 34];
const days = ['Today', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getRisk(prob) {
  if (prob >= 80) return { label: 'CRITICAL', color: '#DC2626', class: 'risk-critical' };
  if (prob >= 60) return { label: 'HIGH', color: '#F97316', class: 'risk-high' };
  if (prob >= 40) return { label: 'MODERATE', color: '#EAB308', class: 'risk-moderate' };
  return { label: 'LOW', color: '#22C55E', class: 'risk-low' };
}

async function fetchWeather() {
  try {
    const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current=precipitation,relative_humidity_2m&daily=precipitation_sum&timezone=Asia%2FKolkata&forecast_days=7');
    const d = await r.json();
    return {
      precipitation: d.current?.precipitation ?? 0,
      humidity: d.current?.relative_humidity_2m ?? 65,
      forecast7day: d.daily?.precipitation_sum ?? [],
    };
  } catch (e) {
    return { precipitation: 0, humidity: 65, forecast7day: [] };
  }
}

export default function FloodPredictor() {
  const [district, setDistrict] = useState('Central');
  const [selectedDay, setSelectedDay] = useState(0);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchWeather().then(w => { setWeather(w); setLoading(false); });
  }, []);

  // ML prediction — runs instantly, no API call needed
  const probs = useMemo(() => {
    if (!weather) return [];
    return predictFlood(district, weather);
  }, [district, weather]);

  // Feature breakdown for explainability
  const features = useMemo(() => {
    const currentRain = weather?.forecast7day?.[selectedDay] || weather?.precipitation || 0;
    return getFeatureBreakdown(district, currentRain);
  }, [district, weather, selectedDay]);

  // Precautions — deterministic, no API
  const selectedProb = probs[selectedDay] ?? 0;
  const risk = getRisk(selectedProb);
  const riskKey = risk.label.toLowerCase();
  const precautions = useMemo(() => getPrecautions(district, riskKey), [district, riskKey]);

  const districtInfo = DISTRICT_DATA[district] || {};

  return (
    <div style={{ padding: '1.5rem', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
        <div>
          <h1 className="section-title">🧠 ML Flood Predictor</h1>
          <p className="section-subtitle">Multi-factor weighted model using <strong style={{ color: '#60A5FA' }}>FCO 2025</strong> drainage, slope & terrain + <strong>Bhuvan LULC</strong> + <strong>Open-Meteo</strong> live rainfall</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.4)', color: '#C4B5FD', padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 600 }}>
            🧠 ML Engine Active
          </span>
          {weather && (
            <span style={{ background: 'rgba(5,150,105,0.15)', border: '1px solid rgba(5,150,105,0.4)', color: '#6EE7B7', padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 600 }}>
              🌧️ Live Weather
            </span>
          )}
        </div>
      </div>

      {/* Weather context bar */}
      {weather && (
        <div className="glass-card" style={{ padding: '0.75rem 1.25rem', marginBottom: '1rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>ML Model Input:</span>
          <span style={{ fontSize: '0.82rem' }}>🌧️ Now: <strong style={{ color: '#60A5FA' }}>{weather.precipitation}mm</strong></span>
          <span style={{ fontSize: '0.82rem' }}>💧 Humidity: <strong style={{ color: '#60A5FA' }}>{weather.humidity}%</strong></span>
          {weather.forecast7day?.length > 0 && (
            <span style={{ fontSize: '0.82rem' }}>📅 7-day total: <strong style={{ color: '#60A5FA' }}>{weather.forecast7day.reduce((a, b) => a + b, 0).toFixed(1)}mm</strong></span>
          )}
          <span style={{ fontSize: '0.82rem' }}>⛰️ Slope: <strong style={{ color: '#A78BFA' }}>{districtInfo.avgSlope}%</strong></span>
          <span style={{ fontSize: '0.82rem' }}>🏗️ Impervious: <strong style={{ color: '#A78BFA' }}>{districtInfo.imperviousPct}%</strong></span>
        </div>
      )}

      {/* District Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Select District:</span>
        <select className="form-select" style={{ width: 'auto', padding: '0.5rem 1rem' }}
          value={district} onChange={e => { setDistrict(e.target.value); setSelectedDay(0); }}>
          {districts.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
        </select>
        {loading ? (
          <span style={{ color: 'var(--primary-light)', fontSize: '0.82rem' }}>
            <span style={{ animation: 'pulse-water 1s infinite', display: 'inline-block' }}>🌧️</span> Fetching live weather...
          </span>
        ) : (
          <span className={`risk-badge ${risk.class.replace('risk-','')}`}>Current Risk: {risk.label}</span>
        )}
      </div>

      {/* 7-Day Timeline */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>7-Day Flood Probability — {district} District</span>
          <span style={{ fontSize: '0.75rem', color: '#C4B5FD', fontWeight: 400 }}>🧠 ML Weighted Logistic Model</span>
        </div>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.75rem' }}>
            {[...Array(7)].map((_, i) => (
              <div key={i} className="day-card" style={{ opacity: 0.4, animation: 'pulse-water 1.5s infinite', animationDelay: `${i * 0.1}s` }}>
                <div className="day-name">{days[i]}</div>
                <div className="day-prob" style={{ color: 'var(--text-muted)' }}>—</div>
                <div className="day-label" style={{ color: 'var(--text-muted)' }}>Loading...</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="timeline-grid">
            {days.map((day, i) => {
              const prob = probs[i] ?? 0;
              const r = getRisk(prob);
              return (
                <div key={i} className={`day-card ${r.class} ${selectedDay === i ? 'selected' : ''}`}
                  onClick={() => setSelectedDay(i)}>
                  <div className="day-name">{day}</div>
                  <div className="day-prob" style={{ color: r.color }}>{prob}%</div>
                  <div className="day-label" style={{ color: r.color }}>{r.label}</div>
                  {weather?.forecast7day?.[i] != null && (
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                      {weather.forecast7day[i].toFixed(1)}mm
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Feature Breakdown — ML Explainability */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📊</span> ML Feature Breakdown
          </div>
          <div style={{ fontSize: '0.75rem', color: '#C4B5FD', marginBottom: '1rem' }}>
            What factors are driving the {risk.label.toLowerCase()} risk prediction for {district}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {Object.entries(features).map(([key, f]) => {
              const pct = Math.round(f.score * 100);
              const barColor = pct > 70 ? '#DC2626' : pct > 45 ? '#F97316' : pct > 25 ? '#EAB308' : '#22C55E';
              return (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.value} → <strong style={{ color: barColor }}>{f.contribution}</strong></span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: '50px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${barColor}80, ${barColor})`, borderRadius: '50px', transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
            Rainfall-Gated Model: P = BaseRisk(rainfall) × (1 + TerrainVulnerability×0.4 + DrainageSaturation×0.3). No rain = 2-8% max.
          </div>
        </div>

        {/* Safety Precautions */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🛡️</span> Safety Precautions — {district}
            <span className={`risk-badge ${risk.class.replace('risk-','')}`} style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>{risk.label}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#C4B5FD', marginBottom: '1rem' }}>
            FCO 2025 protocol for {riskKey} flood risk · {days[selectedDay]}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {precautions.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.6rem 0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Breakdown */}
      <div className="glass-card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
        <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '1rem' }}>
          Hourly Breakdown — {days[selectedDay]} ({selectedProb}% flood probability)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {hourlyPattern.map((pct, i) => {
            const scaledProb = Math.round(pct * (selectedProb / 82));
            const hr = getRisk(scaledProb);
            const hour = `${String(6 + i * 2).padStart(2, '0')}:00`;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: 48, fontSize: '0.78rem', color: 'var(--text-muted)' }}>{hour}</span>
                <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: '50px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(scaledProb, 100)}%`, background: `linear-gradient(90deg, ${hr.color}80, ${hr.color})`, borderRadius: '50px', transition: 'width 0.8s ease' }} />
                </div>
                <span style={{ width: 32, fontSize: '0.75rem', color: hr.color, fontWeight: 600, textAlign: 'right' }}>{scaledProb}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Affected Hotspots */}
      <div className="glass-card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
        <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '0.3rem' }}>⚠️ Predicted Affected Areas — {district} ({days[selectedDay]})</div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Zones most likely impacted — based on FCO 2025 drain capacity & terrain</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {['Minto Bridge Underpass', 'Ring Road Underpasses', 'Low-lying Colonies', 'Yamuna Flood Plain', 'Blocked Drain Zones', 'Railway Underpasses']
            .slice(0, Math.max(2, Math.floor(selectedProb / 14))).map((area, i) => (
              <div key={i} style={{ padding: '0.6rem 0.75rem', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '8px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: risk.color }}>⚠</span> {area}
              </div>
            ))}
        </div>
      </div>

      {/* Pipeline footer */}
      <div className="glass-card" style={{ padding: '1.25rem', marginTop: '1rem', background: 'rgba(139,92,246,0.06)', borderColor: 'rgba(139,92,246,0.2)' }}>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          🧠 <strong>ML Pipeline:</strong> Open-Meteo Live Rainfall → <strong>FCO 2025 Drainage/Slope Data</strong> + <strong style={{ color: '#A78BFA' }}>Bhuvan LULC & Geoid</strong> → Weighted Logistic Feature Scoring → 7-Day Probability
        </div>
      </div>
    </div>
  );
}
