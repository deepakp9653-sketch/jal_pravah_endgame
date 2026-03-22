// Drain Infrastructure Data from FCO 2025 - Annexure B & C
// Fields: name, length(km), catchment(sqkm), discharge(cusecs), block, lat, lng, status

export const drains = [
  // ALIPUR BLOCK - North Delhi
  { id: 1, name: "Supplementary Drain", length: 34.50, catchment: 486.49, discharge: 5000, block: "Alipur", lat: 28.7800, lng: 77.1900, status: "Functional" },
  { id: 2, name: "Bawana Escape Drain", length: 19.79, catchment: 70.39, discharge: 681, block: "Alipur", lat: 28.7760, lng: 77.0530, status: "Functional" },
  { id: 3, name: "Drain No. 6", length: 14.73, catchment: 34.00, discharge: 462, block: "Alipur", lat: 28.7600, lng: 77.1400, status: "Functional" },
  { id: 4, name: "Burari Creek", length: 8.86, catchment: 5.70, discharge: 74, block: "Alipur", lat: 28.7450, lng: 77.2050, status: "Partial" },
  { id: 5, name: "Burari Drain", length: 6.04, catchment: 2.49, discharge: 25, block: "Alipur", lat: 28.7500, lng: 77.2000, status: "Functional" },
  { id: 6, name: "Bankner Link Drain", length: 5.43, catchment: 12.92, discharge: 118, block: "Alipur", lat: 28.8400, lng: 77.0900, status: "Functional" },
  { id: 7, name: "New Drain", length: 5.40, catchment: 108.25, discharge: 1180, block: "Alipur", lat: 28.7900, lng: 77.1600, status: "Functional" },
  { id: 8, name: "Khera Khurd Drain", length: 5.20, catchment: 3.91, discharge: 71, block: "Alipur", lat: 28.8200, lng: 77.1600, status: "Functional" },
  { id: 9, name: "Ghoga Link Drain", length: 5.12, catchment: 5.71, discharge: 58, block: "Alipur", lat: 28.8400, lng: 77.1200, status: "Partial" },
  { id: 10, name: "Sanoth Link Drain", length: 3.35, catchment: 4.10, discharge: 41, block: "Alipur", lat: 28.8100, lng: 77.1000, status: "Functional" },
  { id: 11, name: "Jahangirpuri Outfall Drain", length: 5.47, catchment: 6.25, discharge: 1700, block: "Alipur", lat: 28.7290, lng: 77.1720, status: "Partial" },
  { id: 12, name: "Toe Drain", length: 4.00, catchment: 0.58, discharge: 18, block: "Alipur", lat: 28.7350, lng: 77.2050, status: "Functional" },
  { id: 13, name: "Naya Bas Link Drain", length: 3.00, catchment: 3.20, discharge: 32, block: "Alipur", lat: 28.8050, lng: 77.0850, status: "Functional" },
  { id: 14, name: "Alipur Link Drain", length: 0.88, catchment: 2.40, discharge: 31, block: "Alipur", lat: 28.7980, lng: 77.1520, status: "Functional" },
  { id: 15, name: "Jagatpur Link Drain", length: 2.46, catchment: 0.39, discharge: 10, block: "Alipur", lat: 28.7400, lng: 77.2200, status: "Functional" },
  { id: 16, name: "Tikri Khurd Link Drain", length: 1.94, catchment: 2.39, discharge: 11, block: "Alipur", lat: 28.7900, lng: 77.0300, status: "Functional" },
  { id: 17, name: "Khera Kalan Drain (Link)", length: 0.86, catchment: 1.70, discharge: 1, block: "Alipur", lat: 28.8120, lng: 77.1560, status: "Partial" },

  // KANJHAWALA BLOCK - West Delhi
  { id: 18, name: "Mungeshpur Drain", length: 37.75, catchment: 182, discharge: 1820, block: "Kanjhawala", lat: 28.7400, lng: 77.0650, status: "Functional" },
  { id: 19, name: "Bazitpur Drain", length: 8.05, catchment: 8.5, discharge: 85, block: "Kanjhawala", lat: 28.7650, lng: 77.0600, status: "Functional" },
  { id: 20, name: "Bawana Drain", length: 10.83, catchment: 10, discharge: 100, block: "Kanjhawala", lat: 28.7760, lng: 77.0530, status: "Functional" },
  { id: 21, name: "Nangloi Drain", length: 2.10, catchment: 13.75, discharge: 111, block: "Kanjhawala", lat: 28.6680, lng: 77.0580, status: "Partial" },
  { id: 22, name: "Madanpur Drain", length: 8.13, catchment: 19.00, discharge: 190, block: "Kanjhawala", lat: 28.7250, lng: 77.0700, status: "Functional" },
  { id: 23, name: "Karari Suleman Nagar Drain", length: 7.84, catchment: 11.10, discharge: 110, block: "Kanjhawala", lat: 28.7000, lng: 77.0200, status: "Functional" },
  { id: 24, name: "Sultanpur Drain", length: 9.20, catchment: 6.49, discharge: 60, block: "Kanjhawala", lat: 28.7350, lng: 77.0280, status: "Partial" },
  { id: 25, name: "Mundka Peripheral Drain", length: 2.35, catchment: 2.65, discharge: 13, block: "Kanjhawala", lat: 28.6830, lng: 77.0340, status: "Functional" },
  { id: 26, name: "Ranhola Pond Drain", length: 1.16, catchment: 1.00, discharge: 10, block: "Kanjhawala", lat: 28.6580, lng: 77.0720, status: "Partial" },
  { id: 27, name: "Ladpur Link Drain", length: 2.30, catchment: 2, discharge: 20, block: "Kanjhawala", lat: 28.7200, lng: 76.9800, status: "Functional" },
  { id: 28, name: "Katewara Link Drain", length: 1.33, catchment: 2, discharge: 8, block: "Kanjhawala", lat: 28.7650, lng: 77.0200, status: "Functional" },

  // NAJAFGARH BLOCK - South West Delhi
  { id: 29, name: "Najafgarh Drain (Sahibi River)", length: 57.11, catchment: 4223.57, discharge: 10000, block: "Najafgarh", lat: 28.6090, lng: 76.9800, status: "Functional" },
  { id: 30, name: "Palam Drain", length: 8.78, catchment: 19.79, discharge: 3037, block: "Najafgarh", lat: 28.5870, lng: 77.0680, status: "Functional" },
  { id: 31, name: "Palam Link Drain", length: 1.47, catchment: 3.17, discharge: 509, block: "Najafgarh", lat: 28.5900, lng: 77.0650, status: "Partial" },
  { id: 32, name: "Bijwasan Drain", length: 4.20, catchment: 10.64, discharge: 170, block: "Najafgarh", lat: 28.5250, lng: 77.0600, status: "Functional" },
  { id: 33, name: "Pankha Road Drain", length: 3.60, catchment: 3.16, discharge: 1000, block: "Najafgarh", lat: 28.6260, lng: 77.0780, status: "Partial" },
  { id: 34, name: "Nasirpur Link Drain", length: 2.90, catchment: 4.01, discharge: 1020, block: "Najafgarh", lat: 28.6100, lng: 77.0450, status: "Functional" },
  { id: 35, name: "Mundela Drain", length: 12.50, catchment: 6.00, discharge: 60, block: "Najafgarh", lat: 28.5850, lng: 77.0050, status: "Functional" },
  { id: 36, name: "Nangli Sakrawati Link Drain", length: 0.93, catchment: 0.08, discharge: 24, block: "Najafgarh", lat: 28.6100, lng: 76.9750, status: "Functional" },
  { id: 37, name: "Bhupania Chudania Drain", length: 8.55, catchment: 14.3, discharge: 1430, block: "Najafgarh", lat: 28.5250, lng: 76.9000, status: "Partial" },
  { id: 38, name: "Shahbad Mohammadpur Drain", length: 0.23, catchment: 9.37, discharge: 155, block: "Najafgarh", lat: 28.5850, lng: 77.0350, status: "Functional" },

  // TRANS YAMUNA - North East, East, Shahdara
  { id: 39, name: "Trunk Drain No. I", length: 13.39, catchment: 25.7, discharge: 3037, block: "Trans Yamuna", lat: 28.6750, lng: 77.2950, status: "Functional" },
  { id: 40, name: "Trunk Drain No. II", length: 4.55, catchment: 10.58, discharge: 1766, block: "Trans Yamuna", lat: 28.6550, lng: 77.3000, status: "Functional" },
  { id: 41, name: "Shahdara Outfall Drain", length: 5.90, catchment: 23.55, discharge: 5562, block: "Trans Yamuna", lat: 28.6700, lng: 77.3100, status: "Partial" },
  { id: 42, name: "Ghazipur Drain", length: 6.15, catchment: 26.03, discharge: 5143, block: "Trans Yamuna", lat: 28.6300, lng: 77.3250, status: "Functional" },
  { id: 43, name: "Shahdara Link Drain", length: 4.56, catchment: 0.58, discharge: 1159, block: "Trans Yamuna", lat: 28.6600, lng: 77.2900, status: "Functional" },
  { id: 44, name: "Karawal Nagar Drain", length: 2.48, catchment: 0.05, discharge: 498, block: "Trans Yamuna", lat: 28.7250, lng: 77.2900, status: "Partial" },
  { id: 45, name: "Sonia Vihar Drain", length: 3.80, catchment: 1.93, discharge: 500, block: "Trans Yamuna", lat: 28.7200, lng: 77.2700, status: "Partial" },
  { id: 46, name: "Shastri Park Drain", length: 0.68, catchment: 0.66, discharge: 212, block: "Trans Yamuna", lat: 28.6700, lng: 77.2750, status: "Functional" },
  { id: 47, name: "Relief Drain", length: 2.18, catchment: 1.93, discharge: 4, block: "Trans Yamuna", lat: 28.6650, lng: 77.2880, status: "Partial" },

  // MEHRAULI BLOCK - South Delhi
  { id: 48, name: "Ali Drain", length: 2.78, catchment: 9126, discharge: 2500, block: "Mehrauli", lat: 28.5250, lng: 77.2800, status: "Functional" },
  { id: 49, name: "Asola Drain", length: 3.39, catchment: 3693.67, discharge: 235, block: "Mehrauli", lat: 28.4900, lng: 77.2500, status: "Functional" },
  { id: 50, name: "Molar Bund Extension Drain", length: 1.38, catchment: 0.19, discharge: 60, block: "Mehrauli", lat: 28.5250, lng: 77.2850, status: "Partial" },
  { id: 51, name: "Sarita Vihar Drain", length: 1.30, catchment: 5.00, discharge: 2070, block: "Mehrauli", lat: 28.5360, lng: 77.2930, status: "Functional" },
  { id: 52, name: "Barapullah Nallah", length: 2.00, catchment: 146.42, discharge: 4547, block: "Mehrauli", lat: 28.5850, lng: 77.2500, status: "Functional" },
  { id: 53, name: "Tehkhand Drain", length: 5.50, catchment: 1.20, discharge: 52, block: "Mehrauli", lat: 28.5100, lng: 77.2960, status: "Partial" },
  { id: 54, name: "Tughluqabad Drain", length: 4.00, catchment: 1.60, discharge: 4615, block: "Mehrauli", lat: 28.5050, lng: 77.2550, status: "Functional" },
  { id: 55, name: "Sunehri Pulla Nalla", length: 2.00, catchment: 8.1, discharge: 2343, block: "Mehrauli", lat: 28.6680, lng: 77.2480, status: "Partial", note: "Improper outfall causes flooding in NDMC area" },
  { id: 56, name: "Kushak Nalla", length: 4.00, catchment: 1.425, discharge: 2369, block: "Mehrauli", lat: 28.5950, lng: 77.2080, status: "Partial" },
];

