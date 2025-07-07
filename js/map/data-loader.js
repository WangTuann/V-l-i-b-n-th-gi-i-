export async function loadAndMergeData(geojsonUrl, dataUrl) {
  const [geojson, data] = await Promise.all([
    fetch(geojsonUrl).then(res => res.json()),
    fetch(dataUrl).then(res => res.json())
  ]);

  const normalize = str => str?.normalize("NFD").replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
  const removePrefix = str => str?.replace(/^(x[aã]|phường|thị trấn)\s+/i, '').trim();
  const smart = str => normalize(removePrefix(str).split('-')[0]).replace(/[^a-z0-9]/gi, '');

  const merged = geojson.features.map(f => {
    const matched = data.find(d => smart(d.tenhc) === smart(f.properties.name));
    f.properties = { ...f.properties, ...(matched || {}) };
    return f;
  });

  return merged;
}
