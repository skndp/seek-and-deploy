<template>
  <section class="slide cover-slide">
    <div class="inner">
      <div class="gutter">
        <h2 class="title h1 pad-t">{{ title }}</h2>
        <div class="copy-blocks">
          <p class="copy"><span>{{ store.titleSlideMsg }}</span></p>
          <p v-if="store.introSlide" class="copy fs-sm gray"><span>Go ahead. Scroll down.</span></p>
          <p v-else class="copy fs-sm gray"><span>No terms. No polices. Stay metal.</span></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

// Props
const props = defineProps({
  title: {
    type: String,
    required: false
  }
});
</script>

<style lang='scss'>
.cover-slide {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  .inner {
    flex-direction: column;

    .gutter {
      justify-content: space-between;

      .copy {
        height: $space-64;
        display: flex;
        align-items: center;

        span {
          margin-top: -0.04em;
        }
      }
    }
  }

  @include respond-to($tablet) {
    .inner {
      .gutter {
        .copy {
          height: $space-96;
        }
      }
    }
  }

  @include respond-to($macbook) {
    .inner {
      .gutter {
        .copy {
          height: $space-128;

          &:first-child {
            margin-bottom: -$space-32;
          }
        }
      }
    }
  }
}
</style>
