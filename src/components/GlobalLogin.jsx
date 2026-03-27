import React, { useState } from 'react';

export default function GlobalLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsAuthenticating(true);

    // Simulate network delay for effect
    setTimeout(() => {
      // Hardcoded master credentials as requested
      if (username === 'Meghalytics' && password === 'Meghalytics@1') {
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Access denied by Jal Pravah Command Center.');
      }
      setIsAuthenticating(false);
    }, 800);
  };

  return (
    <div className="login-overlay" style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div className="login-card" style={{ maxWidth: '450px', margin: '0 auto', border: '1px solid var(--border-bright)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <img 
            src={`${import.meta.env.BASE_URL}logo_jalpravah.png`} 
            alt="Jal Pravah Logo" 
            style={{ 
              height: '80px', width: '80px', borderRadius: '50%', objectFit: 'cover', 
              border: '3px solid var(--primary-light)', background: '#fff', 
              boxShadow: '0 0 20px rgba(59,130,246,0.4)' 
            }} 
          />
        </div>
        
        <h2 className="login-title text-gradient">System Verification</h2>
        <p className="login-subtitle">Enter your command center authorization to proceed.</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '2rem' }}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Operator ID / Username</label>
            <input 
              type="text" 
              className="form-input" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. Meghalytics"
              required 
            />
          </div>
          
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Master Passcode</label>
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              required 
            />
          </div>

          {error && <div className="login-error" style={{ color: 'var(--alert-red)', fontWeight: '600' }}>⚠️ {error}</div>}

          <button 
            type="submit" 
            className="btn btn-primary btn-full" 
            style={{ marginTop: '1rem', padding: '1rem', fontSize: '1.05rem', borderRadius: '8px' }}
            disabled={isAuthenticating}
          >
            {isAuthenticating ? 'VERIFYING...' : 'AUTHORIZE ACCESS'}
          </button>
        </form>

      </div>
    </div>
  );
}
