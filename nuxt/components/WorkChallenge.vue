<template>
  <section class="project-challenge">
    <h2 class="section-title">The Challenge</h2>
    <div class="media challenge-media">
      <img :src="project.image" :alt="`${project.title} preview`" />
    </div>
    <p class="case-copy fs-sm">{{ project.challenge }}</p>
    <div class="media artifact-media" aria-hidden="true" />
  </section>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
});
</script>

<style lang="scss">
.work-detail-page {
  .project-challenge {
    align-items: flex-start;
    gap: span(1);
    padding-left: span(1);

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
}
</style>
