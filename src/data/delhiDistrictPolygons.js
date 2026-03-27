// Approximate bounding coordinates for the 11 Delhi Revenue/Drainage Districts
// Format: [lng, lat] pairs for CesiumJS polygons

export const DELHI_DISTRICTS_POLYGONS = [
  {
    name: "Central",
    coords: [77.18, 28.64, 77.25, 28.64, 77.25, 28.68, 77.18, 28.68],
    baseHeight: 210,
    fcoCapacity: 185, // m³/s
    areaScale: 0.8
  },
  {
    name: "North",
    coords: [77.15, 28.68, 77.22, 28.68, 77.22, 28.88, 77.15, 28.88],
    baseHeight: 205,
    fcoCapacity: 260,
    areaScale: 1.5
  },
  {
    name: "North East",
    coords: [77.24, 28.69, 77.30, 28.69, 77.30, 28.76, 77.24, 28.76],
    baseHeight: 200,
    fcoCapacity: 140,
    areaScale: 0.9
  },
  {
    name: "North West",
    coords: [76.90, 28.68, 77.15, 28.68, 77.15, 28.85, 76.90, 28.85],
    baseHeight: 215,
    fcoCapacity: 380,
    areaScale: 2.5
  },
  {
    name: "East",
    coords: [77.27, 28.61, 77.34, 28.61, 77.34, 28.69, 77.27, 28.69],
    baseHeight: 198,
    fcoCapacity: 195,
    areaScale: 1.0
  },
  {
    name: "West",
    coords: [77.02, 28.60, 77.15, 28.60, 77.15, 28.68, 77.02, 28.68],
    baseHeight: 212,
    fcoCapacity: 290,
    areaScale: 1.8
  },
  {
    name: "South",
    coords: [77.15, 28.45, 77.26, 28.45, 77.26, 28.58, 77.15, 28.58],
    baseHeight: 225,
    fcoCapacity: 410,
    areaScale: 2.2
  },
  {
    name: "South East",
    coords: [77.23, 28.52, 77.32, 28.52, 77.32, 28.60, 77.23, 28.60],
    baseHeight: 205,
    fcoCapacity: 175,
    areaScale: 1.2
  },
  {
    name: "South West",
    coords: [76.88, 28.50, 77.10, 28.50, 77.10, 28.63, 76.88, 28.63],
    baseHeight: 220,
    fcoCapacity: 450,
    areaScale: 3.0
  },
  {
    name: "New Delhi",
    coords: [77.15, 28.58, 77.23, 28.58, 77.23, 28.64, 77.15, 28.64],
    baseHeight: 215,
    fcoCapacity: 150,
    areaScale: 0.7
  },
  {
    name: "Shahdara",
    coords: [77.28, 28.67, 77.32, 28.67, 77.32, 28.70, 77.28, 28.70],
    baseHeight: 199,
    fcoCapacity: 110,
    areaScale: 0.6
  }
];
