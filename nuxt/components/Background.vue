<template>
  <section :class="['background', store.slidePrevState, store.slideActiveState, store.slideNextState]">
    <div class="particles">

    </div>
    <div class="logo">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="600" viewBox="0 0 600 600">
        <polygon points="12.31 543.06 63.58 594.27 363.93 294.31 261.37 294.31 12.31 543.06"/>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="600" viewBox="0 0 600 600">
        <polygon points="72.53 221.88 0 294.31 363.93 294.31 436.46 221.88 72.53 221.88"/>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="600" viewBox="0 0 600 600">
        <polygon points="340.23 56.94 288.96 5.73 72.53 221.88 175.07 221.88 340.23 56.94"/>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="600" viewBox="0 0 600 600">
        <polygon points="527.49 336.22 527.49 233.78 166.78 594.02 269.35 594.02 527.49 336.22"/>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="600" viewBox="0 0 600 600">
        <polygon points="600 521.57 341.89 521.57 269.35 594.02 600 594.02 600 521.57"/>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="600" viewBox="0 0 600 600">
        <polygon points="527.49 521.57 600 521.57 600 161.37 527.49 233.78 527.49 521.57"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();
</script>

<style lang='scss'>
.background {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  z-index: -1;
  perspective: 1200px;
  transform-style: preserve-3d;

  &.slide-0-next,
  &.slide-0-active {
    .logo {
      svg {
        opacity: 1;

        &:nth-child(1) {
          transform: none;
        }
      }
    }
  }

  .logo {
    position: absolute;
    bottom: 0%;
    right: $space-64;
    margin-bottom: $space-64;
    width: 33%;
    aspect-ratio: 1/1;

    svg {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      fill: $white;
      transition: transform $speed-666 $evil-ease, opacity $speed-666 $evil-ease;
      opacity: 0.2;

      &:nth-child(1) {
        transform: translate3d(100px, 100px, -2000px) rotateX(10deg) rotateY(35deg) rotateZ(45deg);
      }
    }
  }

  @include respond-to($tablet) {
    .logo {
      right: $space-96;
      margin-bottom: $space-96;
    }
  }

  @include respond-to($macbook) {
    .logo {
      right: $space-128;
      margin-bottom: $space-128;
    }
  }
}
</style>
