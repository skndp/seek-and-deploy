<template>
  <Background />
  <Menu />
  <NuxtPage :transition="pageTransition" />
  <transition name="boot-loader">
    <div v-if="showBootLoader" class="boot-loader" aria-hidden="true" />
  </transition>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const menuTransitionState = useState('menu-transition-state', () => isHomePath(route.path) ? 'home' : 'detail');
const menuTransitionDirection = useState('menu-transition-direction', () => 'idle');
const detailRouteTransitionState = useState('detail-route-transition-state', () => 'idle');
const transitionStepMs = 666;
const showBootLoader = ref(true);
let detailLeaveRotationTimeout;
let detailRouteEnterResetFrame;

// Mounted
onMounted(() => {
  window.addEventListener('resize', onResize)
  onResize()

  nextTick(() => {
    window.dispatchEvent(new Event('app-ready'))
  });

  requestAnimationFrame(() => {
    showBootLoader.value = false;
  });
});

// Before Unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
  clearDetailLeaveRotationTimeout();
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

const pageTransition = {
  name: 'page',
  mode: 'out-in',
  onBeforeLeave(el) {
    if (menuTransitionDirection.value === 'home-to-detail' && isHomePage(el)) {
      menuTransitionState.value = 'home-leave';
    }

    if (menuTransitionDirection.value === 'detail-to-home' && isDetailPage(el)) {
      menuTransitionState.value = 'detail-leave';
      detailLeaveRotationTimeout = window.setTimeout(() => {
        menuTransitionState.value = 'detail-leave-rotate';
      }, transitionStepMs);
    }

    if (detailRouteTransitionState.value === 'detail-switch-leave' && isDetailPage(el)) {
      clearDetailRouteEnterResetFrame();
    }
  },
  onBeforeEnter(el) {
    if (menuTransitionDirection.value === 'home-to-detail' && isDetailPage(el)) {
      menuTransitionState.value = 'detail-enter';
    }

    if (menuTransitionDirection.value === 'detail-to-home' && isHomePage(el)) {
      menuTransitionState.value = 'home-enter';
    }

    if (detailRouteTransitionState.value === 'detail-switch-leave' && isDetailPage(el)) {
      detailRouteTransitionState.value = 'detail-switch-enter';
      clearDetailRouteEnterResetFrame();
      detailRouteEnterResetFrame = window.requestAnimationFrame(() => {
        detailRouteTransitionState.value = 'idle';
        detailRouteEnterResetFrame = null;
      });
    }
  },
  onAfterEnter(el) {
    clearDetailLeaveRotationTimeout();
    clearDetailRouteEnterResetFrame();
    detailRouteTransitionState.value = 'idle';
    menuTransitionState.value = isHomePage(el) ? 'home' : 'detail';
    menuTransitionDirection.value = 'idle';
  }
};

if (import.meta.client) {
  const removeRouteGuard = router.beforeEach((to, from) => {
    clearDetailLeaveRotationTimeout();

    const fromHome = isHomePath(from.path),
          toHome = isHomePath(to.path);

    if (fromHome && !toHome) {
      menuTransitionDirection.value = 'home-to-detail';
      return;
    }

    if (!fromHome && toHome) {
      menuTransitionDirection.value = 'detail-to-home';
      return;
    }

    if (!fromHome && !toHome) {
      menuTransitionDirection.value = 'idle';
      detailRouteTransitionState.value = 'detail-switch-leave';
      return;
    }

    menuTransitionDirection.value = 'idle';
    detailRouteTransitionState.value = 'idle';
    menuTransitionState.value = toHome ? 'home' : 'detail';
  });

  onBeforeUnmount(() => {
    removeRouteGuard();
  });
}

function isHomePath(path) {
  return path === '/';
}

function isHomePage(el) {
  return el.classList.contains('home-page');
}

function isDetailPage(el) {
  return el.classList.contains('work-detail-page');
}

function clearDetailLeaveRotationTimeout() {
  if (detailLeaveRotationTimeout) {
    window.clearTimeout(detailLeaveRotationTimeout);
    detailLeaveRotationTimeout = null;
  }
}

function clearDetailRouteEnterResetFrame() {
  if (detailRouteEnterResetFrame) {
    window.cancelAnimationFrame(detailRouteEnterResetFrame);
    detailRouteEnterResetFrame = null;
  }
}
</script>

<style lang="scss">
.boot-loader {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: $black;
  z-index: 9999;
  pointer-events: none;
}

.boot-loader-enter-active,
.boot-loader-leave-active {
  transition: opacity $speed-666 linear $speed-333;
}

.boot-loader-enter-from,
.boot-loader-leave-to {
  opacity: 0;
}

.boot-loader-enter-to,
.boot-loader-leave-from {
  opacity: 1;
}
</style>
