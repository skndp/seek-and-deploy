<template>
  <section class="cover-slide">
    <div class="inner gutter">
      <h2 class="title h1 pad-t">{{ title }}</h2>
      <div class="copy-blocks">
        <p class="copy">{{ store.titleSlideMsg }}</p>
        <p class="copy">&nbsp;</p> <!-- Eithe empty, or have message like "No terms. No polices. Stay metal." or "No robots. Just dudes. Drinking beers." -->
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .copy {
    height: $space-64;
    display: flex;
    align-items: center;
  }

  @include respond-to($tablet) {
    .copy {
      height: $space-96;
    }
  }

  @include respond-to($macbook) {
    .copy {
      height: $space-64;
    }
  }
}
</style>
