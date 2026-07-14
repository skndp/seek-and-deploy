<template>
  <section class="project-build detail-slide">
    <div class="title-block">
      <h2 class="section-title h3-mid detail-fade">The Build</h2>
    </div>

    <div class="build-list">
      <div
        v-for="(buildItem, index) in project.build?.buildList ?? []"
        :key="buildItem.label || index"
        class="build-item detail-fade"
      >
        <p class="build-label">{{ buildItem.label }}</p>
        <p class="build-value">{{ buildItem.value }}</p>
      </div>
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
section.project-build {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: span(1);

  @include work-section-width(1);

  .title-block {
    margin-bottom: span(2);

    .section-title {
      margin: 0;
      white-space: nowrap;
    }
  }

  .build-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: span(1);
    width: 100%;
  }

  .build-item {
    width: auto;
    min-width: 0;
  }

  .build-label,
  .build-value {
    white-space: normal;
  }

  @include respond-to($landscape) {
    display: grid;
    grid-template-columns: 320px auto;
    align-items: start;
    justify-content: start;
    column-gap: span(1);
    margin: span(2.5) span(1);

    .title-block {
      margin: 0;
    }

    .build-list {
      grid-template-columns: repeat(5, max-content);
      justify-content: start;
      align-self: start;
      gap: span(1.5) span(2);
      width: auto;
    }

    .build-item {
      width: max-content;
    }
  }

  @include respond-to($macbook) {
    grid-template-columns: 260px auto;
    column-gap: span(1);

    .build-list {
      column-gap: span(1);
    }
  }
}
</style>