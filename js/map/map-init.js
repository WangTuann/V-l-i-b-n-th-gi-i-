import { initializeMap } from './map-core.js';
import { loadAndMergeData } from './data-loader.js';
import { getFeatureStyle } from './style-config.js';
import { setupFeatureInteractions } from './ui-interaction.js';
import { setupSidebarToggle } from './toggle-sidebar.js';

document.addEventListener('DOMContentLoaded', async () => {
  const map = initializeMap();
  const sidebar = document.getElementById('sidebar');
  const infoBox = document.getElementById('info');

  const mergedFeatures = await loadAndMergeData('export.geojson', 'data.json');

  const geoLayer = L.geoJSON({ type: 'FeatureCollection', features: mergedFeatures }, {
    style: feature => getFeatureStyle(feature.properties),
    onEachFeature: (feature, layer) => {
      setupFeatureInteractions(layer, feature.properties, infoBox, sidebar);
    }
  }).addTo(map);

  map.fitBounds(geoLayer.getBounds(), {
    padding: [20, 20],
    animate: true,
    duration: 1
  });
  map.setMaxBounds(geoLayer.getBounds());

  setupSidebarToggle('toggleSidebar', 'sidebar', 'map-container', map);
});