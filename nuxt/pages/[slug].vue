<template>
  <main v-if="project" :class="['page work-detail-page', workDetailPageClasses]" :style="workDetailPageStyle">
    <div class="page-scroll" ref="pageScrollRef">
      <article class="work-track" :style="workTrackStyle">
        <WorkProjectHero :project="project" />
        <WorkChallenge :project="project" />
        <WorkSolution :project="project" />
        <WorkResults :project="project" :next-project="nextProject" />
      </article>
    </div>
  </main>
</template>

<script setup>
import { getNextWorkProject, getWorkProjectBySlug } from '~/data/work';

const route = useRoute();
const slug = computed(() => String(route.params.slug || ''));
const project = computed(() => getWorkProjectBySlug(slug.value));
const nextProject = computed(() => project.value ? getNextWorkProject(project.value.slug) : null);
const pageScrollRef = ref(null);
const pageScrollSkew = ref(0);
const pageTransitionState = useState('menu-transition-state', () => 'detail');
const pageTransitionDirection = useState('menu-transition-direction', () => 'idle');
const detailRouteTransitionState = useState('detail-route-transition-state', () => 'idle');
const workDetailPageClasses = computed(() => ({
  scaler: ['detail-enter', 'detail-leave', 'detail-leave-rotate'].includes(pageTransitionState.value),
  cased: pageTransitionState.value === 'detail',
  'detail-to-home-leave': pageTransitionDirection.value === 'detail-to-home'
}));
const workDetailPageStyle = computed(() => {
  if (detailRouteTransitionState.value === 'detail-switch-leave') {
    return {
      opacity: '0',
      transform: 'scale(1) translateX(-20vw)'
    };
  }

  if (detailRouteTransitionState.value === 'detail-switch-enter') {
    return {
      opacity: '0',
      transform: 'scale(1) translateX(20vw)'
    };
  }

  return null;
});
const workTrackStyle = computed(() => ({
  transform: `skewX(${pageScrollSkew.value}deg)`
}));
const siteUrl = 'https://seekanddeploy.com';
let skewDecayFrame;

if(!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
    fatal: true
  });
}

useSeoMeta({
  title: () => `${project.value.title} | Seek and Deploy`,
  description: () => project.value.challenge,
  ogTitle: () => `${project.value.title} | Seek and Deploy`,
  ogDescription: () => project.value.challenge,
  ogImage: () => `${siteUrl}${project.value.image}`,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${project.value.title} | Seek and Deploy`,
  twitterDescription: () => project.value.challenge,
  twitterImage: () => `${siteUrl}${project.value.image}`
});

useHead({
  link: [
    {
      rel: 'canonical',
      href: () => `${siteUrl}${project.value.path}`
    }
  ]
});

onMounted(() => {
  pageScrollRef.value?.addEventListener('wheel', onPageScrollWheel, { passive: false });
});

onBeforeUnmount(() => {
  pageScrollRef.value?.removeEventListener('wheel', onPageScrollWheel);
  cancelAnimationFrame(skewDecayFrame);
});

function onPageScrollWheel(e) {
  const scroller = pageScrollRef.value;

  if(!scroller) {
    return;
  }

  const multiplier = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : e.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1,
        deltaX = e.deltaX * multiplier,
        deltaY = e.deltaY * multiplier;

  if(Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) {
    return;
  }

  const scrollDelta = Math.abs(deltaX) >= Math.abs(deltaY) ? deltaX : deltaY;

  e.preventDefault();

  scroller.scrollLeft += scrollDelta;
  pulseScrollSkew(scrollDelta);
}

function pulseScrollSkew(delta) {
  pageScrollSkew.value = clamp(pageScrollSkew.value + (delta / 40), -8, 8);
  startSkewDecay();
}

function startSkewDecay() {
  if(skewDecayFrame) {
    return;
  }

  const decay = () => {
    pageScrollSkew.value *= 0.84;

    if(Math.abs(pageScrollSkew.value) < 0.01) {
      pageScrollSkew.value = 0;
      skewDecayFrame = null;
      return;
    }

    skewDecayFrame = requestAnimationFrame(decay);
  };

  skewDecayFrame = requestAnimationFrame(decay);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
</script>

<style lang="scss">
.work-detail-page {
  position: absolute;
  top: 0px;
  right: 0px;
  left: $space-64;
  bottom: 0px;
  background-color: $black;
  overflow: hidden;
  opacity: 1;
  transform: translateX(0vw);
  transition: opacity $speed-666 $ease-out, transform $speed-666 $ease-out;
  will-change: opacity, transform;

  .page-scroll {
    @include abs-fill;
    overflow-x: auto;
    overflow-y: hidden;
    transform: scale(0.9);
    transform-origin: 50% 50%;
    transition: transform $speed-666 $evil-ease;
    will-change: transform;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;

    &::-webkit-scrollbar {
      display: none;
    }

    .work-track {
      position: relative;
      width: max-content;
      min-width: 100%;
      height: 100%;
      display: inline-flex;
      will-change: transform;
    }
  }

  &.cased {
    .page-scroll {
      transform: scale(1);
    }
  }

  &.scaler {
    .page-scroll {
      transform: scale(0.9);
    }
  }

  &.detail-to-home-leave {
    .page-scroll {
      transform: scale(0.9);
    }
  }

  &.detail-switch-leave,
  &.detail-switch-enter {
    .page-scroll {
      transform: scale(1);
    }
  }

  @include respond-to($tablet) {
    left: $space-96;
  }
}
</style>
