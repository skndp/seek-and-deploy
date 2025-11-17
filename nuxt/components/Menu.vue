<template>
  <section :class="['menu', store.slidePrevState, store.slideActiveState, store.slideNextState]">
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
  </section>
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
    let nextIndex = store.slideIndex < 5 ? store.slideIndex + 1 : 0;
    store.setSlideIndex(nextIndex);
  }
}
</script>

<style lang='scss'>
@keyframes bounce {
  70% {
    transform:translateY(0%);
  }
  80% {
    transform:translateY(-15%);
  }
  90% {
    transform:translateY(0%);
  }
  95% {
    transform:translateY(-7%);
  }
  97% {
    transform:translateY(0%);
  }
  99% {
    transform:translateY(-3%);
  }
  100% {
    transform:translateY(0);
  }
}

.menu {
  position: fixed;
  top: 0px;
  left: 0px;
  width: $space-64;
  height: 100vh;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: rgba($gray, 1);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border-right-color $speed-666 $ease-out;

  &.slide-0-next,
  &.slide-0-active {
    border-right-color: rgba($black, 0);

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
      animation: bounce 2s ease;
    }
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
      transition: opacity $speed-666 $ease-out;

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
      transform: translateY(0px);

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

      &.active,
      &:hover {
        cursor: pointer;

        &:before {
          background-color: $yellow;
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
