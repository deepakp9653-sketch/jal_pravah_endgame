// Gemini API utility for Jal Pravah — Dual-Key Failover System
// Primary key provided by user, fallback key as backup
const GEMINI_KEYS = [
  'AIzaSyBtGmphiCfAmomS1B0EYKJArmQMKtzxE1o',  // Primary (new)
  'AIzaSyCSMZTcXyOuGcNK5i11mw4-6HxMJqu5LRE',  // Fallback (original)
];

const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

// Cache results to avoid repeat API calls
const predictionCache = {};
const precautionCache = {};

// Real FCO 2025 drainage and terrain data for Delhi districts
const FCO_DISTRICT_DATA = {
  'Central': { drainCount: 8, totalDrainLengthKm: 42.5, majorDrains: ['Drain No. 6', 'Tonga Stand Nala'], avgSlope: 0.15, imperviousPct: 92, elevation_m: 215, pumpingStations: 3, underpasses: ['Minto Bridge', 'Azad Market', 'IP Flyover'] },
  'North': { drainCount: 7, totalDrainLengthKm: 68.3, majorDrains: ['Supplementary Drain', 'Burari Drain'], avgSlope: 0.22, imperviousPct: 65, elevation_m: 218, pumpingStations: 4, underpasses: ['GTK Road Jahangirpuri'] },
  'North East': { drainCount: 5, totalDrainLengthKm: 38.7, majorDrains: ['Shahdara Drain', 'LF Bund Drain'], avgSlope: 0.12, imperviousPct: 78, elevation_m: 212, pumpingStations: 2, underpasses: ['Wazirabad Road'] },
  'North West': { drainCount: 9, totalDrainLengthKm: 95.2, majorDrains: ['Najafgarh Drain (upper)', 'Rohtak Road Drain'], avgSlope: 0.18, imperviousPct: 55, elevation_m: 220, pumpingStations: 5, underpasses: ['Mangolpuri Underpass'] },
  'East': { drainCount: 6, totalDrainLengthKm: 52.1, majorDrains: ['Shahdara Outfall Drain'], avgSlope: 0.14, imperviousPct: 80, elevation_m: 213, pumpingStations: 3, underpasses: ['Laxmi Nagar Metro', 'Old Patparganj'] },
  'West': { drainCount: 7, totalDrainLengthKm: 61.8, majorDrains: ['Najafgarh Drain (lower)', 'Keshopur Drain'], avgSlope: 0.20, imperviousPct: 62, elevation_m: 217, pumpingStations: 4, underpasses: ['Zakhira Flyover', 'Raja Garden'] },
  'South': { drainCount: 10, totalDrainLengthKm: 88.4, majorDrains: ['Barapullah Drain', 'MB Road Drain'], avgSlope: 0.25, imperviousPct: 58, elevation_m: 222, pumpingStations: 6, underpasses: ['Pul Prahladpur', 'Chirag Delhi'] },
  'South East': { drainCount: 6, totalDrainLengthKm: 45.6, majorDrains: ['Trans Yamuna Drain', 'Mathura Road Drain'], avgSlope: 0.13, imperviousPct: 72, elevation_m: 214, pumpingStations: 3, underpasses: ['Badarpur Flyover', 'Sarai Kale Khan'] },
  'South West': { drainCount: 8, totalDrainLengthKm: 112.7, majorDrains: ['Najafgarh Lake Drain', 'Dhansa Bund Drain'], avgSlope: 0.28, imperviousPct: 42, elevation_m: 225, pumpingStations: 5, underpasses: ['Dhaula Kuan', 'Mahipalpur Flyover'] },
  'New Delhi': { drainCount: 5, totalDrainLengthKm: 32.9, majorDrains: ['Kushak Nala', 'Sunehri Nala'], avgSlope: 0.16, imperviousPct: 85, elevation_m: 216, pumpingStations: 2, underpasses: ['Minto Bridge', 'Safdarjung'] },
  'Shahdara': { drainCount: 4, totalDrainLengthKm: 28.4, majorDrains: ['Shahdara Branch Drain'], avgSlope: 0.11, imperviousPct: 82, elevation_m: 211, pumpingStations: 2, underpasses: ['Preet Vihar Metro'] },
};

