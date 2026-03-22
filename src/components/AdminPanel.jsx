import React, { useState } from 'react';
import { drains } from '../data/drains';

const ADMIN_PASSWORD = 'JalPravah';

const mockReports = [
  { id: 1, category: 'Waterlogging', location: 'Minto Bridge, Central Delhi', severity: 'High', status: 'Pending', timestamp: '21/03/2026, 14:30', district: 'Central' },
  { id: 2, category: 'Drainage Blockage', location: 'GTK Road, Jahangirpuri', severity: 'Medium', status: 'In Progress', timestamp: '21/03/2026, 12:15', district: 'North West' },
  { id: 3, category: 'Overflowing Drain', location: 'Barapullah Flyover', severity: 'High', status: 'Resolved', timestamp: '20/03/2026, 18:45', district: 'South East' },
  { id: 4, category: 'Infrastructure Damage', location: 'Ring Road, Moolchand', severity: 'Low', status: 'Pending', timestamp: '20/03/2026, 10:00', district: 'South' },
];

const mockAlerts = [
  { id: 1, district: 'North East', type: 'Flood Warning', severity: 'Critical', message: 'Sonia Vihar LF Bund under pressure. Immediate inspection required.', timestamp: '21/03/2026, 15:00' },
  { id: 2, district: 'Central', type: 'Water Level', severity: 'High', message: 'Yamuna at 204.8m. Approaching warning level of 204.50m.', timestamp: '21/03/2026, 14:00' },
  { id: 3, district: 'Shahdara', type: 'Drain Overflow', severity: 'High', message: 'Shahdara Outfall Drain at capacity. Pumping stations alert.', timestamp: '21/03/2026, 13:00' },
];

const mockCalls = [
  { id: 1, caller: '98XXXXXXXX', location: 'Usmanpur Village, NE Delhi', urgency: 'Critical', type: 'Evacuation', status: 'Dispatched', time: '15:20' },
  { id: 2, caller: '97XXXXXXXX', location: 'Joga Bai, Okhla', urgency: 'High', type: 'Supplies', status: 'Pending', time: '14:55' },
  { id: 3, caller: '96XXXXXXXX', location: 'Yamuna Bazar, Central', urgency: 'Medium', type: 'Information', status: 'Resolved', time: '14:30' },
];

