export function initializeMap() {
  const map = L.map('map', {
    minZoom: 8,
    maxZoom: 18,
    maxBoundsViscosity: 1.0
  }).setView([11.95, 108.44], 9);

  // Tô nền biển bằng polygon phủ toàn bản đồ
  L.polygon([
    [[-90, -180], [-90, 180], [90, 180], [90, -180]]
  ], {
    stroke: false,
    fillColor: '#AADAFF',
    fillOpacity: 0.8
  }).addTo(map);

  // Bản đồ nền
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  return map;
}
