<template>
  <main v-if="project" :class="['page work-detail-page', workDetailPageClasses]" :style="workDetailPageStyle">
    <div class="page-scroll" ref="pageScrollRef">
      <article class="work-track">
        <WorkProjectHero :project="project" />
        <WorkChallenge :project="project" />
        <WorkSolution :project="project" />
        <WorkBuild :project="project" />
        <WorkResults :project="project" :next-project="nextProject" />
      </article>
    </div>
  </main>
</template>

<script setup>
import { getNextWorkProject, getWorkProjectBySlug } from '~/data/work';
import { useSiteStore } from '~/stores/store';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

const route = useRoute();
const slug = computed(() => String(route.params.slug || ''));
const project = computed(() => getWorkProjectBySlug(slug.value));
const nextProject = computed(() => project.value ? getNextWorkProject(project.value.slug) : null);
const store = useSiteStore();
const pageScrollRef = ref(null);
const pageTransitionState = useState('menu-transition-state', () => 'detail');
const pageTransitionDirection = useState('menu-transition-direction', () => 'idle');
const detailRouteTransitionState = useState('detail-route-transition-state', () => 'idle');
let detailRevealFrame;
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
const siteUrl = 'https://seekanddeploy.com';
const projectJsonLd = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}${project.value.path}#breadcrumbs`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Work',
          item: `${siteUrl}/#work`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: project.value.title,
          item: `${siteUrl}${project.value.path}`
        }
      ]
    },
    {
      '@type': 'CreativeWork',
      '@id': `${siteUrl}${project.value.path}#creativework`,
      name: project.value.title,
      description: project.value.challenge.copy,
      image: `${siteUrl}${project.value.image}`,
      url: `${siteUrl}${project.value.path}`,
      author: {
        '@id': `${siteUrl}/#organization`
      },
      publisher: {
        '@id': `${siteUrl}/#organization`
      },
      isPartOf: {
        '@id': `${siteUrl}/#website`
      }
    }
  ]
}));

if(!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
    fatal: true
  });
}

useSeoMeta({
  title: () => `${project.value.title} | Seek and Deploy`,
  description: () => project.value.challenge.copy,
  ogTitle: () => `${project.value.title} | Seek and Deploy`,
  ogDescription: () => project.value.challenge.copy,
  ogImage: () => `${siteUrl}${project.value.image}`,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${project.value.title} | Seek and Deploy`,
  twitterDescription: () => project.value.challenge.copy,
  twitterImage: () => `${siteUrl}${project.value.image}`
});

useHead({
  link: [
    {
      rel: 'canonical',
      href: () => `${siteUrl}${project.value.path}`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: projectJsonLd
    }
  ]
});

onMounted(() => {
  clearAllBodyScrollLocks();

  if (store.initialSlide && store.slideActiveState === 'slide-0-active') {
    store.setInitialSlide(false);
    store.setSlideActiveState('slide-3-active');
  }

  pageScrollRef.value?.addEventListener('wheel', onPageScrollWheel, { passive: false });
  pageScrollRef.value?.addEventListener('scroll', onPageScroll, { passive: true });
  nextTick(() => {
    updateDetailRevealState();
  });
});

onBeforeUnmount(() => {
  pageScrollRef.value?.removeEventListener('wheel', onPageScrollWheel);
  pageScrollRef.value?.removeEventListener('scroll', onPageScroll);
  clearDetailRevealFrame();
});

function onPageScrollWheel(e) {
  const scrollDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

  e.preventDefault();
  e.currentTarget.scrollLeft += scrollDelta;
}

function onPageScroll() {
  if (detailRevealFrame) {
    return;
  }

  detailRevealFrame = window.requestAnimationFrame(() => {
    updateDetailRevealState();
    detailRevealFrame = null;
  });
}

function updateDetailRevealState() {
  const root = pageScrollRef.value;

  if (!root) {
    return;
  }

  const rootRect = root.getBoundingClientRect();
  const targets = root.querySelectorAll('.detail-fade');

  targets.forEach((target) => {
    const targetRect = target.getBoundingClientRect();

    if (targetRect.left < rootRect.right) {
      target.classList.add('is-visible');
    } else {
      target.classList.remove('is-visible');
    }
  });
}

function clearDetailRevealFrame() {
  if (detailRevealFrame) {
    window.cancelAnimationFrame(detailRevealFrame);
    detailRevealFrame = null;
  }
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
    touch-action: pan-x;
    transform: scale(0.9);
    transform-origin: 50% 50%;
    transition: transform $speed-666 $evil-ease;
    will-change: transform;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;

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

.detail-fade {
  opacity: 0;
  transform: skewX(8deg) translateY($space-24);
  transition: opacity 1s $ease-out, transform 1s $ease-out;
  will-change: opacity, transform;

  &.is-visible {
    opacity: 1;
    transform: skewX(0deg) translateY(0px);
  }

  @include respond-to($tablet) {
    transform: skewX(13deg) translateY($space-48);

    &.is-visible {
      transform: skewX(0deg) translateY(0px);
    }
  }
}
</style>
