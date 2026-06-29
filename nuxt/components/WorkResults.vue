<template>
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
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  },
  nextProject: {
    type: Object,
    default: null
  }
});
</script>

<style lang="scss">
.work-detail-page {
  .project-results {
    align-items: flex-start;
    gap: span(1);
    padding: 0 span(1);

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
