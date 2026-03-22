import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './index.css';
import IntroPage from './components/IntroPage';
import HomePage from './components/HomePage';
import PMRSDashboard from './components/PMRSDashboard';
import FloodPredictor from './components/FloodPredictor';
import CitizenReport from './components/CitizenReport';
import AdminPanel from './components/AdminPanel';
import HistoricalData from './components/HistoricalData';
import AlertBanner from './components/AlertBanner';
import CitizenRisk from './components/CitizenRisk';
import { refreshMLParams } from './utils/floodML';

export default function App() {
  const [showApp, setShowApp] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [alertLevel, setAlertLevel] = useState('moderate');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync Supabase ML parameters on app load
  useEffect(() => {
    refreshMLParams();
  }, []);

  if (!showApp) {
    return <IntroPage onStart={() => setShowApp(true)} />;
  }

  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-logo">
          <span className="logo-icon">🌊</span>
          <span className="text-gradient">JAL PRAVAH</span>
        </div>
        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} end>🗺️ Flood Map</NavLink>
          <NavLink to="/pmrs" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>📊 PMRS</NavLink>
          <NavLink to="/predictor" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>🤖 AI Predictor</NavLink>
          <NavLink to="/risk" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>📍 My Risk</NavLink>
          <NavLink to="/report" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>📝 Report Issue</NavLink>
          <NavLink to="/history" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>📈 Historical</NavLink>
          <NavLink to="/admin" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>🔐 Admin</NavLink>
          
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
            className="nav-link" style={{ background: 'var(--bg-glass)', border: `1px solid var(--border)`, cursor: 'pointer', borderRadius: '50px' }}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}>
            <span style={{ marginRight: '0.4rem', fontSize: '1.2rem' }}>🌐</span>
            <select 
              className="nav-link"
              style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: '5px', padding: '0.3rem 0.6rem', color: 'inherit', cursor: 'pointer', outline: 'none', appearance: 'none' }}
              onChange={(e) => {
                const googSelect = document.querySelector('.goog-te-combo');
                if (googSelect) {
                  googSelect.value = e.target.value;
                  googSelect.dispatchEvent(new Event('change'));
                }
              }}
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिंदी (HI)</option>
              <option value="pa">ਪੰਜਾਬੀ (PA)</option>
              <option value="ur">اردو (UR)</option>
            </select>
            <div id="google_translate_element" style={{ display: 'none' }}></div>
          </div>
        </div>
        
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </nav>

      <AlertBanner level={alertLevel} />

      <div className="page-container" style={{ paddingTop: alertLevel !== 'none' ? '0' : '0' }}>
        <Routes>
          <Route path="/" element={<HomePage alertLevel={alertLevel} setAlertLevel={setAlertLevel} />} />
          <Route path="/pmrs" element={<PMRSDashboard />} />
          <Route path="/predictor" element={<FloodPredictor />} />
          <Route path="/risk" element={<CitizenRisk />} />
          <Route path="/report" element={<CitizenReport />} />
          <Route path="/history" element={<HistoricalData />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
