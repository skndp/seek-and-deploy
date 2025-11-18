<template>
  <Background />
  <div>
    <NuxtPage />
  </div>
  <Menu />
</template>

<script setup>
// Mounted
onMounted(() => {
  window.scrollTo(0, 0);
  window.addEventListener('resize', onResize);
  onResize();

  requestAnimationFrame(() => {
    window.dispatchEvent(new Event('app-ready'));
  });
});

// Before Unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

// Methods
function onResize() {
  updateScrollbarWidth();
};

function updateScrollbarWidth() {
  // NOTE: Store scrollbar width in css custom property to calculate grid spans properly
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
};
</script>
