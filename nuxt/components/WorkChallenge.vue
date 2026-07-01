<template>
  <section class="project-challenge detail-slide">
    <div class="detail-snap detail-snap-half" aria-hidden="true" />
    <div class="title-block">
      <h2 class="section-title h3">The Challenge</h2>
      <p class="copy">{{ project.challenge }}</p>
    </div>
    <div class="media-block">
      <figure class="media-holder">
        <img :src="project.image" :alt="project.title" />
      </figure>
    </div>
    <figure class="extra-media-holder">
      <img :src="project.image" :alt="project.title" />
    </figure>
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
section.project-challenge {
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

  .title-block {
    position: relative;
    width: 100%;
    margin-bottom: span(1);
    display: flex;
    justify-content: space-between;

    .section-title {
      margin-left: span(4);
    }

    .copy {
      margin-right: span(2);
      width: calc(50% - span(4));
    }
  }

  .media-block {
    position: relative;
    width: 50%;
    margin-left: span(6);

    .media-holder {
      position: relative;
      width: 100%;
      aspect-ratio: 3/2;

      img {
        @include abs-fill;
        object-fit: cover;
        object-position: 50% 50%;
      }
    }
  }

  .extra-media-holder {
    display: none;
  }

  @include respond-to($landscape) {
    width: detail-slide-width(1);

    .detail-snap-half {
      display: none;
    }

    .title-block {
      height: 100%;
      min-height: 0px;
      margin-bottom: 0px;
      flex-direction: row;
      justify-content: space-between;
      flex-grow: 1;
      z-index: 1;

      .section-title {
        margin-top: span-h(3);
        margin-left: span(1);
      }

      .copy {
        width: span(5);
        margin-left: auto;
        margin-right: span(1);
        margin-top: span-h(3);
      }
    }

    .media-block {
      position: absolute;
      bottom: span-h(1);
      left: span(1);
      width: span(5);
      margin-left: 0px;
    }

    @include respond-to($tablet) {
      .title-block {
        flex-direction: column;

        .section-title {
          margin-top: span-h(4);
        }

        .copy {
          margin-top: 0px;
          margin-bottom: span-h(4);
          align-items: flex-end;
        }
      }

      .extra-media-holder {
        position: absolute;
        top: span(1);
        right: span(1);
        width: span(2);
        aspect-ratio: 1/1;
        overflow: hidden;
        display: flex;
      }
    }

    @include respond-to($macbook) {
      .title-block {
        .section-title {
          margin-top: span-h(3);
        }

        .copy {
          width: span(4);
          margin-bottom: span-h(3);
        }
      }

      .media-block {
        margin-left: span(1);
      }
    }
  }
}
</style>
