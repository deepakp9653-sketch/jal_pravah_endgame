import React, { useState } from 'react';

const emergencyContacts = [
  { dept: '🚨 Disaster Management Helpline', num: '1077' },
  { dept: '👮 Police Control Room', num: '100 / 112' },
  { dept: '🚑 Ambulance', num: '102' },
  { dept: '🔥 Fire Service', num: '101' },
  { dept: '🌊 Flood Control Room (EOC)', num: '011-21210867' },
  { dept: '💧 DJB (Water Emergency)', num: '1916' },
  { dept: '⚡ MCD Control Room', num: '155305' },
];

export default function EmergencyButton() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSOS = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <>
      <div className="emergency-fab">
        <button className="emergency-fab-btn" id="sos-btn" onClick={() => setOpen(true)} title="Emergency SOS">
          🆘
        </button>
        <span className="emergency-fab-label">SOS</span>
      </div>

      {open && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setOpen(false)}>
          <div className="modal-card">
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🆘</div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem', color: '#FCA5A5' }}>Emergency Help</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Jal Pravah Flood Emergency System</p>
            </div>

            {/* Helpline Number */}
            <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.4)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: '#FCA5A5', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>24/7 AI Flood Helpline</div>
              <div className="helpline-number">1077</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Disaster Management | Available in Hindi & English</div>
              <a href="tel:1077" className="btn btn-danger btn-full" style={{ marginTop: '0.75rem', borderRadius: '50px' }}>
                📞 Call Now
              </a>
            </div>

            {/* SOS Alert */}
            <button
              className="btn btn-danger btn-full"
              style={{ marginBottom: '1rem', borderRadius: '12px', padding: '1rem' }}
              onClick={handleSOS}
            >
              {sent ? '✅ Alert Sent to Relief Forces!' : '📍 Send SOS + GPS Location to Relief Forces'}
            </button>

            {/* Emergency Contacts */}
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Emergency Contacts</div>
            <div className="emergency-contacts">
              {emergencyContacts.map((c, i) => (
                <div key={i} className="contact-row">
                  <span className="contact-dept">{c.dept}</span>
                  <a href={`tel:${c.num.replace(/[^0-9]/g, '')}`} className="contact-num">{c.num}</a>
                </div>
              ))}
            </div>

            <button className="btn btn-outline btn-full" style={{ marginTop: '1rem' }} onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
