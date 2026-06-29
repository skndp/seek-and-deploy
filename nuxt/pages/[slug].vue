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
});

function onPageScrollWheel(e) {
  const scroller = pageScrollRef.value;

  if(!scroller) {
    return;
  }

  const multiplier = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : e.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1,
        deltaX = e.deltaX * multiplier,
        deltaY = e.deltaY * multiplier,
        delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX,
        maxScroll = scroller.scrollWidth - scroller.clientWidth,
        nextScroll = Math.min(Math.max(scroller.scrollLeft + delta, 0), maxScroll);

  if(nextScroll === scroller.scrollLeft) {
    return;
  }

  e.preventDefault();
  scroller.scrollLeft = nextScroll;
}
</script>

<style lang="scss">
.work-detail-page {
  @include abs-fill;
  overflow: hidden;
  backdrop-filter: blur(8px);

  .page-scroll {
    @include abs-fill;
    overflow-x: auto;
    overflow-y: hidden;
    transform-origin: 50% 50%;
    transform: scale(0.9);
    transition: transform $speed-666 $evil-ease;
    will-change: transform;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  }

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

  .work-track {
    position: relative;
    width: max-content;
    min-width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: stretch;
  }

  .project-hero,
  .project-challenge,
  .project-solution,
  .project-results {
    flex: 0 0 auto;
    height: 100%;
    box-sizing: border-box;
    display: flex;
  }

  .h1,
  .section-title,
  .case-copy,
  .project-link,
  .next-project {
    letter-spacing: 0;
    flex: 0 0 auto;
  }

  .h1,
  .section-title {
    line-height: 1.1em;
  }

  .section-title {
    font-size: clamp(18px, 1.35vw, 26px);
    font-weight: 400;
    color: $white;
  }

  .media {
    overflow: hidden;
    background: #9b9b9b;
    flex: 0 0 auto;

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: rgba($black, 0.7);
      font-size: 10px;
      line-height: 1em;
      letter-spacing: 0;
      text-align: center;
    }
  }
}
</style>
