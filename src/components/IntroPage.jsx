import React, { useState, useEffect } from 'react';

export default function IntroPage({ onStart }) {
  const [typedText, setTypedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  
  const fullText = "Intelligent Urban Flood Management & AI Prediction System";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(typing);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 40);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="intro-container">
      {/* Background elements */}
      <div className="water-wave wave1"></div>
      <div className="water-wave wave2"></div>
      <div className="water-wave wave3"></div>
      
      <div className="intro-content">
        <div className="intro-logo-container">
          <span className="intro-icon">🌊</span>
        </div>
        
        <h1 className="intro-title">JAL PRAVAH</h1>
        
        <p className="intro-subtitle">
          {typedText}
          <span className="cursor-blink">|</span>
        </p>

        <div className="intro-features">
          <div className="intro-feature">
            <span>🗺️</span> 93 Hotspot Monitoring
          </div>
          <div className="intro-feature">
            <span>🤖</span> Bhuvan & Gemini AI
          </div>
          <div className="intro-feature">
            <span>📊</span> PMRS Analytics
          </div>
        </div>

        <button 
          className={`intro-start-btn ${showButton ? 'visible' : ''}`}
          onClick={onStart}
        >
          Enter Dashboard <span style={{ marginLeft: '0.5rem' }}>→</span>
        </button>
      </div>
      
      <div className="intro-footer">
        Powered by Open-Meteo, FCO 2025 Data & Google AI
      </div>
    </div>
  );
}
