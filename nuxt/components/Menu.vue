<template>
  <div :class="['menu', store.slidePrevState, store.slideActiveState, store.slideNextState, menuTransitionClasses]">
    <div class="menu-stage">
      <nav class="primary-nav">
        <button
          class="icon --logo --main-logo"
          aria-label="Cover Slide"
          @click="setActiveSlide(0)"
        />
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
      <nav class="sub-page-nav">
        <NuxtLink
          class="icon --logo"
          to="/"
          aria-label="Back to Home"
        />
        <div class="icons">
          <NuxtLink class="icon --back" to="/" aria-label="Back to Home" />
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();
const route = useRoute();
const isHomeRoute = computed(() => route.path === '/');
const menuTransitionState = useState('menu-transition-state', () => isHomeRoute.value ? 'home' : 'detail');
const menuTransitionClasses = computed(() => ({
  scaler: ['home-leave', 'detail-enter', 'detail-leave', 'detail-leave-rotate'].includes(menuTransitionState.value),
  rotato: ['detail-enter', 'detail', 'detail-leave'].includes(menuTransitionState.value),
  cased: menuTransitionState.value === 'detail'
}));

// Methods
function onLogoClick(e) {
  if (isHomeRoute.value) {
    e.preventDefault();
    setActiveSlide(0);
  }
}

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
.menu {
  position: fixed;
  top: 0px;
  left: 0px;
  width: $space-64;
  height: 100%;
  z-index: 13;
  perspective: 1200px;

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
      &.--main-logo {
        pointer-events: none;

        &:before {
          opacity: 1;
          transition: opacity $speed-333 $ease-out $speed-333;
        }

        &:after {
          opacity: 0;
          transition: opacity $speed-333 $ease-out;
        }
      }
    }

    @include respond-to($tablet) {
      nav {
        &.primary-nav {
          &:before {
            opacity: 0;
          }
        }
      }
    }
  }

  &.slide-0-next:not(.rotato):not(.scaler),
  &.slide-0-active:not(.rotato):not(.scaler) {
    .icon {
      &.--mail {
        &:after {
          animation: bounce 1s 1s cubic-bezier(0.333, 0.666, 0.333, 1.333) forwards;
        }
      }
    }
  }

  &.scaler {
    .menu-stage {
      transform: scale(0.9);
    }
  }

  &.rotato {
    .menu-stage {
      transform: scale(0.9) rotateY(-90deg);
    }

    nav {
      &.primary-nav {
        pointer-events: none;
      }

      &.sub-page-nav {
        pointer-events: auto;
      }
    }
  }

  &.cased {
    .menu-stage {
      transform: rotateY(-90deg);
    }
  }

  .menu-stage {
    @include abs-fill;
    display: flex;
    white-space: nowrap;
    transform-style: preserve-3d;
    transform-origin: 50% 50% -#{$space-32};
    transition: transform $speed-666 $evil-ease;
  }

  nav {
    @include abs-fill;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    backface-visibility: hidden;

    &.primary-nav {
      width: $space-64;
      pointer-events: auto;
    }

    &.sub-page-nav {
      width: $space-64;
      background-color: $yellow;
      pointer-events: none;
      transform: rotateY(90deg) translateX($space-32) translateZ($space-32);

      .icon {
        &.--logo {
          &:after {
            @include logo($black, 0);
          }
        }
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
    position: relative;
    margin-bottom: $space-16;
    overflow: hidden;
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

      &:after {
        content: '';
        position: relative;
        width: 66.666%;
        height: 100%;
        @include logo($white, 0);
        opacity: 1;
        transition: opacity $speed-333 $ease-out $speed-333, background-image $speed-333 $ease-out $speed-333;
      }
    }

    &.--main-logo {  
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
        transition: opacity $speed-333 $ease-out;
      }
    }

    &.--mail {
      &:after {
        position: relative;
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

    &.--back {
      &:after {
        width: $space-24;
        @include down-arrow($black, 2);
        transform: rotate(90deg);
      }
    }
  }

  @include respond-to($tablet) {
    width: $space-96;

    nav {
      &.primary-nav,
      &.sub-page-nav {
        width: $space-96;
      }

      &.primary-nav {
        &:before {
          content: '';
          @include abs-fill;
          background-color: rgba($white, 0.02);
          backdrop-filter: blur(2px);
          opacity: 1;
          transition: opacity 1s $evil-ease;
        }
      }

      &.sub-page-nav {
        transform: rotateY(90deg) translateX($space-48) translateZ($space-48);
      }
    }

    .menu-stage {
      transform-origin: 50% 50% -#{$space-48};
    }

    .icons {
      margin-bottom: $space-24;
    }

    .icon {
      &.--main-logo {      
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

      &.--back {
        &:after {
          width: $space-32;
          @include down-arrow($black, 3);
        }
      }
    }
  }
}
</style>
