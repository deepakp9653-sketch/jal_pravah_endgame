// Delhi Flood Hotspots - From FCO 2025 Waterlogging Data
// Coordinates are approximate centroids for each location

export const hotspots = [
  // === CRITICAL VULNERABLE POINTS (River Yamuna Embankments) ===
  { id: 1, name: "Dahisara Bund (U/S of RME)", lat: 28.8100, lng: 77.1700, district: "North", risk: "critical", type: "embankment", description: "Upstream of Right Marginal Embankment, maintained by Haryana Irrigation" },
  { id: 2, name: "Shank No.7 at RD-3685m of RME", lat: 28.7800, lng: 77.2200, district: "North", risk: "critical", type: "embankment", description: "Vulnerable shank point on Right Marginal Embankment" },
  { id: 3, name: "Jagatpur Bund RD-1450m", lat: 28.7320, lng: 77.2280, district: "North", risk: "critical", type: "embankment", description: "Ramp at Jagatpur Bund, vulnerable to erosion" },
  { id: 4, name: "L.F. Bund (Trans Yamuna)", lat: 28.7050, lng: 77.2650, district: "North East", risk: "critical", type: "embankment", description: "Left Forward Bund in Trans Yamuna Area - breach in 2023" },
  { id: 5, name: "Yamuna Bazar near Nigam Bodh Ghat", lat: 28.6700, lng: 77.2350, district: "Central", risk: "critical", type: "embankment", description: "Despite protection wall, inundation reached 8-10 ft in 2023" },
  { id: 6, name: "Power House Bund", lat: 28.6350, lng: 77.2500, district: "Central", risk: "high", type: "embankment", description: "Power House Bund along Ring Road" },

  // === 2023 FLOOD AFFECTED AREAS ===
  { id: 7, name: "Civil Lines / Boat Club", lat: 28.6830, lng: 77.2250, district: "Central", risk: "critical", type: "flood_2023", description: "Severely flooded during 2023 monsoon, water pumped out" },
  { id: 8, name: "ISBT Kashmere Gate", lat: 28.6674, lng: 77.2280, district: "Central", risk: "critical", type: "flood_2023", description: "Major transit hub, flooded in 2023" },
  { id: 9, name: "Tibbet Market", lat: 28.6680, lng: 77.2265, district: "Central", risk: "high", type: "flood_2023", description: "Market area submerged during 2023 floods" },
  { id: 10, name: "Nigam Bodh Ghat", lat: 28.6715, lng: 77.2365, district: "Central", risk: "critical", type: "flood_2023", description: "Cremation ground area, severely impacted" },
  { id: 11, name: "Yamuna Bazar", lat: 28.6690, lng: 77.2340, district: "Central", risk: "critical", type: "flood_2023", description: "8-10 ft inundation despite protection wall" },
  { id: 12, name: "Saleem Garh (Back of Lal Qila)", lat: 28.6562, lng: 77.2430, district: "Central", risk: "high", type: "flood_2023", description: "Area behind Red Fort flooded" },
  { id: 13, name: "Rajghat Samadhi Sthal", lat: 28.6425, lng: 77.2495, district: "Central", risk: "high", type: "flood_2023", description: "Gandhi memorial area affected" },
  { id: 14, name: "ITO / WHO Building", lat: 28.6305, lng: 77.2465, district: "Central", risk: "high", type: "flood_2023", description: "Income Tax Office area waterlogged" },
  { id: 15, name: "Sonia Vihar", lat: 28.7200, lng: 77.2700, district: "North East", risk: "critical", type: "flood_2023", description: "LF Bund breach endangered large populated area" },
  { id: 16, name: "Vishwakarma Colony", lat: 28.5250, lng: 77.3050, district: "South East", risk: "high", type: "flood_2023", description: "Settlement within flood plain submerged" },
  { id: 17, name: "Khadda Colony", lat: 28.5300, lng: 77.2800, district: "South East", risk: "high", type: "flood_2023", description: "Low-lying colony affected" },

  // === WATERLOGGING HOTSPOTS (2022-2024 recurring) ===
  { id: 18, name: "Anand Parbat T-Point", lat: 28.6400, lng: 77.2050, district: "Central", risk: "high", type: "waterlogging", description: "Recurring waterlogging at T-Point junction" },
  { id: 19, name: "Azad Market Underpass", lat: 28.6530, lng: 77.2080, district: "Central", risk: "high", type: "waterlogging", description: "Underpass regularly flooded during monsoon" },
  { id: 20, name: "Barapulla Flyover", lat: 28.5850, lng: 77.2500, district: "South East", risk: "moderate", type: "waterlogging", description: "Flyover area waterlogging" },
  { id: 21, name: "Dhaula Kuan", lat: 28.5920, lng: 77.1650, district: "South West", risk: "high", type: "waterlogging", description: "Major intersection, frequent flooding" },
  { id: 22, name: "Minto Bridge", lat: 28.6310, lng: 77.2165, district: "New Delhi", risk: "critical", type: "waterlogging", description: "Historic underpass, regularly submerged - life-threatening" },
  { id: 23, name: "INA Market / AIIMS Flyover", lat: 28.5735, lng: 77.2095, district: "New Delhi", risk: "high", type: "waterlogging", description: "Under AIIMS Flyover waterlogging" },
  { id: 24, name: "Pul Prahladpur Underpass", lat: 28.5180, lng: 77.2510, district: "South", risk: "critical", type: "waterlogging", description: "Dangerous underpass flooding" },
  { id: 25, name: "Ring Road - Moolchand Flyover", lat: 28.5690, lng: 77.2370, district: "South", risk: "high", type: "waterlogging", description: "Both carriageways affected" },
  { id: 26, name: "Ring Road - IP Flyover", lat: 28.6350, lng: 77.2430, district: "Central", risk: "high", type: "waterlogging", description: "Under IP Flyover waterlogging" },
  { id: 27, name: "Rohtak Road - Zakhira Flyover", lat: 28.6620, lng: 77.1520, district: "West", risk: "high", type: "waterlogging", description: "Frequent waterlogging at flyover" },
  { id: 28, name: "Rohtak Road - Tikri Border", lat: 28.6900, lng: 76.9450, district: "West", risk: "moderate", type: "waterlogging", description: "Border area waterlogging" },
  { id: 29, name: "Vikas Marg - Laxmi Nagar Metro", lat: 28.6310, lng: 77.2780, district: "East", risk: "high", type: "waterlogging", description: "Under Laxmi Nagar Metro Station" },
  { id: 30, name: "Najafgarh Road - Vikaspuri More", lat: 28.6340, lng: 77.0850, district: "West", risk: "high", type: "waterlogging", description: "Major intersection, recurring floods" },
  { id: 31, name: "GTK Road - Jahangirpuri", lat: 28.7270, lng: 77.1690, district: "North West", risk: "high", type: "waterlogging", description: "Underpass Apsara Border flooding" },
  { id: 32, name: "MB Road - Khanpur T-Point", lat: 28.5100, lng: 77.2350, district: "South", risk: "high", type: "waterlogging", description: "Khanpur T-Point to Misthan Café area" },
  { id: 33, name: "Outer Ring Road - Chirag Delhi", lat: 28.5460, lng: 77.2350, district: "South", risk: "moderate", type: "waterlogging", description: "Chirag Delhi redlight towards Sheikh Sarai" },
  { id: 34, name: "Outer Ring Road - GK-1 Metro", lat: 28.5560, lng: 77.2350, district: "South", risk: "high", type: "waterlogging", description: "Savitri Flyover both carriageways" },
  { id: 35, name: "Pankha Road", lat: 28.6260, lng: 77.0780, district: "West", risk: "moderate", type: "waterlogging", description: "Before Pedestrian Bridge area" },
  { id: 36, name: "Mathura Road - Ashram to Bhogal", lat: 28.5730, lng: 77.2560, district: "South East", risk: "high", type: "waterlogging", description: "Ashram to Bhogal carriageway" },
  { id: 37, name: "Mathura Road - Badarpur Flyover", lat: 28.5080, lng: 77.3050, district: "South East", risk: "high", type: "waterlogging", description: "Near NTPC both carriageways" },
  { id: 38, name: "Ring Road - Maharani Bagh", lat: 28.5700, lng: 77.2580, district: "South East", risk: "high", type: "waterlogging", description: "Maharani Bagh area flooding" },
  { id: 39, name: "Wazirabad Road - Bhajanpura", lat: 28.6930, lng: 77.2580, district: "North East", risk: "moderate", type: "waterlogging", description: "Bhajanpura Mazar area" },
  { id: 40, name: "Lawrence Road - Keshopur Mandi", lat: 28.6760, lng: 77.1400, district: "North West", risk: "moderate", type: "waterlogging", description: "Keshopur Mandi area waterlogging" },
  { id: 41, name: "Press Enclave Road - Select City Walk", lat: 28.5290, lng: 77.2190, district: "South", risk: "moderate", type: "waterlogging", description: "Opposite Select City Walk Mall" },
  { id: 42, name: "Dwarka Road - Rajapuri Chowk", lat: 28.5840, lng: 77.0540, district: "South West", risk: "high", type: "waterlogging", description: "Near Sector-9 Dwarka" },
  { id: 43, name: "NH-8 - Mahipalpur Flyover", lat: 28.5530, lng: 77.1230, district: "South West", risk: "high", type: "waterlogging", description: "Mahipalpur Flyover towards Gurugram" },
  { id: 44, name: "NH-8 - Rangpuri Chowk", lat: 28.5430, lng: 77.1050, district: "South West", risk: "moderate", type: "waterlogging", description: "Rangpuri Chowk area" },

  // === 1978 FLOOD AFFECTED AREAS (Historical) ===
  { id: 45, name: "Tikri Kalan / Rohtak Road / Mundka", lat: 28.6850, lng: 77.0290, district: "West", risk: "high", type: "flood_1978", description: "Kanjhawala Block - Historicaly flooded in 1978" },
  { id: 46, name: "Kaushik Enclave (Burari)", lat: 28.7540, lng: 77.2000, district: "North", risk: "high", type: "flood_1978", description: "Alipur Block - Burari area, historically flooded" },
  { id: 47, name: "Sangam Vihar", lat: 28.5050, lng: 77.2310, district: "South", risk: "high", type: "flood_1978", description: "Mehrauli Block - large area affected in 1978" },
  { id: 48, name: "Tajpur / Jaitpur / Madanpur Khadar", lat: 28.5300, lng: 77.3100, district: "South East", risk: "high", type: "flood_1978", description: "East Block - Jaitpur extension area" },
  { id: 49, name: "Kondli-Gharoli / Geeta Colony", lat: 28.6180, lng: 77.3030, district: "East", risk: "high", type: "flood_1978", description: "East Block - Shahdara area" },
  { id: 50, name: "Najafgarh / Roshanpura", lat: 28.6090, lng: 76.9800, district: "South West", risk: "high", type: "flood_1978", description: "Najafgarh Block - Jharoda Road area" },
  { id: 51, name: "Vijay Enclave / Mahavir Enclave", lat: 28.5950, lng: 77.0620, district: "South West", risk: "high", type: "flood_1978", description: "Palam Village area, historically flooded" },
  { id: 52, name: "Gandhi Nagar", lat: 28.6550, lng: 77.2660, district: "East", risk: "moderate", type: "flood_1978", description: "Shahdara area" },

  // === PUMPING STATION VULNERABLE POINTS ===
  { id: 53, name: "Balbir Nagar Drain Pumping Station", lat: 28.6280, lng: 77.2790, district: "East", risk: "moderate", type: "pumping_station", description: "Permanent pumping station - critical during floods" },
  { id: 54, name: "Kondli Gharoli Pumping Station", lat: 28.6120, lng: 77.3080, district: "East", risk: "moderate", type: "pumping_station", description: "Harijan Basti Pond pumping" },
  { id: 55, name: "Meethapur Pond Pumping Station", lat: 28.5350, lng: 77.2920, district: "South East", risk: "moderate", type: "pumping_station", description: "Meethapur Pond drainage" },
  { id: 56, name: "Molar Bund Pumping Station", lat: 28.5250, lng: 77.2850, district: "South East", risk: "moderate", type: "pumping_station", description: "Molar Bund area drainage" },
  { id: 57, name: "Keshopur Pumping Station", lat: 28.6810, lng: 77.1350, district: "West", risk: "moderate", type: "pumping_station", description: "Keshopur area pumping" },
  { id: 58, name: "Tilangpur Kotla Pumping Station", lat: 28.6200, lng: 77.0520, district: "South West", risk: "moderate", type: "pumping_station", description: "Tilangpur Kotla area" },

  // === ADDITIONAL WATERLOGGING 2024 ===
  { id: 59, name: "Kanjhawala Road - Kanjhawala Chowk", lat: 28.7370, lng: 77.0040, district: "North West", risk: "critical", type: "waterlogging", description: "Repeated waterlogging events 2022-2024, multiple incidents per year" },
  { id: 60, name: "Ring Road - Nizamuddin Khatta", lat: 28.5880, lng: 77.2505, district: "South East", risk: "moderate", type: "waterlogging", description: "Nizamuddin Khatta Red Light area" },
  { id: 61, name: "MG Road - Ghitorni Market", lat: 28.4890, lng: 77.1480, district: "South West", risk: "moderate", type: "waterlogging", description: "Mehrauli to Gurugram carriageway" },
  { id: 62, name: "SSN Marg - DLF Farms", lat: 28.5070, lng: 77.1580, district: "South", risk: "moderate", type: "waterlogging", description: "Both carriageway flooding" },
  { id: 63, name: "Old Patparganj Road Underpass", lat: 28.6300, lng: 77.2940, district: "East", risk: "high", type: "waterlogging", description: "Mother Dairy towards old PS Pandav Nagar" },
  { id: 64, name: "Raghubir Nagar Nala Road", lat: 28.6530, lng: 77.1170, district: "West", risk: "moderate", type: "waterlogging", description: "Ghode Wala Mandir area" },
  { id: 65, name: "Ring Road - Safdarjung Hospital", lat: 28.5680, lng: 77.2060, district: "New Delhi", risk: "high", type: "waterlogging", description: "Near start of Barapullah Flyover" },
  { id: 66, name: "Ring Road - Sarai Kale Khan", lat: 28.5910, lng: 77.2585, district: "South East", risk: "high", type: "waterlogging", description: "Merging point of Barapullah Flyover & Ring Road" },
  { id: 67, name: "Narela Bawana Road - Bawana Chowk", lat: 28.7750, lng: 77.0500, district: "North", risk: "moderate", type: "waterlogging", description: "Bawana Chowk waterlogging" },
  { id: 68, name: "Firni Road Najafgarh - Chhawla", lat: 28.5680, lng: 76.9620, district: "South West", risk: "high", type: "waterlogging", description: "Chhawla Bus Stand to BDO Office Road" },
  { id: 69, name: "JLN Marg - Zakir Hussain College", lat: 28.6100, lng: 77.2380, district: "New Delhi", risk: "moderate", type: "waterlogging", description: "Near Zakir Hussain College" },
  { id: 70, name: "Rani Jhansi Marg - Azad Market", lat: 28.6550, lng: 77.2050, district: "Central", risk: "moderate", type: "waterlogging", description: "Azad Market Chowk area" },

  // === REGULATOR / DRAIN VULNERABLE POINTS ===
  { id: 71, name: "Jahangirpuri Drain Regulator", lat: 28.7290, lng: 77.1720, district: "North West", risk: "high", type: "regulator", description: "Inlet Regulator at RD-1135m - settlement & seepage in 2023" },
  { id: 72, name: "Metcalf House Regulator", lat: 28.6860, lng: 77.2280, district: "North", risk: "high", type: "regulator", description: "Leakage/overtopping during 2023 flood" },
  { id: 73, name: "Chilla Regulator", lat: 28.6100, lng: 77.3100, district: "East", risk: "high", type: "regulator", description: "Critical regulator on Shahdara Outfall Drain" },
  { id: 74, name: "Dhansa Bund Regulator", lat: 28.5800, lng: 76.9200, district: "South West", risk: "high", type: "regulator", description: "Warning Level: 211.44m, Danger Level: 212.44m" },
  { id: 75, name: "Kakraula Regulator", lat: 28.6190, lng: 77.0250, district: "South West", risk: "moderate", type: "regulator", description: "Old and New regulators on Najafgarh Drain" },

  // === MORE WATERLOGGING AREAS ===
  { id: 76, name: "MB Road - Vayusenabad to Batra Hospital", lat: 28.5020, lng: 77.2600, district: "South", risk: "moderate", type: "waterlogging", description: "Long stretch regularly affected" },
  { id: 77, name: "Chhawla Road", lat: 28.5580, lng: 76.9450, district: "South West", risk: "moderate", type: "waterlogging", description: "Chhawla Stand to BDO Office" },
  { id: 78, name: "Firni Road - Dhansa to Bahadurgarh", lat: 28.5970, lng: 76.9300, district: "South West", risk: "moderate", type: "waterlogging", description: "Dhansa Stand to Bahadurgarh Stand Road" },
  { id: 79, name: "Mangolpuri-Udhyog Nagar Underpass", lat: 28.6770, lng: 77.1250, district: "North West", risk: "moderate", type: "waterlogging", description: "Underpass road flooding" },
  { id: 80, name: "Ring Road - Raja Garden", lat: 28.6490, lng: 77.1280, district: "West", risk: "high", type: "waterlogging", description: "Descending Flyover towards Mayapuri" },
  { id: 81, name: "Outer Ring Road - Deepali Chowk", lat: 28.6870, lng: 77.1320, district: "North West", risk: "moderate", type: "waterlogging", description: "Deepali Chowk to Madhuban Chowk" },
  { id: 82, name: "Outer Ring Road - Munirka Bus Stand", lat: 28.5580, lng: 77.1730, district: "South West", risk: "moderate", type: "waterlogging", description: "Munirka Bus Stand area" },
  { id: 83, name: "Pusa Road - Baba Lal Dayal Chowk", lat: 28.6380, lng: 77.1800, district: "Central", risk: "moderate", type: "waterlogging", description: "Roundabout Bagga and surrounding area" },
  { id: 84, name: "Vikas Marg - Preet Vihar Metro", lat: 28.6390, lng: 77.2900, district: "East", risk: "high", type: "waterlogging", description: "Gate No. 2 towards Nirman Vihar" },
  { id: 85, name: "Old GT Road - Barafkhana", lat: 28.7020, lng: 77.2050, district: "North", risk: "moderate", type: "waterlogging", description: "Near Barafkhana area" },

  // === VULNERABLE VILLAGES ===
  { id: 86, name: "Usmanpur Village", lat: 28.6960, lng: 77.2610, district: "North East", risk: "critical", type: "village", description: "Totally exposed - settlement within flood plain, submerged in 2023" },
  { id: 87, name: "Garhi Mandu Village", lat: 28.7000, lng: 77.2580, district: "North East", risk: "critical", type: "village", description: "Totally exposed village - flood plain settlement" },
  { id: 88, name: "Joga Bai Village", lat: 28.5580, lng: 77.2760, district: "South East", risk: "critical", type: "village", description: "Totally exposed to flooding (Wazirabad/Jaitpur Sector)" },
  { id: 89, name: "Khizrabad Village", lat: 28.5680, lng: 77.2840, district: "South East", risk: "critical", type: "village", description: "Totally exposed to flooding (Wazirabad/Jaitpur Sector)" },
  { id: 90, name: "Palla Village", lat: 28.8200, lng: 77.1500, district: "North", risk: "high", type: "village", description: "Moderately exposed - Alipur Sector" },
  { id: 91, name: "Galibpur Village", lat: 28.5680, lng: 76.9350, district: "South West", risk: "high", type: "village", description: "Moderately exposed - Najafgarh-Dhansa Sector" },
  { id: 92, name: "Daryapur Village", lat: 28.7420, lng: 77.0450, district: "North West", risk: "high", type: "village", description: "Moderately exposed - Kanjhawla-Nangloi Sector" },
  { id: 93, name: "Bawana Village", lat: 28.7760, lng: 77.0530, district: "North", risk: "high", type: "village", description: "Moderately exposed - Kanjhawla-Nangloi Sector" },
];

