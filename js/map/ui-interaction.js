export function setupFeatureInteractions(layer, properties, infoBox, sidebar) {
  const popupContent = `
    <strong>${properties.tenhc || properties.name}</strong><br/>
    Dân số: ${properties.dansonguoi || '-'} người<br/>
    Diện tích: ${properties.dientichkm2 || '-'} km²
  `;

  const infoHTML = `
    <h2 class="text-xl font-semibold text-indigo-600">${properties.tenhc || properties.name}</h2>
    <p><span class="font-medium">Loại:</span> ${properties.loai || '-'}</p>
    <p><span class="font-medium">Dân số:</span> ${properties.dansonguoi || '-'} người</p>
    <p><span class="font-medium">Diện tích:</span> ${properties.dientichkm2 || '-'} km²</p>
  `;

  layer.on('mouseover', (e) => {
    layer.setStyle({ weight: 2, fillOpacity: 0.8 });
    layer.bindPopup(popupContent).openPopup(e.latlng);
  });

  layer.on('mouseout', () => {
    layer.setStyle({ weight: 1, fillOpacity: 0.6 });
    layer.closePopup();
  });

  layer.on('click', () => {
    infoBox.innerHTML = infoHTML;
    sidebar.classList.remove('hidden');
  });
}
