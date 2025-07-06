function getColorByDensity(danso, dientich) {
  if (!danso || !dientich || dientich === 0) return '#ccc';
  const density = danso / dientich;

  if (density > 1000) return '#005b96'; // đậm
  if (density > 500)  return '#247ba0';
  if (density > 200)  return '#70c1b3';
  if (density > 100)  return '#b2dbbf';
  if (density > 50)   return '#f3ffbd';
  return '#ffffffff';
}
