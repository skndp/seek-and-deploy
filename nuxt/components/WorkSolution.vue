<template>
  <section class="project-solution">
    <h2 class="section-title">The Solution</h2>
    <div class="media solution-media">
      <span>{{ project.solutionLabel }}</span>
    </div>
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
  .project-solution {
    align-items: flex-start;
    gap: span(1);
    padding-left: span(1);

    .section-title {
      margin-top: 13vh;
      width: span(2.6);
    }

    .solution-media {
      width: 126vh;
      margin-top: 24vh;
      aspect-ratio: 2 / 1;
    }
  }
}
</style>
