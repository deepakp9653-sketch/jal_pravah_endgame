import React from 'react';

const messages = {
  critical: '🚨 CRITICAL FLOOD ALERT: Yamuna water level exceeded 205.33m danger mark. Evacuate low-lying areas immediately. Call 1077 for help.',
  high: '⚠️ HIGH RISK: Heavy rainfall forecast. Multiple hotspots at HIGH risk. Stay vigilant. Helpline: 1077',
  moderate: '🟡 MODERATE ALERT: Pre-monsoon monitoring active. 23 waterlogging-prone areas under watch. Stay informed.',
  none: '✅ NORMAL: No active flood alerts. System monitoring all 93 hotspots across Delhi.',
};

export default function AlertBanner({ level = 'moderate' }) {
  return (
    <div className={`alert-banner ${level}`} style={{ marginTop: '64px' }}>
      <span>{messages[level]}</span>
      {(level === 'critical' || level === 'high') && (
        <a href="tel:1077" style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.82rem', fontWeight: 700 }}>
          📞 Call 1077
        </a>
      )}
    </div>
  );
}
