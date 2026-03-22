import React, { useState } from 'react';

const categories = [
  { icon: '🕳️', label: 'Drainage Blockage' },
  { icon: '🌊', label: 'Overflowing Drain' },
  { icon: '🔧', label: 'Infrastructure Damage' },
  { icon: '💧', label: 'Waterlogging' },
  { icon: '🚧', label: 'Road Damage' },
  { icon: '⚠️', label: 'Other Issue' },
];

const savedReports = JSON.parse(localStorage.getItem('jalPravahReports') || '[]');

export default function CitizenReport() {
  const [form, setForm] = useState({ category: '', location: '', description: '', severity: '', contact: '' });
  const [submitted, setSubmitted] = useState(false);
  const [reports, setReports] = useState(savedReports);
  const [tab, setTab] = useState('form');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.location || !form.severity) return;
    const report = { ...form, id: Date.now(), timestamp: new Date().toLocaleString('en-IN'), status: 'Pending' };
    const updated = [report, ...reports];
    setReports(updated);
    localStorage.setItem('jalPravahReports', JSON.stringify(updated));
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ category: '', location: '', description: '', severity: '', contact: '' }); }, 3000);
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: 1200, margin: '0 auto' }}>
      <h1 className="section-title">📝 Citizen Reporting</h1>
      <p className="section-subtitle">Report drainage issues, waterlogging, or flood damage. Your report goes directly to ward administrators.</p>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {[{id:'form',label:'📋 Report Issue'},{id:'history',label:`📑 My Reports (${reports.length})`},{id:'contacts',label:'📞 Helplines'}].map(t => (
          <button key={t.id} className={`btn ${tab === t.id ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '50px', padding: '0.5rem 1.1rem', fontSize: '0.85rem' }} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'form' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>
          {/* Form */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Report Submitted!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Your report has been logged and will be reviewed by the ward administrator.</p>
              </div>
            ) : (
              <form className="report-form" onSubmit={handleSubmit}>
                {/* Category */}
                <div className="form-group">
                  <label className="form-label">Issue Category *</label>
                  <div className="category-grid">
                    {categories.map(c => (
                      <button key={c.label} type="button" className={`category-btn ${form.category === c.label ? 'selected' : ''}`}
                        onClick={() => setForm(f => ({ ...f, category: c.label }))}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{c.icon}</div>
                        <div>{c.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="form-group">
                  <label className="form-label">Location / Landmark *</label>
                  <input type="text" className="form-input" placeholder="e.g., Near Minto Bridge, Central Delhi"
                    value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} required />
                </div>

                {/* Description */}
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" placeholder="Describe the issue in detail — water level, duration, impact..."
                    value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </div>

                {/* Severity */}
                <div className="form-group">
                  <label className="form-label">Severity *</label>
                  <div className="severity-row">
                    {['Low', 'Medium', 'High'].map(s => (
                      <button key={s} type="button" className={`severity-btn ${s.toLowerCase()} ${form.severity === s ? 'selected' : ''}`}
                        onClick={() => setForm(f => ({ ...f, severity: s }))}>
                        {s === 'Low' ? '🟢' : s === 'Medium' ? '🟡' : '🔴'} {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="form-group">
                  <label className="form-label">Contact Number (Optional)</label>
                  <input type="tel" className="form-input" placeholder="For follow-up — 10-digit mobile number"
                    value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} />
                </div>

                <button type="submit" className="btn btn-primary btn-full" style={{ padding: '1rem', borderRadius: '12px', fontSize: '1rem' }}>
                  📤 Submit Report
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '0.75rem' }}>📊 Report Status</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[{label:'Total Submitted', val: reports.length, color:'var(--primary-light)'},
                  {label:'Pending Review', val: reports.filter(r=>r.status==='Pending').length, color:'#EAB308'},
                  {label:'Resolved', val: reports.filter(r=>r.status==='Resolved').length, color:'var(--success)'}].map(stat => (
                  <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--bg-glass)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.83rem', color: 'var(--text-secondary)' }}>{stat.label}</span>
                    <span style={{ fontWeight: 700, color: stat.color, fontFamily: 'Inter' }}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card" style={{ padding: '1.25rem', background: 'rgba(220,38,38,0.06)', borderColor: 'rgba(220,38,38,0.2)' }}>
              <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '0.5rem' }}>🆘 Emergency?</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>If you're in immediate danger, don't file a report — call for help now.</p>
              <a href="tel:1077" className="btn btn-danger btn-full" style={{ borderRadius: '8px' }}>📞 Call 1077</a>
            </div>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '1rem' }}>Your Submitted Reports</div>
          {reports.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No reports yet. Use the form to submit your first report.</div>
          ) : reports.map(r => (
            <div key={r.id} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', marginBottom: '0.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{r.category}</div>
                <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>📍 {r.location}</div>
                {r.description && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.description}</div>}
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>🕐 {r.timestamp}</div>
              </div>
              <div>
                <span className={`risk-badge ${r.severity?.toLowerCase() === 'high' ? 'critical' : r.severity?.toLowerCase() === 'medium' ? 'moderate' : 'low'}`}>{r.severity}</span>
                <div style={{ marginTop: '0.4rem' }}><span className="status-pill pending" style={{ background: 'rgba(234,179,8,0.2)', color: '#FDE047', padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.72rem', fontWeight: 600 }}>{r.status}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'contacts' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '1rem' }}>📞 Emergency Helplines — Delhi</div>
          {[
            { dept: '🌊 Disaster Management (24/7)', num: '1077 / 23831077', priority: true },
            { dept: '👮 Police Control Room', num: '100 / 112', priority: false },
            { dept: '🚑 Ambulance', num: '102', priority: false },
            { dept: '🔥 Fire Service', num: '101', priority: false },
            { dept: '🌊 EOC — I&FC Dept Flood', num: '011-21210867', priority: true },
            { dept: '💧 DJB Water Emergency', num: '1916', priority: false },
            { dept: '🏗️ MCD Control Room (Toll Free)', num: '155305', priority: false },
            { dept: '🚇 DMRC Helpline', num: '155370', priority: false },
            { dept: '🔌 NDMC Control Room', num: '1533', priority: false },
          ].map((c, i) => (
            <div key={i} className="contact-row" style={{ marginBottom: '0.4rem', borderRadius: '10px', background: c.priority ? 'rgba(220,38,38,0.07)' : 'var(--bg-glass)' }}>
              <span className="contact-dept">{c.dept}</span>
              <a href={`tel:${c.num.split('/')[0].trim().replace(/[^0-9]/,'')}`} className="contact-num">{c.num}</a>
            </div>
          ))}
          <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source: Delhi Flood Control Order 2025 — Emergency Control Rooms</div>
        </div>
      )}
    </div>
  );
}
