const map = L.map('map').setView([11.95, 108.44], 9);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

Promise.all([
  fetch('export.geojson').then(res => res.json()),
  fetch('data.json').then(res => res.json())
])
.then(([geojsonData, dataList]) => {
  const mergedFeatures = mergeData(geojsonData, dataList);

  const layer = L.geoJSON({ type: 'FeatureCollection', features: mergedFeatures }, {
    style: feature => ({
      color: '#333',
      weight: 1,
      fillColor: getColorByDensity(
        feature.properties.dansonguoi,
        feature.properties.dientichkm2
      ),
      fillOpacity: 0.7
    }),
    onEachFeature: (feature, layer) => {
      const p = feature.properties;
      const info = `
        <b>${p.tenhc || p.name}</b><br/>
        Loại: ${p.loai || '-'}<br/>
        Diện tích: ${p.dientichkm2 || '-'} km²<br/>
        Dân số: ${p.dansonguoi || '-'} người
      `;
      layer.bindPopup(info);
      layer.on('mouseover', () => layer.openPopup());
      layer.on('mouseout', () => layer.closePopup());
    }
  }).addTo(map);
  createMaskFromGeojson({ type: "FeatureCollection", features: mergedFeatures });


  map.fitBounds(layer.getBounds());
});

function createMaskFromGeojson(geojson) {
  const outer = [
    [ -90, -180 ],
    [ -90,  180 ],
    [  90,  180 ],
    [  90, -180 ]
  ];

  const holes = [];

  geojson.features.forEach(feature => {
    const geom = feature.geometry;

    if (geom.type === 'Polygon') {
      holes.push(geom.coordinates[0].map(([lng, lat]) => [lat, lng]));
    }

    if (geom.type === 'MultiPolygon') {
      geom.coordinates.forEach(poly =>
        holes.push(poly[0].map(([lng, lat]) => [lat, lng]))
      );
    }
  });

  // Polygon toàn cầu, trừ tỉnh
  const mask = L.polygon([outer, ...holes], {
    color: 'white',
    fillColor: '#cccccccc',
    fillOpacity: 0.9,
    stroke: false
  }).addTo(map);
}
// createMaskFromGeojson({ type: "FeatureCollection", features: mergedFeatures });

