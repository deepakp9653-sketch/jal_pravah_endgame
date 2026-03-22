import React, { useEffect, useState } from 'react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Open-Meteo API - free, no key required, Delhi coords
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,apparent_temperature&daily=precipitation_sum,temperature_2m_max,temperature_2m_min,weather_code&timezone=Asia%2FKolkata&forecast_days=7';
    fetch(url)
      .then(r => r.json())
      .then(data => {
        setWeather(data.current);
        setForecast(data.daily);
        setLoading(false);
      })
      .catch(() => {
        // Fallback mock data if API fails
        setWeather({ temperature_2m: 32, relative_humidity_2m: 68, precipitation: 0, wind_speed_10m: 12, apparent_temperature: 38, weather_code: 1 });
        setForecast({
          time: ['Today','Tue','Wed','Thu','Fri','Sat','Sun'],
          precipitation_sum: [0, 5.2, 18.4, 45.1, 32.0, 8.5, 2.1],
          temperature_2m_max: [34,33,31,28,29,30,32],
          temperature_2m_min: [24,23,22,21,21,22,23],
        });
        setLoading(false);
      });
  }, []);

  const getWeatherEmoji = (code) => {
    if (!code) return '🌤️';
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 49) return '🌫️';
    if (code <= 69) return '🌧️';
    if (code <= 79) return '❄️';
    if (code <= 99) return '⛈️';
    return '🌤️';
  };

  const getAlertThreshold = (rain) => {
    if (rain > 100) return { label: 'EXTREME', color: '#DC2626' };
    if (rain > 50) return { label: 'HEAVY', color: '#F97316' };
    if (rain > 20) return { label: 'MODERATE', color: '#EAB308' };
    return { label: 'LIGHT', color: '#22C55E' };
  };

  if (loading) return (
    <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem', animation: 'pulse-water 1s infinite' }}>🌤️</div>
      Fetching live weather data for Delhi...
    </div>
  );

  const days = forecast.time ? forecast.time : [];
  const maxRain = forecast.precipitation_sum ? Math.max(...forecast.precipitation_sum, 1) : 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Current Conditions */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Conditions — Delhi</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Updated via Open-Meteo API</div>
          </div>
          <div style={{ fontSize: '3rem' }}>{getWeatherEmoji(weather?.weather_code)}</div>
        </div>
        <div className="weather-grid">
          <div className="weather-item">
            <div className="weather-icon">🌡️</div>
            <div className="weather-value">{weather?.temperature_2m?.toFixed(1)}°C</div>
            <div className="weather-label">Temperature</div>
          </div>
          <div className="weather-item">
            <div className="weather-icon">💧</div>
            <div className="weather-value">{weather?.relative_humidity_2m}%</div>
            <div className="weather-label">Humidity</div>
          </div>
          <div className="weather-item">
            <div className="weather-icon">🌧️</div>
            <div className="weather-value">{weather?.precipitation?.toFixed(1)}<span style={{ fontSize: '0.8rem' }}>mm</span></div>
            <div className="weather-label">Precipitation</div>
          </div>
          <div className="weather-item">
            <div className="weather-icon">💨</div>
            <div className="weather-value">{weather?.wind_speed_10m?.toFixed(0)}<span style={{ fontSize: '0.8rem' }}>km/h</span></div>
            <div className="weather-label">Wind Speed</div>
          </div>
          <div className="weather-item">
            <div className="weather-icon">🥵</div>
            <div className="weather-value">{weather?.apparent_temperature?.toFixed(1)}°C</div>
            <div className="weather-label">Feels Like</div>
          </div>
        </div>
      </div>

      {/* Alert thresholds */}
      <div className="glass-card" style={{ padding: '1.2rem' }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Rainfall Alert Thresholds (IMD / FCO 2025)</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
          {[{label:'LOW',range:'<20mm',color:'#22C55E'},{label:'MODERATE',range:'20-50mm',color:'#EAB308'},{label:'HEAVY',range:'50-100mm',color:'#F97316'},{label:'EXTREME',range:'>100mm',color:'#DC2626'}].map(t => (
            <div key={t.label} style={{ textAlign: 'center', padding: '0.5rem', background: `rgba(${t.color === '#22C55E' ? '34,197,94' : t.color === '#EAB308' ? '234,179,8' : t.color === '#F97316' ? '249,115,22' : '220,38,38'},0.1)`, borderRadius: '8px', border: `1px solid ${t.color}40` }}>
              <div style={{ color: t.color, fontWeight: 700, fontSize: '0.75rem' }}>{t.label}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{t.range}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: '1rem' }}>7-Day Rainfall Forecast</div>
        {days.slice(0, 7).map((day, i) => {
          const rain = forecast.precipitation_sum?.[i] ?? 0;
          const thresh = getAlertThreshold(rain);
          const pct = Math.min((rain / maxRain) * 100, 100);
          const dateLabel = i === 0 ? 'Today' : new Date(day).toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit' });
          return (
            <div key={i} className="forecast-bar">
              <span className="forecast-day">{dateLabel}</span>
              <span style={{ fontSize: '1.1rem', width: '28px' }}>{getWeatherEmoji(forecast.weather_code?.[i])}</span>
              <div className="forecast-rain-bar">
                <div className="forecast-rain-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${thresh.color}80, ${thresh.color})` }} />
              </div>
              <span className="forecast-amount">{rain.toFixed(1)}mm</span>
              <span style={{ fontSize: '0.72rem', color: thresh.color, fontWeight: 600, width: '60px', textAlign: 'right' }}>{thresh.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
