/**
 * Universal PMRS & Flood Risk Algorithm v2.0
 * 
 * 6-Factor Model consuming real-time payloads from:
 * 1. LULC AOI / LULC Stats API (Impervious vs Pervious surfaces)
 * 2. Terrain & Slope API (Topographical stagnation risk)
 * 3. Routing API (Distance to natural drainage/outfalls)
 * 4. Village Geo / Rev Geo / GeoID API (Population density & local infra)
 * 5. Open-Meteo API (Live precipitation & soil saturation)
 * 6. Historical Rainfall Archive (Monsoon precedent risk)
 *
 * PMRS = Preparedness, Mitigation & Readiness Score (higher = more prepared)
 * The score measures HOW READY ARE WE? not HOW BAD IS IT?
 * A dense concrete ward WITH strong drainage scores HIGH.
 * A dense concrete ward WITHOUT drainage scores LOW.
 */

// ═══════════════════════════════════════════════════
// Historical Average Monsoon Rainfall (mm/year)  
// Source: IMD Climate Normals 1991-2020
// ═══════════════════════════════════════════════════
const HISTORICAL_RAINFALL_DB = {
  // Delhi NCR
  'New Delhi': 797, 'Central Delhi': 797, 'North Delhi': 810, 'South Delhi': 785,
  'East Delhi': 820, 'West Delhi': 780, 'North East Delhi': 835,
  'North West Delhi': 790, 'South West Delhi': 760, 'South East Delhi': 800, 'Shahdara': 815,
  // Major Metro Cities
  'Mumbai': 2480, 'Bangalore': 970, 'Chennai': 1400, 'Kolkata': 1650,
  'Pune': 722, 'Hyderabad': 820, 'Ahmedabad': 782, 'Jaipur': 610,
  // High-risk flood zones
  'Assam': 2818, 'Bihar': 1200, 'Kerala': 3055, 'Uttarakhand': 1550,
  // Default for unknown areas
  '_default': 900
};

export function getHistoricalRainfall(wardName) {
  return HISTORICAL_RAINFALL_DB[wardName] || HISTORICAL_RAINFALL_DB['_default'];
}

