<template>
  <Transition name="loading">
    <Loader v-if="loading" />
  </Transition>
  <Background />
  <Menu />
  <NuxtPage />
</template>

<script setup>
const loading = ref(true);

// Mounted
onMounted(() => {
  window.scrollTo(0, 0)
  window.addEventListener('resize', onResize)
  onResize()

  nextTick(() => {
    window.dispatchEvent(new Event('app-ready'))
  });

  const fallback_timeout = 1000;
  waitForFonts(fallback_timeout).then(() => {
    loading.value = false;
  })
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

function waitForFonts(fallback_timeout) {
  const fontsToLoad = [
    { family: 'Lexend', weight: '400' },
    { family: 'Lexend', weight: '600' },
  ];

  const isFontApplied = function (fontFamily, fontWeight = '400') {
    const testString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const testSize = '100px';
    const fallbackFont = 'serif';

    const span = document.createElement('span');
    span.style.fontFamily = fallbackFont;
    span.style.fontWeight = fontWeight;
    span.style.fontSize = testSize;
    span.style.position = 'absolute';
    span.style.visibility = 'hidden';
    span.style.whiteSpace = 'nowrap';
    span.textContent = testString;
    document.body.appendChild(span);

    const fallbackWidth = span.offsetWidth;
    const fallbackHeight = span.offsetHeight;

    span.style.fontFamily = `"${fontFamily}", ${fallbackFont}`;

    const loadedWidth = span.offsetWidth;
    const loadedHeight = span.offsetHeight;

    document.body.removeChild(span);
    return loadedWidth !== fallbackWidth || loadedHeight !== fallbackHeight;
  };

  // Wrap each font check in a Promise so we can await all
  const fontPromises = fontsToLoad.map(font => {
    return new Promise(resolve => {
      const loaded = isFontApplied(font.family, font.weight);
      resolve(loaded);
    });
  });

  // Promise for all fonts
  const allFontsPromise = Promise.all(fontPromises).then(results => {
    return results;
  });

  // Timeout fallback
  let timeoutId = null;
  const timerPromise = new Promise(resolve => {
    timeoutId = setTimeout(() => {
      resolve('timeout');
    }, fallback_timeout);
  });

  // Race fonts vs timer
  const race = Promise.race([allFontsPromise, timerPromise]).then(result => {
    if (result !== 'timeout') {
      clearTimeout(timeoutId);
    }
    return result;
  });

  return race;
}
</script>
