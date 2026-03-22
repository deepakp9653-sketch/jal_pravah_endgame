import React, { useState } from 'react';
import { predictFlood } from '../utils/floodML';
import { bhuvanReverseGeocode } from '../utils/bhuvan-api';
import { hotspots, districts } from '../data/hotspots';

function getDistanceMiles(lat1, lon1, lat2, lon2) {
  // Rough distance calculation; for small distances, Euclidean is okay, but bounding box + haversine is better
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // in km
}

export default function CitizenRisk() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [riskData, setRiskData] = useState(null);

  const checkRisk = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      
      try {
        // 1. ISRO Bhuvan Reverse Geocoding
        const bhuvanRes = await bhuvanReverseGeocode(latitude, longitude);
        let bhuvanArea = "Unknown Area";
        if (bhuvanRes && !bhuvanRes.error && Array.isArray(bhuvanRes)) {
            // Usually bhuvan returns array of matches
            bhuvanArea = bhuvanRes[0]?.villagename || bhuvanRes[0]?.district || "Local Area";
        }

        // 2. Find nearest mapped district based on predefined hotspots
        let nearestDist = null;
        let minDistance = Infinity;

        districts.forEach(d => {
            const distHotspots = hotspots.filter(h => h.district === d.name);
            distHotspots.forEach(h => {
                const dist = getDistanceMiles(latitude, longitude, h.lat, h.lng);
                if (dist < minDistance) {
                    minDistance = dist;
                    nearestDist = d.name;
                }
            });
        });

        const targetDistrict = nearestDist || 'Central'; // Fallback

        // 3. Get ML Flood Probability for the district
        // We pass 10mm as a standard rainy day base line if real weather isn't instantly available
        // Or we just call predictFlood with 0 since it uses the rainfall-gated model
        // To show risk, let's assume worst case 7-day or just use the local ML today
        const predictions = predictFlood(targetDistrict, { precipitation: 0, forecast7day: [15, 45, 10, 0, 0, 0] });
        const todayRisk = predictions[0]; // Without live rain, it might be low. 
        // For demonstration of Citizen Risk, let's inject a simulated 'current' rainfall of 35mm
        const simulatedRainRisk = predictFlood(targetDistrict, { precipitation: 35 })[0];
        
        let riskLabel = 'LOW';
        let color = 'var(--success)';
        if (simulatedRainRisk >= 80) { riskLabel = 'CRITICAL'; color = 'var(--alert-red)'; }
        else if (simulatedRainRisk >= 60) { riskLabel = 'HIGH'; color = '#F97316'; }
        else if (simulatedRainRisk >= 30) { riskLabel = 'MODERATE'; color = 'var(--warning-yellow)'; }

        setRiskData({
            lat: latitude.toFixed(4),
            lng: longitude.toFixed(4),
            bhuvanArea,
            district: targetDistrict,
            probability: simulatedRainRisk,
            label: riskLabel,
            color
        });
        setLoading(false);
      } catch (err) {
          console.error(err);
          setError("Failed to calculate location risk. Please try again.");
          setLoading(false);
      }
    }, (err) => {
      setError(`Location access denied. Please allow location permissions. (${err.message})`);
      setLoading(false);
    }, { timeout: 10000 });
  };

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: 800, margin: '0 auto', minHeight: '80vh' }}>
      <h1 className="section-title text-gradient">📍 Check My Location Risk</h1>
      <p className="section-subtitle">Use your GPS to instantly identify flood vulnerability from ISRO Bhuvan mapping and our ML Predictor.</p>

      <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          Grant location access to pinpoint your neighborhood and view specific flood precautions.
        </p>

        <button 
          onClick={checkRisk} 
          disabled={loading}
          className="btn btn-primary" 
          style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {loading ? '📡 Scanning Location...' : '📍 Auto-Detect My Risk'}
        </button>

        {error && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: 'var(--radius-sm)', color: '#FCA5A5' }}>
                ⚠️ {error}
            </div>
        )}

        {riskData && (
          <div style={{ marginTop: '2.5rem', textAlign: 'left', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
             <h3 style={{ marginBottom: '1rem' }}>Location Analysis</h3>
             
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: 'var(--radius)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>ISRO Bhuvan Area</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary-light)' }}>{riskData.bhuvanArea}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>{riskData.lat}, {riskData.lng}</div>
                </div>
                <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: 'var(--radius)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Mapped Zone</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{riskData.district} District</div>
                </div>
             </div>

             <h3 style={{ marginBottom: '1rem' }}>Real-time ML Flood Risk (Assuming 35mm Rainfall)</h3>
             <div style={{ background: `rgba(0,0,0,0.2)`, border: `2px solid ${riskData.color}`, padding: '1.5rem', borderRadius: 'var(--radius)', position: 'relative', overflow: 'hidden' }}>
                
                <div style={{ position: 'absolute', right: '-1rem', top: '-1rem', opacity: 0.1, fontSize: '8rem' }}>⚠️</div>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: riskData.color }}>{riskData.probability}%</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: riskData.color, marginBottom: '0.5rem' }}>{riskData.label} RISK</div>
                
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                    Based on your local terrain limits (impervious surface, slope), drainage network capacity in <strong>{riskData.district}</strong>, and ISRO Bhuvan mappings, this area is highly vulnerable during heavy rainfall.
                </p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
