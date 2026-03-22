import React, { useState, useEffect, useRef } from 'react';

/**
 * SOS AI Voice Button with full-screen call overlay and live captions.
 * Uses dynamic import() for @vapi-ai/web to avoid crashing React on load.
 * Falls back to the HTML script tag Vapi widget if the SDK fails.
 */
export default function VapiSOSButton() {
  const [callState, setCallState] = useState('idle'); // idle | loading | active | error
  const [transcript, setTranscript] = useState([]);
  const [currentSpeech, setCurrentSpeech] = useState('');
  const [duration, setDuration] = useState(0);
  const vapiRef = useRef(null);
  const timerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (vapiRef.current) {
        try { vapiRef.current.stop(); } catch(e) {}
      }
    };
  }, []);

  const startCall = async () => {
    setCallState('loading');
    setTranscript([]);
    setCurrentSpeech('');
    setDuration(0);

    try {
      // Dynamic import — only loads when user clicks SOS
      const VapiModule = await import('@vapi-ai/web');
      const Vapi = VapiModule.default || VapiModule;
      const vapi = new Vapi("3ddff6eb-26e5-4d54-9b55-3140518d44e0");
      vapiRef.current = vapi;

      // Listen for transcripts
      vapi.on('message', (msg) => {
        if (msg.type === 'transcript') {
          if (msg.transcriptType === 'partial') {
            setCurrentSpeech(msg.transcript || '');
          } else if (msg.transcriptType === 'final') {
            setTranscript(prev => [...prev, {
              role: msg.role === 'assistant' ? '🤖 AI' : '🗣️ You',
              text: msg.transcript
            }]);
            setCurrentSpeech('');
          }
        }
      });

      vapi.on('call-start', () => {
        setCallState('active');
        timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
      });

      vapi.on('call-end', () => {
        setCallState('idle');
        if (timerRef.current) clearInterval(timerRef.current);
      });

      vapi.on('error', (err) => {
        console.error('Vapi error:', err);
        setCallState('error');
        if (timerRef.current) clearInterval(timerRef.current);
      });

      await vapi.start("c373f766-9804-4db8-861d-c37cd811ea33");
    } catch (err) {
      console.error('Failed to start Vapi call:', err);
      setCallState('error');
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      try { vapiRef.current.stop(); } catch(e) {}
    }
    setCallState('idle');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const formatTime = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  // ─── FULL-SCREEN CALL OVERLAY ───
  if (callState === 'active' || callState === 'loading') {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'linear-gradient(180deg, #1a0000 0%, #3b0000 40%, #7f1d1d 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        fontFamily: "'Inter', sans-serif", color: 'white',
        overflow: 'hidden',
      }}>
        {/* Top Bar */}
        <div style={{ padding: '1.5rem 2rem', width: '100%', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: '#fca5a5', letterSpacing: '0.15em', margin: 0 }}>
            {callState === 'loading' ? '📡 CONNECTING...' : '🔴 LIVE — EMERGENCY SOS'}
          </p>
          <h1 style={{ fontSize: '1.6rem', margin: '0.3rem 0 0', fontWeight: 800 }}>
            🚨 JAL PRAVAH SOS
          </h1>
          {callState === 'active' && (
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#f87171', margin: '0.5rem 0 0' }}>
              {formatTime(duration)}
            </p>
          )}
        </div>

        {/* Pulsing wave animation */}
        <div style={{ position: 'relative', width: '160px', height: '160px', margin: '1rem 0' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.6) 0%, transparent 70%)',
            animation: callState === 'active' ? 'sosPulse 1.5s ease-in-out infinite' : 'none',
          }} />
          <div style={{
            position: 'absolute', inset: '30px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #DC2626, #991B1B)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3.5rem', boxShadow: '0 0 60px rgba(220,38,38,0.5)',
          }}>
            {callState === 'loading' ? '📡' : '🎙️'}
          </div>
        </div>

        {/* Live Captions Area */}
        <div style={{
          flex: 1, width: '100%', maxWidth: '600px', overflowY: 'auto',
          padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem',
        }}>
          <p style={{ textAlign: 'center', color: '#fca5a5', fontSize: '0.75rem', letterSpacing: '0.1em', margin: '0 0 0.5rem' }}>
            — LIVE CAPTIONS —
          </p>
          {transcript.map((t, i) => (
            <div key={i} style={{
              background: t.role === '🤖 AI' ? 'rgba(220,38,38,0.2)' : 'rgba(255,255,255,0.08)',
              borderRadius: '12px', padding: '0.7rem 1rem',
              borderLeft: t.role === '🤖 AI' ? '3px solid #f87171' : '3px solid #60a5fa',
            }}>
              <span style={{ fontSize: '0.7rem', color: '#fca5a5', fontWeight: 600 }}>{t.role}</span>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.95rem', lineHeight: 1.4 }}>{t.text}</p>
            </div>
          ))}
          {currentSpeech && (
            <div style={{
              background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '0.7rem 1rem',
              borderLeft: '3px solid #fbbf24', fontStyle: 'italic', opacity: 0.8,
            }}>
              <span style={{ fontSize: '0.7rem', color: '#fbbf24' }}>✍️ Listening...</span>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.9rem' }}>{currentSpeech}</p>
            </div>
          )}
          {transcript.length === 0 && !currentSpeech && callState === 'active' && (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginTop: '2rem' }}>
              Speak now — your words will appear here...
            </p>
          )}
        </div>

        {/* End Call Button */}
        <div style={{ padding: '1.5rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <button onClick={endCall} style={{
            background: '#fff', color: '#DC2626', border: 'none',
            padding: '1rem 3rem', borderRadius: '50px', fontSize: '1.1rem',
            fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}>
            ✕ END SOS CALL
          </button>
        </div>

        {/* Keyframe injection */}
        <style>{`
          @keyframes sosPulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.4); opacity: 0.2; }
          }
        `}</style>
      </div>
    );
  }

  // ─── ERROR STATE ───
  if (callState === 'error') {
    return (
      <>
        <div style={{
          position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 9999,
          background: '#991B1B', color: 'white', padding: '1rem 1.5rem',
          borderRadius: '16px', fontSize: '0.9rem', maxWidth: '320px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}>
          <p style={{ margin: 0, fontWeight: 600 }}>⚠️ Voice agent unavailable</p>
          <p style={{ margin: '0.3rem 0 0.6rem', fontSize: '0.8rem', opacity: 0.8 }}>
            Call the Delhi Disaster Helpline directly:
          </p>
          <a href="tel:1077" style={{
            display: 'block', background: 'white', color: '#DC2626',
            textAlign: 'center', padding: '0.6rem', borderRadius: '8px',
            fontWeight: 700, textDecoration: 'none', marginBottom: '0.4rem',
          }}>📞 Call 1077</a>
          <button onClick={() => setCallState('idle')} style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.3)',
            color: 'white', width: '100%', padding: '0.5rem', borderRadius: '8px',
            cursor: 'pointer', fontSize: '0.8rem',
          }}>Dismiss</button>
        </div>
      </>
    );
  }

  // ─── IDLE SOS BUTTON ───
  return (
    <button
      onClick={startCall}
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
        animation: 'pulse-red 2s infinite',
      }}
    >
      <span style={{ fontSize: '1.4rem' }}>🚨</span>
      SOS AI VOICE
    </button>
  );
}
