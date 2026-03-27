import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './index.css';
import IntroPage from './components/IntroPage';
import HomePage from './components/HomePage';
import DeepAnalysisMap from './components/DeepAnalysisMap';
import AdminPanel from './components/AdminPanel';
import HistoricalData from './components/HistoricalData';
import FloodMap3D from './components/FloodMap3D';
import AlertBanner from './components/AlertBanner';
import BhuvanSetup from './components/BhuvanSetup';
import GlobalSearchBar from './components/GlobalSearchBar';
import { LocationProvider } from './context/LocationContext';
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
    <LocationProvider>
      <Router>
        <nav className="navbar">
          <div className="navbar-logo">
            <img src={`${import.meta.env.BASE_URL}logo_jalpravah.png`} alt="Jal Pravah Logo" style={{ height: '36px', width: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-light)', background: '#fff' }} />
            <span className="text-gradient">JAL PRAVAH</span>
          </div>
          <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
            
            <GlobalSearchBar />

            <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} end>🗺️ Flood Map</NavLink>
          <NavLink to="/3d-map" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>🏔️ 3D Map</NavLink>
          <NavLink to="/analysis" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>🧠 Deep Analysis</NavLink>
          <NavLink to="/history" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>📈 Historical</NavLink>
          <NavLink to="/my-ward" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>🏛️ My Ward (Delhi)</NavLink>
          <NavLink to="/bhuvan-setup" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>⚙️ Bhuvan</NavLink>
          
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
            className="nav-link" style={{ background: 'var(--bg-glass)', border: `1px solid var(--border)`, cursor: 'pointer', borderRadius: '50px' }}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.5rem', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.15rem 0.5rem' }}>
            <span style={{ fontSize: '1rem', marginRight: '0.3rem' }}>🌐</span>
            <div id="google_translate_element"></div>
          </div>
        </div>
        
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </nav>

      <AlertBanner level={alertLevel} />

      <div className={`app-container ${theme}`} style={{ paddingTop: alertLevel !== 'none' ? '0' : '0' }}>
        <Routes>
          <Route path="/" element={<HomePage alertLevel={alertLevel} setAlertLevel={setAlertLevel} />} />
          <Route path="/3d-map" element={<FloodMap3D />} />
          <Route path="/analysis" element={<DeepAnalysisMap />} />
          <Route path="/history" element={<HistoricalData />} />
          <Route path="/my-ward" element={<AdminPanel />} />
          <Route path="/bhuvan-setup" element={<BhuvanSetup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      </Router>
    </LocationProvider>
  );
}
