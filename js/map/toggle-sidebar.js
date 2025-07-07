export function setupSidebarToggle(toggleBtnId, sidebarId, mapContainerId, map) {
  const toggleBtn = document.getElementById(toggleBtnId);
  const sidebar = document.getElementById(sidebarId);
  const mapContainer = document.getElementById(mapContainerId);
  const icon = document.getElementById('toggleIcon');

  toggleBtn.addEventListener('click', () => {
    const hidden = sidebar.classList.toggle('hidden');

    if (hidden) {
      mapContainer.classList.replace('w-2/3', 'w-full');
      toggleBtn.setAttribute('aria-label', 'Hiện thông tin');
      icon.setAttribute('data-lucide', 'chevrons-right');
    } else {
      mapContainer.classList.replace('w-full', 'w-2/3');
      toggleBtn.setAttribute('aria-label', 'Ẩn thông tin');
      icon.setAttribute('data-lucide', 'chevrons-left');
    }

    lucide.createIcons(); // cập nhật lại SVG icon

    setTimeout(() => map.invalidateSize(), 300);
  });
}
