import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
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
          <NavLink to="/report" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>📝 Report Issue</NavLink>
          <NavLink to="/history" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>📈 Historical</NavLink>
          <NavLink to="/admin" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>🔐 Admin</NavLink>
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
