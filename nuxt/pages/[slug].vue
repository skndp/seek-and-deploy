<template>
  <main v-if="project" :class="['page work-detail-page', workDetailPageClasses]">
    <div class="page-scroll" ref="pageScrollRef">
      <article class="work-track">
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
const pageTransitionState = useState('menu-transition-state', () => 'detail');
const workDetailPageClasses = computed(() => ({
  scaler: ['detail-enter', 'detail-leave', 'detail-leave-rotate'].includes(pageTransitionState.value),
  cased: pageTransitionState.value === 'detail'
}));
const siteUrl = 'https://seekanddeploy.com';
let wheelSnapTimeout;

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
  clearTimeout(wheelSnapTimeout);
});

function onPageScrollWheel(e) {
  const scroller = pageScrollRef.value;

  if(!scroller) {
    return;
  }

  const multiplier = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : e.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1,
        deltaX = e.deltaX * multiplier,
        deltaY = e.deltaY * multiplier;

  if(Math.abs(deltaX) >= Math.abs(deltaY)) {
    return;
  }

  if(scroller.classList.contains('is-snapping')) {
    e.preventDefault();
    return;
  }

  if(Math.abs(deltaY) < 4) {
    return;
  }

  const snapTargets = getDetailSnapTargets(scroller);

  e.preventDefault();

  if(!snapTargets.length) {
    return;
  }

  const direction = deltaY > 0 ? 1 : -1,
        currentIndex = getClosestDetailSnapIndex(scroller, snapTargets),
        nextIndex = Math.min(Math.max(currentIndex + direction, 0), snapTargets.length - 1),
        nextTarget = snapTargets[nextIndex];

  if(!nextTarget || nextIndex === currentIndex) {
    return;
  }

  clearTimeout(wheelSnapTimeout);
  scroller.classList.add('is-snapping');
  scroller.scrollTo({
    left: nextTarget.left,
    behavior: 'smooth'
  });
  wheelSnapTimeout = setTimeout(() => {
    scroller.classList.remove('is-snapping');
  }, 777);
}

function getDetailSnapTargets(scroller) {
  return [...scroller.querySelectorAll('.detail-slide, .detail-snap')]
    .filter((target) => target.getClientRects().length)
    .map((target) => ({
      el: target,
      left: getDetailSnapTargetLeft(scroller, target)
    }))
    .sort((a, b) => a.left - b.left);
}

function getClosestDetailSnapIndex(scroller, snapTargets) {
  return snapTargets.reduce((closestIndex, target, index) => {
    const closestDistance = Math.abs(snapTargets[closestIndex].left - scroller.scrollLeft),
          targetDistance = Math.abs(target.left - scroller.scrollLeft);

    return targetDistance < closestDistance ? index : closestIndex;
  }, 0);
}

function getDetailSnapTargetLeft(scroller, target) {
  return target.getBoundingClientRect().left - scroller.getBoundingClientRect().left + scroller.scrollLeft;
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

  &.cased {
    .page-scroll {
      transform: scale(1);
    }
  }

  &.page-leave-active {
    .page-scroll {
      transform: scale(0.9);
    }
  }

  .page-scroll {
    @include abs-fill;
    overflow-x: auto;
    overflow-y: hidden;
    transform-origin: 50% 50%;
    transform: scale(0.9);
    transition: transform $speed-666 $evil-ease;
    will-change: transform;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
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

      .detail-slide {
        flex: 0 0 auto;
      }

      .detail-slide,
      .detail-snap {
        scroll-snap-align: start;
        scroll-snap-stop: always;
      }
    }
  }

  @include respond-to($tablet) {
    left: $space-96;
  }
}
</style>
