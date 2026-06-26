<template>
  <main v-if="project" :class="['page work-detail-page', workDetailPageClasses]">
    <div class="page-scroll" ref="pageScrollRef">
      <article class="work-track">
        <section class="project-hero">
          <h1 class="h1">{{ project.title }}</h1>
          <figure class="media hero-media">
            <img :src="project.image" :alt="project.title" />
          </figure>
          <a class="project-link fs-sm" :href="project.url" target="_blank" rel="noopener">Visit Site</a>
        </section>
        <section class="project-challenge">
          <h2 class="section-title">The Challenge</h2>
          <div class="media challenge-media">
            <img :src="project.image" :alt="`${project.title} preview`" />
          </div>
          <p class="case-copy fs-sm">{{ project.challenge }}</p>
          <div class="media artifact-media" aria-hidden="true" />
        </section>
        <section class="project-solution">
          <h2 class="section-title">The Solution</h2>
          <div class="media solution-media">
            <span>{{ project.solutionLabel }}</span>
          </div>
          <p class="case-copy fs-sm">{{ project.solution }}</p>
        </section>
        <section class="project-results">
          <div
            v-for="(label, index) in project.resultLabels"
            :key="label"
            class="media result-media"
            :class="`result-media-${index + 1}`"
          >
            <span>{{ label }}</span>
          </div>
          <h2 class="section-title">The Results</h2>
          <p class="case-copy fs-sm">{{ project.results }}</p>
          <NuxtLink v-if="nextProject" class="next-project fs-sm" :to="nextProject.path">Next {{ nextProject.title }} &gt;</NuxtLink>
        </section>
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

  .project-hero {
    align-items: flex-start;
    padding-left: span(1);
    gap: span(1);
  }

  .project-challenge {
    align-items: flex-start;
    gap: span(1);
    padding-left: span(1);
  }

  .project-solution {
    align-items: flex-start;
    gap: span(1);
    padding-left: span(1);
  }

  .project-results {
    align-items: flex-start;
    gap: span(1);
    padding: 0 span(1);
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

  .h1 {
    width: span(3);
    margin-top: 30vh;
    z-index: 2;
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

  .hero-media {
    width: 104vh;
    margin-top: 24vh;
    aspect-ratio: 2 / 1;
  }

  .project-link {
    margin: 76vh 0 0 calc(-104vh - #{span(1)});
    color: $gray;
    transition: color $speed-333 $ease-out;

    &:after {
      content: ">";
      margin-left: 0.4em;
    }

    &:hover {
      color: $white;
    }
  }

  .project-challenge {
    .section-title {
      margin-top: 24vh;
      width: span(3.5);
    }

    .challenge-media {
      width: 60vh;
      margin-top: 50vh;
      aspect-ratio: 5 / 3;
      transform: translateY(-50%);
    }

    .case-copy {
      width: span(2.6);
      margin-top: 55vh;
      color: $white;
      font-weight: 600;
      line-height: 1.25em;
      transform: translateY(-50%);
    }

    .artifact-media {
      width: 26vh;
      margin-top: 12vh;
      aspect-ratio: 1 / 1;
    }
  }

  .project-solution {
    .section-title {
      margin-top: 13vh;
      width: span(2.6);
    }

    .solution-media {
      width: 126vh;
      margin-top: 24vh;
      aspect-ratio: 2 / 1;
    }

    .case-copy {
      width: span(3.6);
      margin: 77vh 0 0 calc(-1 * #{span(4.6)});
      color: $gray;
      line-height: 1.25em;
    }
  }

  .project-results {
    .section-title,
    .case-copy,
    .next-project {
      order: 2;
    }

    .section-title {
      width: span(3.5);
      margin-top: 81vh;
    }

    .case-copy {
      width: span(4);
      margin: calc(81vh + #{$space-40}) 0 0 calc(-1 * #{span(3.5)});
      color: $gray;
      line-height: 1.25em;
    }

    .result-media {
      order: 1;
      width: 42vh;
      margin-top: 24vh;
      aspect-ratio: 1 / 1;
    }

    .result-media-1 {
      margin-left: 0px;
    }

    .result-media-3 {
      margin-right: span(1);
    }

    .next-project {
      align-self: flex-start;
      margin: 88vh 0 0 span(1);
      color: $white;
      font-weight: 600;
      white-space: nowrap;
      transition: color $speed-333 $ease-out;

      &:hover {
        color: $yellow;
      }
    }
  }

}
</style>
