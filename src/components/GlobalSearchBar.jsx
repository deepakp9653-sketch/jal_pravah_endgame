import React, { useState } from 'react';
import { useLocationContext } from '../context/LocationContext';
import { searchAndAnalyzeCity } from '../utils/dynamicLocation';

export default function GlobalSearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    setGlobalCityData, 
    setIsGlobalSearching, 
    isGlobalSearching,
    setGlobalWeather,
    setGlobalOsmDrainage 
  } = useLocationContext();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsGlobalSearching(true);
    try {
      const data = await searchAndAnalyzeCity(searchQuery);
      setGlobalCityData(data);
      if (data.drainageFeatures) {
         setGlobalOsmDrainage(data.drainageFeatures);
      }
      // Centralized weather fetch on search
      const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.lat}&longitude=${data.lon}&current=precipitation,relative_humidity_2m&daily=precipitation_sum&timezone=Asia%2FKolkata&forecast_days=7`);
      const d = await r.json();
      setGlobalWeather({
        precipitation: d.current?.precipitation ?? 0,
        humidity: d.current?.relative_humidity_2m ?? 65,
        forecast7day: d.daily?.precipitation_sum ?? [],
      });
    } catch(e) {
      alert("Search failed: " + e.message);
    }
    setIsGlobalSearching(false);
  };

  return (
    <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-dark)', padding: '0.25rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <input 
        type="text" 
        placeholder="🔭 Sync Map & AI to City..." 
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSearch()}
        style={{ width: '190px', padding: '0.2rem 0.6rem', border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', fontSize: '0.8rem' }}
        disabled={isGlobalSearching}
      />
      <button onClick={handleSearch} disabled={isGlobalSearching} className="btn-primary" style={{ border: 'none', borderRadius: '6px', padding: '0.2rem 0.6rem', cursor: isGlobalSearching ? 'wait' : 'pointer', fontSize: '0.8rem' }}>
        {isGlobalSearching ? '⏳ Scanning' : '🔍 Sync Data'}
      </button>
    </div>
  );
}
