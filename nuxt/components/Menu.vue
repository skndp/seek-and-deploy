<template>
  <nav :class="['menu', store.slidePrevState, store.slideActiveState, store.slideNextState]">
    <div class="icon --logo" />
    <div class="ticks">
      <button
        v-for="(number, index) in 5"
        :class="['tick', {'active': store.slideNextState === `slide-${number}-next` || store.slideActiveState === `slide-${number}-active`}]"
        :key="index"
        @click="setActiveSlide(number)"
      />
    </div>
    <NuxtLink class="icon --mail" to="mailto:hello@seekanddeploy.com" target="_blank" aria-label="Email: hello@seekanddeploy.com" />
    <button class="icon --down" aria-label="Next Section" @click="setNextSlide" />
  </nav>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

// Methods
function setActiveSlide(number) {
  if (!store.changingSlides) {
    store.setSlideIndex(number);
  }
}

function setNextSlide() {
  if (!store.changingSlides) {
    let nextIndex = store.slideIndex + 1;
    store.setSlideIndex(nextIndex);
  }
}
</script>

<style lang='scss'>
nav.menu {
  position: fixed;
  top: 0px;
  left: 0px;
  width: $space-64;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 13;

  @keyframes bounce {
    0% {
      transform: translateY(0%);
    }
    30% {
      transform: translateY(-15%);
    }
    40% {
      transform: translateY(0%);
    }
    60% {
      transform: translateY(-10%);
    }
    70% {
      transform: translateY(0%);
    }
    90% {
      transform: translateY(-5%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  &.slide-0-next,
  &.slide-0-active {
    &:before {
      opacity: 0;
    }

    .--logo {
      opacity: 0;
      pointer-events: none;
    }

    .ticks {
      .tick {
        opacity: 0;
        transform: translateY(50%);
        pointer-events: none;

        @for $i from 1 through 5 {
          &:nth-child(#{$i}) {
            transition: transform $speed-666 #{444 - (($i - 1) * 111)}ms $ease-out, opacity $speed-666 #{444 - (($i - 1) * 111)}ms $ease-out;
          }
        }
      }
    }

    .--mail {
      animation: bounce 1s 1s cubic-bezier(0.333, 0.666, 0.333, 1.333) forwards;
    }
  }

  &:before {
    content: '';
    @include abs-fill;
    backdrop-filter: blur(2px);
    opacity: 1;
    transition: opacity 1s $evil-ease;
  }

  .icon {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:after {
      content: '';
      aspect-ratio: 1/1;
      display: flex;
    }

    &.--logo {
      transition: opacity 1s $ease-out;

      &:after {
        width: 66.666%;
        @include logo($white, 0);
      }
    }

    &.--mail {
      margin-top: auto;

      &:after {
        width: $space-24;
        @include mail-icon($white, 1.666);
      }
    }

    &.--down {
      &:after {
        width: $space-24;
        @include down-arrow($white, 2);
      }
    }
  }

  .ticks {
    position: absolute;
    top: 50%;
    left: 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    transform: translateY(-50%);

    .tick {
      position: relative;
      width: $space-40;
      height: $space-40;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;
      transform: translateY(0%);
      cursor: pointer;

      &:before {
        content: "";
        width: 2px;
        height: $space-24;
        background-color: $gray;
        display: flex;
        transition: background-color $speed-333 $ease-out;
      }

      &.active {
        pointer-events: none;
      }

      &.active {
        &:before {
          background-color: $yellow;
        }
      }

      @include can-hover {
        &:hover {
          &:before {
            background-color: $yellow;
          }
        }
      }

      @for $i from 1 through 5 {
        &:nth-child(#{$i}) {
          transition: transform $speed-666 #{($i - 1) * 111}ms $ease-out, opacity $speed-666 #{($i - 1) * 111}ms $ease-out;
        }
      }
    }
  }

  @include respond-to($tablet) {
    width: $space-96;

    &:before {
      background-color: rgba($white, 0.02);
    }

    .icon {
      &.--mail {
        &:after {
          width: $space-32;
          @include mail-icon($white, 2.333);
        }
      }

      &.--down {
        &:after {
          width: $space-32;
          @include down-arrow($white, 3);
        }
      }
    }
  }

  @include respond-to($macbook) {
    width: $space-128;

    .icon {
      &.--mail {
        margin-bottom: -$space-32;
      }
    }
  }
}
</style>
