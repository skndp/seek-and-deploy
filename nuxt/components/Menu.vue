<template>
  <nav :class="['menu', store.slidePrevState, store.slideActiveState, store.slideNextState]">
    <div class="icon --logo" @click="setActiveSlide(0)" />
    <div class="ticks">
      <button
        v-for="(number, index) in 6"
        :class="['tick', {'active': store.slideNextState === `slide-${number}-next` || store.slideActiveState === `slide-${number}-active`}]"
        :key="index"
        @click="setActiveSlide(number)"
      />
    </div>
    <div class="icons">
      <NuxtLink class="icon --mail" to="mailto:hello@seekanddeploy.com" target="_blank" aria-label="Email: hello@seekanddeploy.com" />
      <button class="icon --down" aria-label="Next Section" @click="setNextSlide" />
    </div>
  </nav>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

// Methods
function setActiveSlide(number) {
  if (!store.changingSlides) {
    const e = new CustomEvent('menu-slide-change', {
      'detail': {
        'slide': number
      },
      'bubbles': false,
      'cancelable': true
    });

    window.dispatchEvent(e);
  }
}

function setNextSlide() {
  if (!store.changingSlides) {
    const e = new CustomEvent('menu-slide-change', {
      'detail': {
        'slide': 'next'
      },
      'bubbles': false,
      'cancelable': true
    });

    window.dispatchEvent(e);
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
    .ticks {
      .tick {
        opacity: 0;
        transform: translateY(50%);
        pointer-events: none;

        @for $i from 1 through 6 {
          &:nth-child(#{$i}) {
            transition: transform $speed-666 #{444 - (($i - 1) * 111)}ms $ease-out, opacity $speed-666 #{444 - (($i - 1) * 111)}ms $ease-out;
          }
        }
      }
    }

    .icon {
      &.--logo {
        pointer-events: none;

        &:before {
          opacity: 1;
          transition: opacity 500ms $ease-out 500ms;
        }

        &:after {
          opacity: 0;
          transition: opacity 500ms $ease-out;
        }
      }
      
      &.--mail {
        animation: bounce 1s 1s cubic-bezier(0.333, 0.666, 0.333, 1.333) forwards;
      }
    }

    @include respond-to($tablet) {
      &:before {
        opacity: 0;
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

      @for $i from 1 through 6 {
        &:nth-child(#{$i}) {
          transition: transform $speed-666 #{($i - 1) * 111}ms $ease-out, opacity $speed-666 #{($i - 1) * 111}ms $ease-out;
        }
      }
    }
  }

  .icons {
    &:after {
      content: '';
      width: 100%;
      height: $space-16;
      display: flex;
    }
  }

  .icon {
    position: relative;
    width: 100%;
    aspect-ratio: 2/1;
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
      aspect-ratio: 1/1;
      
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: $space-24;
        height: 1.5px;
        background-color: $gray;
        opacity: 0;
        transform: translateX(-50%) translateY(-50%);
        transition: opacity 500ms $ease-out;
      }

      &:after {
        content: '';
        position: relative;
        width: 66.666%;
        height: 100%;
        @include logo($white, 0);
        opacity: 1;
        transition: opacity 500ms $ease-out 500ms;
      }
    }

    &.--mail {
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

  @include respond-to($tablet) {
    width: $space-96;

    &:before {
      content: '';
      @include abs-fill;
      background-color: rgba($white, 0.02);
      backdrop-filter: blur(2px);
      opacity: 1;
      transition: opacity 1s $evil-ease;
    }

    .icons {
      &:after {
        height: $space-24;
      }
    }

    .icon {
      &.--logo {      
        &:before {
          width: $space-32;
          height: 2px;
        }
      }

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
}
</style>