const sidebarItems = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'drainage', icon: '🏗️', label: 'Drainage Infrastructure' },
  { id: 'reports', icon: '📝', label: 'Citizen Reports' },
  { id: 'alerts', icon: '🚨', label: 'Alert History' },
  { id: 'calls', icon: '📞', label: 'Emergency Calls' },
];

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [drainFilter, setDrainFilter] = useState('all');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setLoggedIn(true);
    else { setError('Incorrect password. Try: JalPravah'); setPassword(''); }
  };

  if (!loggedIn) return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-icon">🔐</div>
        <h2 className="login-title">Admin Access</h2>
        <p className="login-subtitle">Ward Administrator Portal — Jal Pravah Flood Management System</p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="password" className="form-input" placeholder="Enter admin password"
            value={password} onChange={e => setPassword(e.target.value)} style={{ textAlign: 'center', letterSpacing: '0.2em' }} />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-full" style={{ padding: '0.9rem', borderRadius: '12px' }}>🔓 Login</button>
        </form>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>Authorised personnel only. All access is logged.</p>
      </div>
    </div>
  );

  const filteredDrains = drainFilter === 'all' ? drains : drains.filter(d => d.block === drainFilter || d.status.toLowerCase() === drainFilter);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.9rem', padding: '0.5rem 1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>ADMIN PANEL</div>
        {sidebarItems.map(item => (
          <div key={item.id} className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
            <span>{item.icon}</span> {item.label}
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid var(--border)' }}>
          <button className="btn btn-outline" style={{ width: '100%', fontSize: '0.82rem' }} onClick={() => setLoggedIn(false)}>🚪 Logout</button>
        </div>
      </div>

      {/* Content */}
      <div className="admin-content">

        {activeTab === 'dashboard' && (
          <div>
            <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Dashboard Overview</h2>
            <p className="section-subtitle">Real-time flood management summary</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[{v:'93',l:'Hotspots Tracked',c:'var(--primary-light)'},{v:'3',l:'Active Alerts',c:'#DC2626'},{v:`${mockReports.filter(r=>r.status==='Pending').length}`,l:'Pending Reports',c:'#EAB308'},{v:`${mockCalls.filter(c=>c.status==='Pending').length}`,l:'Pending Calls',c:'#F97316'},{v:'56',l:'Drains Monitored',c:'var(--success)'},{v:'7',l:'Active Sectors',c:'var(--accent)'}].map((s,i)=>(
                <div key={i} className="stat-card">
                  <div className="stat-value" style={{ background: `linear-gradient(135deg, ${s.c}, ${s.c}80)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{s.v}</div>
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </div>
            {/* Recent Alerts preview */}
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ fontFamily:'Inter', fontWeight:700, marginBottom:'1rem' }}>🚨 Recent Alerts</div>
              {mockAlerts.map(alert => (
                <div key={alert.id} style={{ display:'flex', gap:'1rem', padding:'0.75rem', borderRadius:'8px', border:'1px solid var(--border)', marginBottom:'0.5rem', background:'var(--bg-glass)' }}>
                  <span className={`risk-badge ${alert.severity.toLowerCase() === 'critical' ? 'critical' : alert.severity.toLowerCase() === 'high' ? 'high' : 'moderate'}`}>{alert.severity}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:'0.85rem', fontWeight:600 }}>{alert.type} — {alert.district}</div>
                    <div style={{ fontSize:'0.78rem', color:'var(--text-secondary)' }}>{alert.message}</div>
                  </div>
                  <div style={{ fontSize:'0.75rem', color:'var(--text-muted)' }}>{alert.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'drainage' && (
          <div>
            <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Drainage Infrastructure</h2>
            <p className="section-subtitle">All 56 major drains from FCO 2025 — Annexure B</p>
            <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'1rem' }}>
              {['all','Alipur','Kanjhawala','Najafgarh','Trans Yamuna','Mehrauli','Functional','Partial','Blocked'].map(f => (
                <button key={f} className={`district-chip ${drainFilter === f ? 'active' : ''}`} onClick={() => setDrainFilter(f.toLowerCase() === f ? f : f)}>{f}</button>
              ))}
            </div>
            <div className="glass-card" style={{ padding: 0, overflow: 'auto' }}>
              <table className="data-table">
                <thead><tr><th>#</th><th>Drain Name</th><th>Block</th><th>Length (km)</th><th>Discharge (cusecs)</th><th>Status</th></tr></thead>
                <tbody>
                  {filteredDrains.map(d => (
                    <tr key={d.id}>
                      <td style={{ color:'var(--text-muted)' }}>{d.id}</td>
                      <td style={{ fontWeight:500 }}>{d.name}</td>
                      <td><span style={{ fontSize:'0.78rem', color:'var(--primary-light)' }}>{d.block}</span></td>
                      <td>{d.length}</td>
                      <td>{d.discharge?.toLocaleString() || '—'}</td>
                      <td><span className={`status-pill ${d.status.toLowerCase()}`}>{d.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Citizen Reports</h2>
            <p className="section-subtitle">Incoming reports from field and web submissions</p>
            <div className="glass-card" style={{ padding:0, overflow:'auto' }}>
              <table className="data-table">
                <thead><tr><th>#</th><th>Category</th><th>Location</th><th>District</th><th>Severity</th><th>Status</th><th>Time</th></tr></thead>
                <tbody>
                  {mockReports.map(r => (
                    <tr key={r.id}>
                      <td style={{ color:'var(--text-muted)' }}>{r.id}</td>
                      <td style={{ fontWeight:500 }}>{r.category}</td>
                      <td style={{ fontSize:'0.82rem', color:'var(--text-secondary)' }}>{r.location}</td>
                      <td><span style={{ fontSize:'0.78rem', color:'var(--primary-light)' }}>{r.district}</span></td>
                      <td><span className={`risk-badge ${r.severity.toLowerCase() === 'high' ? 'critical' : r.severity.toLowerCase() === 'medium' ? 'moderate' : 'low'}`}>{r.severity}</span></td>
                      <td><span className={`status-pill ${r.status.toLowerCase().replace(' ','-')}`} style={{ background: r.status==='Pending'?'rgba(234,179,8,0.2)':r.status==='In Progress'?'rgba(59,130,246,0.2)':'rgba(5,150,105,0.2)', color: r.status==='Pending'?'#FDE047':r.status==='In Progress'?'#93C5FD':'#6EE7B7' }}>{r.status}</span></td>
                      <td style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>{r.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div>
            <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Alert History</h2>
            <p className="section-subtitle">All sent authority alerts and system-generated warnings</p>
            {mockAlerts.map(alert => (
              <div key={alert.id} className="glass-card" style={{ padding:'1.25rem', marginBottom:'0.75rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.5rem' }}>
                  <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
                    <span className={`risk-badge ${alert.severity.toLowerCase()}`}>{alert.severity}</span>
                    <span style={{ fontWeight:600 }}>{alert.type}</span>
                  </div>
                  <span style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>{alert.timestamp}</span>
                </div>
                <div style={{ fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.3rem' }}>📍 {alert.district} District</div>
                <div style={{ fontSize:'0.88rem' }}>{alert.message}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'calls' && (
          <div>
            <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Emergency Calls Dashboard</h2>
            <p className="section-subtitle">AI helpline inbound call log — real-time call tracking</p>
            <div className="glass-card" style={{ padding:0, overflow:'auto' }}>
              <table className="data-table">
                <thead><tr><th>Time</th><th>Caller</th><th>Location</th><th>Urgency</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {mockCalls.map(c => (
                    <tr key={c.id}>
                      <td style={{ fontFamily:'Inter', fontSize:'0.85rem' }}>{c.time}</td>
                      <td style={{ color:'var(--text-secondary)', fontSize:'0.82rem' }}>{c.caller}</td>
                      <td style={{ fontSize:'0.82rem' }}>{c.location}</td>
                      <td><span className={`risk-badge ${c.urgency.toLowerCase()}`}>{c.urgency}</span></td>
                      <td style={{ fontSize:'0.82rem' }}>{c.type}</td>
                      <td><span className="status-pill" style={{ background: c.status==='Pending'?'rgba(234,179,8,0.2)':c.status==='Dispatched'?'rgba(59,130,246,0.2)':'rgba(5,150,105,0.2)', color: c.status==='Pending'?'#FDE047':c.status==='Dispatched'?'#93C5FD':'#6EE7B7' }}>{c.status}</span></td>
                      <td><button className="btn btn-outline" style={{ padding:'0.3rem 0.6rem', fontSize:'0.75rem' }}>🎧 Listen</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
