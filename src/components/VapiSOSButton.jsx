import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';

// Initialize Vapi with the user's provided Public API Key
const vapi = new Vapi("3ddff6eb-26e5-4d54-9b55-3140518d44e0");
const ASSISTANT_ID = "c373f766-9804-4db8-861d-c37cd811ea33";

export default function VapiSOSButton() {
  const [callStatus, setCallStatus] = useState('idle');

  useEffect(() => {
    // Listen to Vapi lifecycle events
    vapi.on('call-start', () => setCallStatus('active'));
    vapi.on('call-end', () => setCallStatus('idle'));
    
    // Cleanup listeners on unmount
    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  const toggleCall = () => {
    if (callStatus === 'idle') {
      setCallStatus('loading');
      vapi.start(ASSISTANT_ID).catch((err) => {
        console.error('Vapi failed to start:', err);
        setCallStatus('idle');
      });
    } else {
      vapi.stop();
      setCallStatus('idle');
    }
  };

  return (
    <button 
      onClick={toggleCall}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 9999,
        background: '#DC2626', // Red color
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '50px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        border: '3px solid #991B1B',
        boxShadow: callStatus === 'active' 
          ? '0 0 35px rgba(220, 38, 38, 0.8)' 
          : '0 0 20px rgba(220, 38, 38, 0.4)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        animation: callStatus === 'idle' ? 'pulse-red 2s infinite' : 'none'
      }}
    >
      <span style={{ fontSize: '1.5rem', animation: callStatus === 'active' ? 'pulse 1s infinite' : 'none' }}>
        {callStatus === 'active' ? '🎙️' : '🚨'}
      </span>
      {callStatus === 'idle' ? 'SOS AI VOICE' 
        : callStatus === 'loading' ? 'Connecting...' 
        : 'END SOS CALL'}
    </button>
  );
}
