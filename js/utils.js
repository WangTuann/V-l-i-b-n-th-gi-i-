function normalize(str) {
  return str
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .trim()
    .toLowerCase();
}

function removePrefix(str) {
  return str?.replace(/^(x[aã]|phường|thị trấn)\s+/i, '').trim();
}

function normalizeSmart(str) {
  return normalize(
    removePrefix(str)
      .split('-')[0] // bỏ phần sau “-”
  ).replace(/[^a-z0-9]/gi, '');
}
