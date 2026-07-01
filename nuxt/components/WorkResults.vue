<template>
  <section class="project-results detail-slide">
    <div class="detail-snap detail-snap-half" aria-hidden="true" />
    <div class="results-block">
      <div
        v-for="(label, index) in project.resultLabels"
        :key="index"
        class="results-stat-block"
      >
        <span>{{ label }}</span>
      </div>
    </div>
    <div class="title-block">
      <h2 class="section-title h3">The Results</h2>
      <p class="fs-sm">
        Next:
        <NuxtLink v-if="nextProject" class="next-project" :to="nextProject.path">{{ nextProject.title }}</NuxtLink>
      </p>
    </div>
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
section.project-results {
  position: relative;
  height: 100%;
  @include work-section-width(2);
  display: flex;
  flex-direction: column;
  justify-content: center;

  .detail-snap-half {
    position: absolute;
    top: 0px;
    left: 50%;
    width: 0px;
    height: 100%;
    pointer-events: none;
  }

  .results-block {
    position: relative;
    margin: 0 span(1);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: span(1);
    
    .results-stat-block {
      position: relative;
      aspect-ratio: 1/1;
      background-color: $gray;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .title-block {
    position: absolute;
    bottom: span(1);
    left: span(1);
    right: span(1);
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    p {
      display: inline-flex;

      a {
        margin-left: 1ch;
        text-decoration: underline;
        text-decoration-color: $yellow;
        text-decoration-thickness: 1px;
        text-underline-offset: 0.2em;
        display: flex;
      }
    }
  }

  @include respond-to($landscape) {
    @include respond-to($desktop) {
      .results-block {
        margin: 0 span(2) 0 span(1);
      }
    }

    @include respond-to($macbook) {
      .title-block {
        bottom: span(0.5);
      }
    }
  }
}
</style>
