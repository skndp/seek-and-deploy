<template>
  <section class="project-hero">
    <h1 class="h1">{{ project.title }}</h1>
    <figure class="media hero-media">
      <img :src="project.image" :alt="project.title" />
    </figure>
    <a class="project-link fs-sm" :href="project.url" target="_blank" rel="noopener">Visit Site</a>
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
  .project-hero {
    align-items: flex-start;
    padding-left: span(1);
    gap: span(1);
  }

  .h1 {
    width: span(3);
    margin-top: 30vh;
    z-index: 2;
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
}
</style>
