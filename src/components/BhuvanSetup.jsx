import React, { useState, useEffect } from 'react';
import { getBhuvanKeys, saveBhuvanKeys, DEFAULT_BHUVAN_KEYS } from '../utils/bhuvan-api';

export default function BhuvanSetup() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [keys, setKeys] = useState({});
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    setKeys(getBhuvanKeys());
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Meghalytics') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect passcode.');
      setPassword('');
    }
  };

  const handleChange = (e) => {
    setKeys({ ...keys, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    saveBhuvanKeys(keys);
    setSavedMessage('Keys successfully saved to local storage! Data extraction will now use these keys.');
    setTimeout(() => setSavedMessage(''), 4000);
  };

  const handleReset = () => {
    setKeys(DEFAULT_BHUVAN_KEYS);
    saveBhuvanKeys(DEFAULT_BHUVAN_KEYS);
    setSavedMessage('Keys reset to defaults.');
    setTimeout(() => setSavedMessage(''), 4000);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '4rem 1.5rem', maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
        <h1 className="section-title text-gradient" style={{ fontSize: '2rem' }}>⚙️ Setup Keys</h1>
        <p className="section-subtitle">Enter admin passcode to configure Bhuvan API Integration</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <input 
            type="password" 
            placeholder="Passcode" 
            className="form-input" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            style={{ textAlign: 'center', letterSpacing: '0.2rem' }}
          />
          {error && <div style={{ color: '#EF4444', fontSize: '0.85rem' }}>{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ padding: '1rem', borderRadius: '12px' }}>Unlock Settings</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: 700, margin: '0 auto' }}>
      <h1 className="section-title text-gradient" style={{ fontSize: '2rem' }}>⚙️ Bhuvan API Configuration</h1>
      <p className="section-subtitle" style={{ marginBottom: '2rem' }}>Manage your ISRO Bhuvan Spatial & LULC access tokens directly from the frontend.</p>
      
      <div className="glass-card" style={{ padding: '2rem' }}>
        {savedMessage && (
          <div style={{ padding: '1rem', background: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.3)', color: '#6EE7B7', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
            {savedMessage}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {Object.keys(DEFAULT_BHUVAN_KEYS).map((keyName) => (
            <div key={keyName} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                {keyName.replace(/([A-Z])/g, ' $1').trim()} Token
              </label>
              <input 
                type="text" 
                name={keyName}
                value={keys[keyName] || ''} 
                onChange={handleChange}
                className="form-input" 
                style={{ fontFamily: 'monospace', color: 'var(--primary-light)' }}
              />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={handleSave} className="btn btn-primary" style={{ flex: 1, padding: '1rem' }}>💾 Save Keys</button>
          <button onClick={handleReset} className="btn btn-outline" style={{ padding: '1rem' }}>🔄 Reset to Default</button>
        </div>
      </div>
    </div>
  );
}
