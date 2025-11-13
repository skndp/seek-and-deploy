<template>
  <section class="cover-slide">
    <span class="title">{{ title }}</span>
    <span class="copy">{{ store.titleSlideMsg }}</span>
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
  display: flex;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  .title {
    position: absolute;
    top: 0px;
    left: 7.142%;
    margin-top: 7.142%;
    font: normal normal 400 96px/1.2em $lexend;
    text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.16);
    background-image: linear-gradient(0deg,rgba(200, 200, 200, 1) 0%, rgba(255, 255, 255, 1) 66%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .copy {
    position: absolute;
    bottom: 0px;
    left: 7.142%;
    margin-bottom: 7.142%;
    color: $white;
    line-height: 1.4em;
  }
}
</style>
