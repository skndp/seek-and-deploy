<template>
  <Background />
  <Menu />
  <NuxtPage :transition="pageTransition" />
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const menuTransitionState = useState('menu-transition-state', () => isHomePath(route.path) ? 'home' : 'detail');
const menuTransitionDirection = useState('menu-transition-direction', () => 'idle');
const detailRouteTransitionState = useState('detail-route-transition-state', () => 'idle');
const transitionStepMs = 666;
let detailLeaveRotationTimeout;
let detailRouteEnterResetFrame;

// Mounted
onMounted(() => {
  window.addEventListener('resize', onResize)
  onResize()

  nextTick(() => {
    window.dispatchEvent(new Event('app-ready'))
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
