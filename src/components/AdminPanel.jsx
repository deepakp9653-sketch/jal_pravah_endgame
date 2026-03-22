import React, { useState, useEffect } from 'react';
import { drains } from '../data/drains';
import { districts } from '../data/hotspots';
import { supabase } from '../utils/supabase';

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
  { id: 'ml_params', icon: '⚙️', label: 'Drainage & ML Params' },
  { id: 'officers', icon: '👮', label: 'Ward Officers' },
  { id: 'reports', icon: '📝', label: 'Citizen Reports' },
  { id: 'alerts', icon: '🚨', label: 'Alert History' },
  { id: 'calls', icon: '📞', label: 'Emergency Calls' },
];

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ward, setWard] = useState('Central');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dynamic Supabase Auth State
  const [wardParams, setWardParams] = useState(null);
  const [officers, setOfficers] = useState([]);

  const loadOfficers = async (selectedWard) => {
    const { data } = await supabase.from('officers').select('*').eq('ward_id', selectedWard);
    if (data) setOfficers(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    setError('');
    
    // Auth against Supabase wards table
    const { data, error: dbErr } = await supabase
      .from('wards')
      .select('*')
      .eq('id', ward)
      .eq('passcode', password)
      .single();
      
    setLoadingLogin(false);
    
    if (data) {
      setLoggedIn(true);
      setWardParams(data);
      loadOfficers(ward);
    } else {
      if (dbErr && dbErr.message) {
        setError(`DB Error: ${dbErr.message} (Did you disable RLS?)`);
      } else {
        setError('Incorrect passcode for this ward.');
      }
      setPassword('');
    }
  };

  if (!loggedIn) return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-icon">🔐</div>
        <h2 className="login-title">Ward Admin Access</h2>
        <p className="login-subtitle">Jal Pravah Flood Management System</p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <select className="form-input" value={ward} onChange={e => setWard(e.target.value)}>
            {districts.map(d => <option key={d.name} value={d.name}>{d.name} Ward</option>)}
          </select>
          <input type="password" className="form-input" placeholder="Enter secure passcode"
            value={password} onChange={e => setPassword(e.target.value)} style={{ textAlign: 'center', letterSpacing: '0.2em' }} />
          {error && <p className="login-error" style={{ color: '#EF4444', fontSize: '0.85rem' }}>{error}</p>}
          <button type="submit" className="btn btn-primary btn-full" disabled={loadingLogin} style={{ padding: '0.9rem', borderRadius: '12px' }}>
            {loadingLogin ? 'Verifying...' : '🔓 Login'}
          </button>
        </form>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>Authorised personnel only.</p>
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

        {activeTab === 'ml_params' && (
          <div>
            <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>ML Drainage Parameters</h2>
            <p className="section-subtitle">Real-time variables used by the AI Predictor for {ward} Ward</p>
            
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                  <label style={{ display:'block', fontSize:'0.85rem', fontWeight:600, color:'var(--text-secondary)', marginBottom:'0.5rem' }}>Drain Capacity Override (m³/s)</label>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Update this if major desilting or widening occurs. Higher capacity safely handles more intense rainfall. Leave blank to use default.</div>
                  <div style={{ display:'flex', gap:'0.5rem' }}>
                    <input id="ml-drain-cap" type="number" className="form-input" defaultValue={wardParams?.drain_capacity_m3s || ''} placeholder="e.g. 250" style={{ maxWidth: '200px' }} />
                    <button className="btn btn-outline" onClick={async () => {
                       const val = parseInt(document.getElementById('ml-drain-cap').value);
                       if(!isNaN(val) || document.getElementById('ml-drain-cap').value === '') {
                         await supabase.from('wards').update({ drain_capacity_m3s: isNaN(val) ? null : val }).eq('id', ward);
                         alert('Drainage capacity updated! ML Predictor will now use this value.');
                       }
                    }}>Update</button>
                  </div>
                </div>
                
                <div>
                  <label style={{ display:'block', fontSize:'0.85rem', fontWeight:600, color:'var(--text-secondary)', marginBottom:'0.5rem' }}>Impervious Area Override (%)</label>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Percentage of concretized land. Reducing this (via greening projects) lowers flash flood risk. Leave blank to use default.</div>
                  <div style={{ display:'flex', gap:'0.5rem' }}>
                    <input id="ml-imp-pct" type="number" className="form-input" defaultValue={wardParams?.impervious_pct || ''} placeholder="e.g. 75" style={{ maxWidth: '200px' }} />
                    <button className="btn btn-outline" onClick={async () => {
                       const val = parseInt(document.getElementById('ml-imp-pct').value);
                       if(!isNaN(val) || document.getElementById('ml-imp-pct').value === '') {
                         await supabase.from('wards').update({ impervious_pct: isNaN(val) ? null : val }).eq('id', ward);
                         alert('Impervious percentage updated! ML Predictor will now use this value.');
                       }
                    }}>Update</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="alert-banner moderate" style={{ marginTop: '1rem', position: 'relative', width: 'auto' }}>
              <span className="alert-icon">💡</span>
              <span className="alert-text">Any numeric changes applied here are <b>immediately synced</b> to the ML Predictor across all public-facing apps.</span>
            </div>
          </div>
        )}

        {activeTab === 'officers' && (
          <div>
            <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Ward Officers</h2>
            <p className="section-subtitle">Manage emergency contact personnel for {ward} Ward</p>
            <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
              <div style={{ fontFamily:'Inter', fontWeight:600, marginBottom:'0.75rem' }}>➕ Add New Officer</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                 <input id="new-officer-name" className="form-input" placeholder="Name" style={{ flex: 1, minWidth: '150px' }} />
                 <input id="new-officer-phone" className="form-input" placeholder="Phone" style={{ flex: 1, minWidth: '150px' }} />
                 <input id="new-officer-role" className="form-input" placeholder="Role (e.g. Inspector)" style={{ flex: 1, minWidth: '150px' }} />
                 <button className="btn btn-primary" onClick={async () => {
                     const n = document.getElementById('new-officer-name').value;
                     const p = document.getElementById('new-officer-phone').value;
                     const r = document.getElementById('new-officer-role').value;
                     if(n && p) {
                       const { error } = await supabase.from('officers').insert([{ ward_id: ward, name: n, phone_number: p, role: r }]);
                       if(!error) loadOfficers(ward);
                       document.getElementById('new-officer-name').value = '';
                       document.getElementById('new-officer-phone').value = '';
                       document.getElementById('new-officer-role').value = '';
                     }
                 }}>Add Officer</button>
              </div>
            </div>
            
            <div className="glass-card" style={{ padding:0, overflow:'auto' }}>
              <table className="data-table">
                <thead><tr><th>Name</th><th>Role</th><th>Phone Number</th><th>Action</th></tr></thead>
                <tbody>
                  {officers.map(o => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 500 }}>{o.name}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{o.role || '—'}</td>
                      <td>{o.phone_number}</td>
                      <td><button className="btn btn-outline" style={{ padding:'0.2rem 0.5rem', fontSize:'0.75rem', borderColor: '#EF4444', color: '#EF4444' }} onClick={async () => {
                         await supabase.from('officers').delete().eq('id', o.id);
                         loadOfficers(ward);
                      }}>Remove</button></td>
                    </tr>
                  ))}
                  {officers.length === 0 && <tr><td colSpan="4" style={{ textAlign:'center', color:'var(--text-muted)' }}>No officers registered for this ward yet.</td></tr>}
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
