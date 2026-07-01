<template>
  <section class="project-hero detail-slide">
    <div class="title-block">
      <h1 class="h2">{{ project.title }}</h1>
      <NuxtLink class="project-link fs-sm" :href="project.url" target="_blank">Visit Site</NuxtLink>
    </div>
    <div class="media-block">
      <figure class="media-holder">
        <img :src="project.image" :alt="project.title" />
      </figure>
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
section.project-hero {
  position: relative;
  height: 100%;
  @include work-section-width(1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  .title-block {
    order: 2;
    width: 100%;
    margin-top: span(1);
    margin-left: span(2);

    a {
      margin-top: $space-8;
      text-decoration: underline;
      text-decoration-color: $yellow;
      text-decoration-thickness: 1px;
      text-underline-offset: 0.2em;
      display: flex;
    }
  }

  .media-block {
    order: 1;
    width: 100%;
    margin-left: span(2);

    .media-holder {
      position: relative;
      width: 100%;
      aspect-ratio: 4/3;

      img {
        @include abs-fill;
        object-fit: cover;
        object-position: 50% 50%;
      }
    }
  }

  @include respond-to($landscape) {
    .title-block {
      position: absolute;
      top: 50%;
      left: span(1);
      right: span(1);
      width: auto;
      margin-top: 0px;
      margin-left: 0px;
      transform: translateY(-100%);
      z-index: 1;
    }

    .media-block {
      order: 1;
      width: 70%;
      margin-left: auto;
      margin-right: span(1);

      .media-holder {
        aspect-ratio: 2/1;
      }
    }
  }
}
</style>