export const districts = [
  { name: "Central", center: [28.6500, 77.2200] },
  { name: "North", center: [28.7500, 77.2000] },
  { name: "North East", center: [28.7000, 77.2700] },
  { name: "North West", center: [28.7200, 77.0800] },
  { name: "East", center: [28.6300, 77.2900] },
  { name: "West", center: [28.6500, 77.1000] },
  { name: "South", center: [28.5200, 77.2300] },
  { name: "South East", center: [28.5500, 77.2800] },
  { name: "South West", center: [28.5700, 77.0500] },
  { name: "New Delhi", center: [28.6100, 77.2100] },
  { name: "Shahdara", center: [28.6700, 77.2900] },
];

export const riskColors = {
  critical: "#DC2626",
  high: "#F97316",
  moderate: "#EAB308",
  low: "#22C55E",
};

export const safeZones = [
  { id: 201, name: "Jawahar Lal Nehru Stadium", lat: 28.5820, lng: 77.2340, district: "South East", description: "Elevated structure, designated disaster relief camp" },
  { id: 202, name: "North Campus Ridge (DU)", lat: 28.6880, lng: 77.2080, district: "North", description: "High natural elevation (Delhi Ridge), safe from Yamuna overflow" },
  { id: 203, name: "Thyagaraj Sports Complex", lat: 28.5750, lng: 77.2150, district: "South", description: "Modern elevated sports complex with emergency facilities" },
  { id: 204, name: "Dwarka Sector 11 Sports Complex", lat: 28.5850, lng: 77.0450, district: "South West", description: "Away from flood plains with excellent drainage" },
  { id: 205, name: "Pragati Maidan Halls", lat: 28.6180, lng: 77.2400, district: "New Delhi", description: "High plinth capacity for emergency shelter" },
  { id: 206, name: "India Gate Lawns (Upper)", lat: 28.6120, lng: 77.2290, district: "New Delhi", description: "Central elevated zones safe from inundation" },
];