// Outfalling drains - those flowing into River Yamuna
export const outfallingDrains = [
  { name: "Najafgarh Drain (Sahibi)", discharge: 10000, avgFlow: 2015.79, length: 57.13, hasRegulator: false },
  { name: "Barapulla Drain", discharge: 4547, avgFlow: 146.42, length: 4.22, hasRegulator: false },
  { name: "Shahdara Outfall Drain", discharge: 5580, avgFlow: 496.12, length: 5.90, hasRegulator: false },
  { name: "Jaitpur / Ali Drain", discharge: null, avgFlow: 19.82, length: 2.78, hasRegulator: false },
  { name: "Magazine Road Drain", discharge: null, avgFlow: 5.80, length: 0.26, hasRegulator: true },
  { name: "Metcalf House Drain", discharge: 101, avgFlow: 4.62, length: 1.20, hasRegulator: true },
  { name: "Qudsia Ghat Drain+Mori Gate", discharge: 215, avgFlow: 44.71, length: 1.20, hasRegulator: true },
  { name: "Tonga Stand Drain", discharge: 110, avgFlow: 7.89, length: 0.49, hasRegulator: true },
  { name: "Civil Military Drain", discharge: 292.5, avgFlow: 8.68, length: 1.09, hasRegulator: true },
  { name: "Delhi Gate Drain/Power House", discharge: 619, avgFlow: 57.11, length: 1.83, hasRegulator: true },
  { name: "Nallah No. 12", discharge: 865, avgFlow: 45.64, length: 1.43, hasRegulator: true },
  { name: "Chilla Regulator Drain", discharge: null, avgFlow: null, length: null, hasRegulator: true },
];

export const drainBlocks = ["Alipur", "Kanjhawala", "Najafgarh", "Trans Yamuna", "Mehrauli"];
