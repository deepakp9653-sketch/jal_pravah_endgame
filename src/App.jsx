import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';
import IntroPage from './components/IntroPage';
import HomePage from './components/HomePage';
import PMRSDashboard from './components/PMRSDashboard';
import FloodPredictor from './components/FloodPredictor';
import CitizenReport from './components/CitizenReport';
import AdminPanel from './components/AdminPanel';
import HistoricalData from './components/HistoricalData';
import EmergencyButton from './components/EmergencyButton';
import AlertBanner from './components/AlertBanner';

export default function App() {
  const [showApp, setShowApp] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [alertLevel, setAlertLevel] = useState('moderate');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
          <div id="google_translate_element" style={{ marginLeft: '0.2rem' }}></div>
        </div>
        
        <button className="nav-emergency-btn" onClick={() => document.getElementById('sos-btn')?.click()}>
          🆘 SOS
        </button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </nav>

      <AlertBanner level={alertLevel} />

      <div className="page-container" style={{ paddingTop: alertLevel !== 'none' ? '0' : '0' }}>
        <Routes>
          <Route path="/" element={<HomePage alertLevel={alertLevel} setAlertLevel={setAlertLevel} />} />
          <Route path="/pmrs" element={<PMRSDashboard />} />
          <Route path="/predictor" element={<FloodPredictor />} />
          <Route path="/report" element={<CitizenReport />} />
          <Route path="/history" element={<HistoricalData />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>

      <EmergencyButton />
    </Router>
  );
}
