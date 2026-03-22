import React from 'react';

/**
 * A pure-CSS SOS button that triggers the Vapi voice agent widget.
 * The actual Vapi SDK loads via a script tag in index.html (outside React).
 * This button just provides a visible, branded SOS trigger.
 */
export default function VapiSOSButton() {
  const handleClick = () => {
    // Try to click the hidden Vapi widget button
    const vapiBtn = document.querySelector('.vapi-btn') 
      || document.querySelector('[class*="vapi"]')
      || document.querySelector('iframe[src*="vapi"]');
    if (vapiBtn) {
      vapiBtn.click();
    } else {
      // Fallback: direct emergency helpline
      window.open('tel:1077', '_self');
    }
  };

  return (
    <button 
      onClick={handleClick}
      id="sos-btn"
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 9999,
        background: 'linear-gradient(135deg, #DC2626, #991B1B)',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '50px',
        fontSize: '1.1rem',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        border: '3px solid rgba(255,255,255,0.2)',
        boxShadow: '0 0 25px rgba(220,38,38,0.5), 0 4px 15px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        letterSpacing: '0.05em',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <span style={{ fontSize: '1.4rem' }}>🚨</span>
      SOS AI VOICE
    </button>
  );
}
