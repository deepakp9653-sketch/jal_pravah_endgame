import React, { useState } from 'react';

/**
 * SOS Button that triggers the Vapi voice widget (loaded via index.html)
 * and shows a full-screen talking-animation overlay.
 */
export default function VapiSOSButton() {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleSOS = () => {
    // Trigger the Vapi widget button (loaded externally via index.html)
    const vapiBtn = document.querySelector('.vapi-btn')
      || document.querySelector('[id*="vapi"]')
      || document.querySelector('button[class*="vapi"]');
    if (vapiBtn) vapiBtn.click();

    setShowOverlay(true);
  };

  const handleEnd = () => {
    // Try to end the Vapi call
    const vapiBtn = document.querySelector('.vapi-btn')
      || document.querySelector('[id*="vapi"]')
      || document.querySelector('button[class*="vapi"]');
    if (vapiBtn) vapiBtn.click();

    setShowOverlay(false);
  };

  if (showOverlay) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'linear-gradient(180deg, #1a0000 0%, #450a0a 50%, #7f1d1d 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', sans-serif", color: 'white',
      }}>
        {/* Title */}
        <p style={{ fontSize: '0.8rem', color: '#fca5a5', letterSpacing: '0.2em', margin: 0 }}>
          🔴 LIVE — EMERGENCY SOS
        </p>
        <h1 style={{ fontSize: '1.8rem', margin: '0.5rem 0 2rem', fontWeight: 800, textAlign: 'center' }}>
          🚨 JAL PRAVAH SOS
        </h1>

        {/* Pulsing circles animation */}
        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
          {/* Outer pulse ring 1 */}
          <div style={{
            position: 'absolute', inset: '-20px', borderRadius: '50%',
            border: '2px solid rgba(248,113,113,0.3)',
            animation: 'sosPulse1 2s ease-out infinite',
          }} />
          {/* Outer pulse ring 2 */}
          <div style={{
            position: 'absolute', inset: '-5px', borderRadius: '50%',
            border: '2px solid rgba(248,113,113,0.5)',
            animation: 'sosPulse2 2s ease-out infinite 0.4s',
          }} />
          {/* Inner glow */}
          <div style={{
            position: 'absolute', inset: '10px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.4) 0%, transparent 70%)',
            animation: 'sosGlow 1.5s ease-in-out infinite',
          }} />
          {/* Center mic icon */}
          <div style={{
            position: 'absolute', inset: '40px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #DC2626, #991B1B)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3.5rem',
            boxShadow: '0 0 60px rgba(220,38,38,0.6)',
          }}>
            🎙️
          </div>
          {/* Sound wave bars */}
          <div style={{
            position: 'absolute', bottom: '-50px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '4px', alignItems: 'flex-end', height: '30px',
          }}>
            {[1,2,3,4,5,6,7].map(i => (
              <div key={i} style={{
                width: '4px', borderRadius: '2px',
                background: 'linear-gradient(to top, #f87171, #fca5a5)',
                animation: `soundBar 0.8s ease-in-out infinite ${i * 0.1}s`,
              }} />
            ))}
          </div>
        </div>

        {/* Status text */}
        <p style={{
          marginTop: '5rem', fontSize: '1.1rem', color: '#fca5a5',
          animation: 'fadeInOut 2s ease-in-out infinite',
        }}>
          Speak now... AI is listening
        </p>

        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>
          Delhi Disaster Helpline: 1077
        </p>

        {/* End Call */}
        <button onClick={handleEnd} style={{
          marginTop: '2.5rem',
          background: 'white', color: '#DC2626', border: 'none',
          padding: '1rem 3rem', borderRadius: '50px', fontSize: '1.1rem',
          fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 25px rgba(0,0,0,0.4)',
        }}>
          ✕ END CALL
        </button>

        <style>{`
          @keyframes sosPulse1 {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          @keyframes sosPulse2 {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          @keyframes sosGlow {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.15); }
          }
          @keyframes soundBar {
            0%, 100% { height: 6px; }
            50% { height: ${Math.random() * 20 + 10}px; }
          }
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // ─── IDLE SOS BUTTON ───
  return (
    <button
      onClick={handleSOS}
      id="sos-btn"
      style={{
        position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 9999,
        background: 'linear-gradient(135deg, #DC2626, #991B1B)',
        color: 'white', padding: '1rem 2rem', borderRadius: '50px',
        fontSize: '1.1rem', fontWeight: 700,
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        border: '3px solid rgba(255,255,255,0.2)',
        boxShadow: '0 0 25px rgba(220,38,38,0.5), 0 4px 15px rgba(0,0,0,0.3)',
        cursor: 'pointer', transition: 'all 0.3s ease',
        letterSpacing: '0.05em', fontFamily: "'Inter', sans-serif",
      }}
    >
      <span style={{ fontSize: '1.4rem' }}>🚨</span>
      SOS AI VOICE
    </button>
  );
}
