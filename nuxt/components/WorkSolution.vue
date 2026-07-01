<template>
  <section class="project-solution detail-slide">
    <h2 class="section-title h3">The Solution</h2>
    <div class="section-carousel">

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
section.project-solution {
  position: relative;
  height: 100%;
  @include work-section-width(1);
  display: flex;
  flex-direction: column;
  justify-content: center;

  .section-title {
    margin: 0 span(2) span(1);
    text-align: center;
  }

  .section-carousel {
    position: relative;
    aspect-ratio: 1/1;
    margin: 0 span(1);
    background-color: $gray;
    overflow: hidden;
    display: flex;
  }

  @include respond-to($landscape) {
    justify-content: space-between;

    .section-title {
      margin: span(1) span(2) 0;
    }

    .section-carousel {
      margin: span(0.5) span(1) span(1);
      aspect-ratio: auto;
      display: flex;
      flex-grow: 1;
    }

    @include respond-to($macbook) {
      .section-carousel {
        margin: span(0.5) span(2) span(1);
      }
    }
  }
}
</style>
