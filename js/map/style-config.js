// function getColorByDensity(danso, dientich) {
//   if (!danso || !dientich || dientich === 0) return '#ccc';
//   const density = danso / dientich;

//   if (density > 1000) return '#005b96'; // đậm
//   if (density > 500)  return '#247ba0';
//   if (density > 200)  return '#70c1b3';
//   if (density > 100)  return '#b2dbbf';
//   if (density > 50)   return '#f3ffbd';
//   return '#ffffffff';
// }

// function getRandomColor() {
//   const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0'];
//   return colors[Math.floor(Math.random() * colors.length)];
// }

export function getColorByDensity(danso, dientich) {
  if (!danso || !dientich || dientich === 0) return '#ccc';
  const density = danso / dientich;

  if (density > 1000) return '#005b96';
  if (density > 500)  return '#247ba0';
  if (density > 200)  return '#70c1b3';
  if (density > 100)  return '#b2dbbf';
  if (density > 50)   return '#f3ffbd';
  return '#ffffff';
}

export function getFeatureStyle(properties) {
  return {
    color: '#333',
    weight: 1,
    fillColor: getColorByDensity(properties.dansonguoi, properties.dientichkm2),
    fillOpacity: 0.8
  };
}
