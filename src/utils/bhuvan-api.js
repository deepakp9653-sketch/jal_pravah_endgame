// ═══════════════════════════════════════════════
// UFHE — Bhuvan (ISRO) API Integration
// All Bhuvan REST endpoints and data fetchers
// ═══════════════════════════════════════════════

const BHUVAN_KEYS = {
    geoid:             '3c444e4eccfe7fdcda5fb294d8df6d774b48f91a',
    routing:           '6c30c7a01d8ea69366f73d911f745371228c3d25',
    lulcAOI:           '11b5bd707ec50e7b3e279af14467e78c7e1e525f',
    lulcStats:         'a27f1d06305e6d63c423e33e957cdda2ab952577',
    villageRevGeo:     'e94c815f4c4a08d4b9e721dab670a82e48ecf0c4',
    villageGeo:        'baea9f1a8998060344215a80f40931826c71ac74',
};

// Base URL for all Bhuvan API calls
const BHUVAN_BASE = 'https://bhuvan.nrsc.gov.in';

// ─── Helper: JSON fetch with error handling ──
async function bhuvanFetch(url) {
    try {
        const resp = await fetch(url, {
            headers: { 'Accept': 'application/json' }
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return await resp.json();
    } catch (err) {
        console.warn('[Bhuvan API] Fetch failed:', url, err.message);
        return null;
    }
}

// ═══════════════════════════════════════════════
// 2. Village Reverse Geocoding
//    Convert lat/lng → village name + admin area
// ═══════════════════════════════════════════════
export async function bhuvanReverseGeocode(lat, lng) {
    const params = new URLSearchParams({
        token: BHUVAN_KEYS.villageRevGeo,
        lat,
        lon: lng,
    });
    const url = `${BHUVAN_BASE}/api/1.0/api_service.php?user=bhuvan&action=vilrevgeo&${params}`;
    const data = await bhuvanFetch(url);
    if (!data) return null;
    return data;
}

// ─── Bhuvan base map tile (WMTS/TMS) for Leaflet ──
export const BHUVAN_TILE_URL = 'https://bhuvan-vec2.nrsc.gov.in/bhuvan/tms/1.0.0/bhuvan_imagery@EPSG:900913@jpg/{z}/{x}/{y}.jpg';
export const BHUVAN_HYBRID_URL = 'https://bhuvan-vec2.nrsc.gov.in/bhuvan/tms/1.0.0/bhuvan_hybrid@EPSG:900913@png/{z}/{x}/{y}.png';
