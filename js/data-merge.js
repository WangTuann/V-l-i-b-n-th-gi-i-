function mergeData(geojsonData, dataList) {
  return geojsonData.features.map(feature => {
    const nameInGeo = normalizeSmart(feature.properties.name);
    const matched = dataList.find(item =>
      normalizeSmart(item.tenhc) === nameInGeo
    );

    feature.properties = {
      ...feature.properties,
      ...(matched || {})
    };

    return feature;
  });
}