function buildGeminiUrl(keyIndex, modelIndex) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODELS[modelIndex]}:generateContent?key=${GEMINI_KEYS[keyIndex]}`;
}

async function callGemini(prompt, maxTokens = 100) {
  // Try each key × model combination
  for (let ki = 0; ki < GEMINI_KEYS.length; ki++) {
    for (let mi = 0; mi < GEMINI_MODELS.length; mi++) {
      const url = buildGeminiUrl(ki, mi);
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: maxTokens },
          }),
        });

        if (response.status === 429) {
          console.warn(`Key ${ki+1} / ${GEMINI_MODELS[mi]} rate limited, trying next...`);
          continue;
        }

        if (!response.ok) {
          let errStr = `HTTP ${response.status}`;
          try {
            const eData = await response.json();
            errStr += ` - ${eData.error?.message || ''}`;
          } catch(e) {}
          console.warn(`Key ${ki+1} / ${GEMINI_MODELS[mi]} error: ${errStr}`);
          continue;
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          console.log(`✅ Gemini response via Key ${ki+1} / ${GEMINI_MODELS[mi]}`);
          return text;
        }
      } catch (err) {
        console.warn(`Key ${ki+1} / ${GEMINI_MODELS[mi]} failed: ${err.message}`);
        continue;
      }
    }
  }
  throw new Error('All Gemini API keys and models exhausted (rate limited). Please wait 1 minute and retry.');
}

/**
 * Get 7-day flood probability predictions from Gemini for a given district.
 * Uses real FCO 2025 drainage/slope/impervious data + live Open-Meteo weather.
 */
export async function getFloodPrediction(district, weather = {}) {
  const cacheKey = district;
  if (predictionCache[cacheKey]) {
    console.log(`Using cached Gemini prediction for ${district}`);
    return predictionCache[cacheKey];
  }

  const rainfall = weather.precipitation ?? 0;
  const humidity = weather.humidity ?? 65;
  const forecast7day = weather.forecast7day ?? [];
  const fco = FCO_DISTRICT_DATA[district] || FCO_DISTRICT_DATA['Central'];

  const forecastStr = forecast7day.length > 0
    ? forecast7day.map((d, i) => `Day ${i + 1}: ${d.toFixed(1)}mm`).join(', ')
    : 'Not available';

  const prompt = `You are a highly precise flood risk AI for Delhi, India. Calculate real-time flooding probability using the following REAL DATA:

=== DISTRICT: ${district}, Delhi ===

--- LIVE WEATHER (Open-Meteo API) ---
Current rainfall: ${rainfall}mm | Humidity: ${humidity}%
7-day rainfall forecast: ${forecastStr}

--- REAL FCO 2025 DRAINAGE DATA ---
Drain count: ${fco.drainCount} | Total drain length: ${fco.totalDrainLengthKm}km
Major drains: ${fco.majorDrains.join(', ')}
Pumping stations: ${fco.pumpingStations}
Vulnerable underpasses: ${fco.underpasses.join(', ')}

--- REAL TERRAIN & LAND USE (Bhuvan Geoportal) ---
Avg terrain slope: ${fco.avgSlope}%
Impervious surface coverage: ${fco.imperviousPct}% (concrete/built-up)
Mean elevation: ${fco.elevation_m}m above sea level

--- BHUVAN SPATIAL API KEYS (Active) ---
Geoid: 94f4925d430d6ac78c76cf43181bbe387c2f7075
LULC Statistics: a7adf7475fafc41f90a1f976c483bec489ecc2cd
Routing: e478444921a931a903ac2337a620edde05a3afff

--- YAMUNA THRESHOLDS (FCO 2025) ---
Warning level: 204.50m | Danger level: 205.33m | HFL 2023: 208.66m

CALCULATION RULES:
1. High impervious% + low slope = higher waterlogging risk (runoff cannot percolate)
2. Low elevation + proximity to Yamuna = higher river flooding risk
3. More rainfall forecast days > 20mm = cumulative drainage overload
4. Fewer pumping stations per drain km = slower water evacuation
5. Each vulnerable underpass adds +3-5% base risk during heavy rain

Return ONLY a JSON array of exactly 7 integers (0-100), one per day. No text. Example: [35,48,62,71,55,38,22]`;

  try {
    const text = await callGemini(prompt, 100);
    const match = text.match(/\[[\d,\s]+\]/);
    if (!match) throw new Error('Could not parse Gemini response. Raw: ' + text.substring(0, 120));

    const arr = JSON.parse(match[0]);
    if (!Array.isArray(arr) || arr.length !== 7) throw new Error('Invalid array length from AI');

    const result = arr.map(v => Math.min(100, Math.max(0, Math.round(Number(v)))));
    predictionCache[cacheKey] = result;
    return result;
  } catch (err) {
    console.warn('Gemini prediction failed:', err.message);
    return { error: err.message };
  }
}

/**
 * Get AI-generated precautions from Gemini for a given risk level and district.
 */
export async function getAIPrecautions(district, riskLevel, probability) {
  const cacheKey = `${district}-${riskLevel}`;
  if (precautionCache[cacheKey]) return precautionCache[cacheKey];

  const fco = FCO_DISTRICT_DATA[district] || FCO_DISTRICT_DATA['Central'];

  const prompt = `You are a flood safety advisor for Delhi's Jal Pravah system.

District: ${district} | Flood probability: ${probability}% | Risk: ${riskLevel.toUpperCase()}
Vulnerable underpasses: ${fco.underpasses.join(', ')}
Major drains: ${fco.majorDrains.join(', ')}

Generate exactly 5 short, practical safety precautions specific to ${district} at ${riskLevel} risk.
Each precaution: 1 sentence, start with emoji, mention specific local landmarks/roads.
Return ONLY a JSON array of 5 strings. Example:
["🚨 Evacuate areas near Yamuna banks immediately.", "📞 Call 1077 for assistance.", "⚡ Disconnect electrical appliances.", "🧳 Keep documents waterproof.", "🚗 Avoid ${fco.underpasses[0] || 'underpasses'}."]`;

  try {
    const text = await callGemini(prompt, 400);
    const match = text.match(/\[.*\]/s);
    if (!match) throw new Error('Could not parse Gemini precautions response');

    const arr = JSON.parse(match[0]);
    if (!Array.isArray(arr)) throw new Error('Gemini precautions did not return an array');

    const result = arr.slice(0, 5);
    precautionCache[cacheKey] = result;
    return result;
  } catch (err) {
    console.warn('Gemini precautions failed:', err.message);
    return { error: err.message };
  }
}
