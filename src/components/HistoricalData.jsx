import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { yamunaHistory, DANGER_LEVEL, WARNING_LEVEL, HFL_2023, HFL_1978 } from '../data/yamunaHistory';
import { drains } from '../data/drains';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    const d = payload[0]?.payload;
    return (
      <div style={{ background: 'rgba(15,23,42,0.97)', border: '1px solid rgba(59,130,246,0.4)', borderRadius: '10px', padding: '0.75rem 1rem', fontSize: '0.85rem' }}>
        <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '0.3rem' }}>{d.date || d.year}</div>
        <div style={{ color: d.exceeded_danger ? '#FCA5A5' : '#60A5FA' }}>Water Level: <strong>{d.gauge}m</strong></div>
        {d.discharge && <div style={{ color: 'var(--text-secondary)' }}>Discharge: {d.discharge?.toLocaleString()} cusecs</div>}
        {d.notable && <div style={{ color: '#FCD34D', marginTop: '0.3rem', fontWeight: 600 }}>⚠️ {d.notable}</div>}
      </div>
    );
  }
  return null;
};

export default function HistoricalData() {
  const [view, setView] = useState('yamuna');
  const [zoom, setZoom] = useState('all');

  const filtered = zoom === 'all' ? yamunaHistory
    : zoom === '20yr' ? yamunaHistory.filter(d => d.year >= 2005)
    : yamunaHistory.filter(d => d.year >= 2015);

  const dangerYears = yamunaHistory.filter(d => d.exceeded_danger).length;
  const avgLevel = (yamunaHistory.reduce((s, d) => s + d.gauge, 0) / yamunaHistory.length).toFixed(2);

  return (
    <div style={{ padding: '1.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <h1 className="section-title">📈 Historical Flood Data — Delhi</h1>
      <p className="section-subtitle">62 years of Yamuna water level records (1963–2024) and drain infrastructure data from FCO 2025</p>

      {/* Tab */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {[{id:'yamuna',label:'🌊 Yamuna Levels'},{id:'drains',label:'🏗️ Drain Capacities'}].map(t => (
          <button key={t.id} className={`btn ${view === t.id ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '50px', fontSize: '0.85rem', padding: '0.5rem 1.2rem' }} onClick={() => setView(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {view === 'yamuna' && (
        <div>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { v: `${dangerYears}/${yamunaHistory.length}`, l: 'Years Exceeded Danger Level', c: '#DC2626' },
              { v: `${avgLevel}m`, l: 'Average Max Water Level', c: 'var(--primary-light)' },
              { v: `${HFL_2023}m`, l: 'All-Time HFL (Jul 2023)', c: '#F97316' },
              { v: `${DANGER_LEVEL}m`, l: 'Danger Level (CWC)', c: '#EAB308' },
              { v: '36–72 hrs', l: 'Hathni Kund to Delhi Travel Time', c: 'var(--success)' },
              { v: '1 lakh', l: 'First Warning Discharge (cusecs)', c: 'var(--accent)' },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-value" style={{ background: `linear-gradient(135deg, ${s.c}, ${s.c}80)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '1.5rem' }}>{s.v}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Zoom Controls */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', alignSelf: 'center' }}>Time Range:</span>
            {[{id:'all',label:'62 Years (1963–2024)'},{id:'20yr',label:'Last 20 Years'},{id:'10yr',label:'Last 10 Years'}].map(z => (
              <button key={z.id} className={`district-chip ${zoom === z.id ? 'active' : ''}`} onClick={() => setZoom(z.id)}>{z.label}</button>
            ))}
          </div>

          {/* Main Chart */}
          <div className="history-chart-wrap">
            <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '1rem' }}>
              Maximum Yamuna Water Level at Old Railway Bridge (1963–2024)
            </div>
            <ResponsiveContainer width="100%" height={380}>
              <AreaChart data={filtered} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGauge" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="#475569" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis domain={[200, 210]} stroke="#475569" tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={v => `${v}m`} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={DANGER_LEVEL} stroke="#DC2626" strokeDasharray="6 3" label={{ value: `Danger ${DANGER_LEVEL}m`, position: 'insideTopRight', fill: '#FCA5A5', fontSize: 11 }} />
                <ReferenceLine y={WARNING_LEVEL} stroke="#EAB308" strokeDasharray="6 3" label={{ value: `Warning ${WARNING_LEVEL}m`, position: 'insideTopRight', fill: '#FDE047', fontSize: 11 }} />
                <Area type="monotone" dataKey="gauge" stroke="#3B82F6" strokeWidth={2} fill="url(#colorGauge)"
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    const color = payload.exceeded_danger ? '#DC2626' : '#3B82F6';
                    return <circle key={`dot-${payload.year}`} cx={cx} cy={cy} r={payload.notable ? 6 : 3} fill={color} stroke={payload.notable ? '#FCD34D' : color} strokeWidth={payload.notable ? 2 : 0} />;
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
              <div className="legend-item"><div className="legend-dot" style={{ background: '#3B82F6' }}></div><span style={{ fontSize: '0.8rem' }}>Below danger level</span></div>
              <div className="legend-item"><div className="legend-dot" style={{ background: '#DC2626' }}></div><span style={{ fontSize: '0.8rem' }}>Exceeded danger level</span></div>
              <div className="legend-item"><div className="legend-dot" style={{ background: '#FCD34D', border:'2px solid #FCD34D', borderRadius:'50%' }}></div><span style={{ fontSize: '0.8rem' }}>Notable flood year</span></div>
            </div>
          </div>

          {/* Notable Floods Timeline */}
          <div className="glass-card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '1rem' }}>Notable Flood Years</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {yamunaHistory.filter(d => d.notable).map(d => (
                <div key={d.year} style={{ padding: '1rem', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: '12px' }}>
                  <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: '1.4rem', color: '#FCA5A5' }}>{d.year}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#DC2626', marginBottom: '0.3rem' }}>{d.gauge}m</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{d.notable}</div>
                  {d.discharge && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{d.discharge.toLocaleString()} cusecs</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'drains' && (
        <div>
          {/* Drain Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { v: '3,692 km', l: 'Total Drain Length Delhi', c: 'var(--primary-light)' },
              { v: '2,846', l: 'Total Drains (4ft+)', c: 'var(--accent)' },
              { v: '56', l: 'Major I&FC Drains', c: 'var(--success)' },
              { v: '10,000', l: 'Max Najafgarh Drain Discharge (cusecs)', c: '#F97316' },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-value" style={{ background: `linear-gradient(135deg, ${s.c}, ${s.c}80)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '1.4rem' }}>{s.v}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Drain Capacity Bar Chart */}
          <div className="history-chart-wrap">
            <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '1rem' }}>Top 15 Drains by Design Discharge (cusecs)</div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={drains.sort((a,b) => (b.discharge||0)-(a.discharge||0)).slice(0,15)} layout="vertical" margin={{ top: 0, right: 20, left: 120, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#475569" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis type="category" dataKey="name" stroke="#475569" tick={{ fontSize: 10, fill: '#94A3B8' }} width={115} />
                <Tooltip formatter={(v) => [`${v?.toLocaleString()} cusecs`, 'Design Discharge']} contentStyle={{ background: 'rgba(15,23,42,0.97)', border: '1px solid rgba(59,130,246,0.4)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="discharge" stroke="#F59E0B" fill="rgba(245,158,11,0.15)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Department-wise Length Table */}
          <div className="glass-card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '1rem' }}>Department-wise Drain Length (FCO 2025 — Annexure A)</div>
            {[
              { dept: 'PWD', drains: 1375, length_km: 2064 },
              { dept: 'Delhi Municipal Corporation (MCD)', drains: 483, length_km: 625 },
              { dept: 'New Delhi Municipal Council (NDMC)', drains: 261, length_km: '-' },
              { dept: 'Delhi Development Authority (DDA)', drains: 124, length_km: 251 },
              { dept: 'Irrigation & Flood Control (I&FC)', drains: 77, length_km: 419 },
              { dept: 'DSIIDC', drains: 350, length_km: 98 },
              { dept: 'Delhi Cantonment Board', drains: 33, length_km: 39 },
              { dept: 'NTPC', drains: 1, length_km: 3 },
            ].map((r, i) => (
              <div key={i} className="rank-row">
                <span className="rank-num" style={{ color: '#F59E0B' }}>#{i+1}</span>
                <span className="rank-name">{r.dept}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{r.drains} drains</span>
                <span style={{ fontFamily: 'Inter', fontWeight: 600, color: 'var(--primary-light)', width: '80px', textAlign: 'right' }}>{r.length_km} km</span>
              </div>
            ))}
            <div style={{ display:'flex', justifyContent:'space-between', padding:'0.75rem 1rem', marginTop:'0.5rem', fontSize:'0.85rem', fontWeight:700, borderTop:'1px solid var(--border)', color:'var(--accent)' }}>
              <span>TOTAL</span><span>2,846 drains</span><span>3,692 km</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