export function calculateUniversalPMRS(apiData) {
  const {
    lulcConcretePct = 65,       // LULC Stats: % of Built-up area / Impervious
    slopePct = 2.5,             // Terrain API: Average slope % in AOI  
    routeToRiverKm = 3.5,       // Routing API: Distance to nearest water body / safe drain
    populationDensity = 15000,  // GeoID API: Persons per sq km
    pumpingStations = 2,        // Village Geo API: Registered local pump infra
    drainCapacityM3s = 50,      // FCO Data: Storm drain capacity
    past3DayRainMm = 0,         // Open-Meteo API: Antecedent Moisture Index (AMI)
    currentRainMm = 0,          // Open-Meteo API: Live rainfall
    historicalRainfallMm = 900, // IMD Archive: Average monsoon rainfall
    forecast7day = [],          // Open-Meteo API: 7-day precipitation forecast
    wardName = ''               // For historical lookup
  } = apiData;

  // Auto-lookup historical rainfall if wardName provided but no explicit value
  const histRain = historicalRainfallMm || getHistoricalRainfall(wardName);

  // ==========================================
  // COMPONENT 1: Drainage Infrastructure Capacity (Weight: 25%)
  // How well can the ward MOVE water out?
  // Combines forced drainage (pumps + pipes) with natural routing.
  // ==========================================
  const routeEfficiency = Math.max(15, 100 - (routeToRiverKm * 7));
  const pumpCapacity = Math.min(40, pumpingStations * 12);
  const drainPipeScore = Math.min(40, (drainCapacityM3s / 200) * 40);
  const drainageScore = Math.min(100, routeEfficiency + pumpCapacity + drainPipeScore);

  // ==========================================
  // COMPONENT 2: Ground Absorption (Weight: 15%)
  // How much water can the soil absorb?  
  // High concrete = low absorption = higher flood risk
  // ==========================================
  const absorptionScore = Math.max(5, 100 - lulcConcretePct);

  // ==========================================
  // COMPONENT 3: Terrain Runoff (Weight: 20%)
  // Slope determines water stagnation vs natural flow.
  // ==========================================
  let terrainScore = 0;
  if (slopePct < 0.8) terrainScore = 15;        // Dead flat → severe stagnation
  else if (slopePct <= 2.0) terrainScore = 40;   // Low slope → moderate pooling
  else if (slopePct <= 5.0) terrainScore = 65;   // Moderate → decent runoff
  else if (slopePct <= 10.0) terrainScore = 85;  // Good gradient
  else terrainScore = 95;                        // Steep slope → fast runoff

  // ==========================================
  // COMPONENT 4: Urban Density Resilience (Weight: 10%)
  // Dense areas have more blockage risk but also more infra
  // ==========================================
  const densityFactor = Math.min(50, (populationDensity / 40000) * 50);
  const urbanResilience = Math.max(25, 100 - densityFactor);

  // ==========================================
  // COMPONENT 5: Historical Monsoon Precedent (Weight: 10%) [NEW]
  // Areas with historically HIGH rainfall have proven resilience
  // OR proven vulnerability — this contextualizes the score.
  // ==========================================
  let historicalScore = 60; // Baseline
  if (histRain > 2000) historicalScore = 30;        // Extremely heavy monsoon zone (Mumbai, Assam)
  else if (histRain > 1200) historicalScore = 45;    // Heavy monsoon (Kolkata, Chennai)
  else if (histRain > 800) historicalScore = 60;     // Moderate (Delhi, Hyderabad)
  else if (histRain > 500) historicalScore = 75;     // Light rainfall zone (Jaipur)
  else historicalScore = 90;                         // Arid zone

  // ==========================================
  // COMPONENT 6: Antecedent Moisture Index (AMI) Penalty (-20%)
  // Saturated ground from recent rain SEVERELY lowers readiness.
  // ==========================================
  const amiPenalty = Math.min(35, (past3DayRainMm / 100) * 35);

  // ==========================================
  // FINAL PMRS CALCULATION
  // ==========================================
  const rawPmrs = 
    (drainageScore * 0.25) +      // Can we drain it?
    (absorptionScore * 0.15) +    // Can the ground absorb it?
    (terrainScore * 0.20) +       // Does terrain help or hurt?
    (urbanResilience * 0.10) +    // Is the urban fabric resilient?
    (historicalScore * 0.10) +    // Does history favor us?
    20 -                          // Base readiness offset (infra baseline)
    amiPenalty;                   // Recent rain penalty

  const pmrs = Math.round(Math.max(8, Math.min(98, rawPmrs)));

  // ==========================================
  // LIVE FLOOD RISK PROBABILITY (%)
  // ==========================================
  let riskProb = 3; // Dry baseline
  if (currentRainMm > 1 || past3DayRainMm > 5) {
    const rainIntensity = (currentRainMm * 2) + (past3DayRainMm * 0.3);
    const vulnerabilityMultiplier = Math.max(0.5, (100 - pmrs) / 30);
    riskProb = Math.max(5, rainIntensity * vulnerabilityMultiplier);
  }

  // ==========================================
  // 7-DAY FORECAST FLOOD PROBABILITIES
  // Each day's probability based on forecasted rain + current PMRS
  // ==========================================
  const dailyProbs = (forecast7day || []).map(dayRainMm => {
    if (dayRainMm <= 2) return 3;
    const dayIntensity = (dayRainMm * 2.5);
    const dayVuln = Math.max(0.5, (100 - pmrs) / 30);
    return Math.round(Math.min(95, Math.max(3, dayIntensity * dayVuln)));
  });

  return {
    pmrs,
    floodRiskPct: Math.round(Math.min(99, Math.max(2, riskProb))),
    dailyProbs,
    factors: {
      drainage: Math.round(drainageScore),
      absorption: Math.round(absorptionScore),
      terrain: Math.round(terrainScore),
      urbanResilience: Math.round(urbanResilience),
      historical: Math.round(historicalScore),
      amiPenalty: Math.round(amiPenalty)
    }
  };
}
