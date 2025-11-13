<template>
  <section :class="['menu', `slide-${store.slideNum}`]">
    <div class="logo">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1000" height="1000" viewBox="0 0 1000 1000">
        <polygon points="395.9 434.9 533.53 297.45 490.8 254.78 250 495.26 467.81 495.26 260.25 702.55 302.99 745.22 613.72 434.9 395.9 434.9"/>
        <path d="M388.99,745.02h361.01v-360.54l-361.01,360.54ZM534.91,684.65l154.67-154.47v154.47h-154.67Z"/>
      </svg>
    </div>
    <div class="ticks">
      <div :class="['tick', {'active': store.slideNum === 0}]"></div>
      <div :class="['tick', {'active': store.slideNum === 1}]"></div>
      <div :class="['tick', {'active': store.slideNum === 2}]"></div>
      <div :class="['tick', {'active': store.slideNum === 3}]"></div>
      <div :class="['tick', {'active': store.slideNum === 4}]"></div>
      <div :class="['tick', {'active': store.slideNum === 5}]"></div>
    </div>
    <div class="mail">

    </div>
    <div class="down">

    </div>
  </section>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();
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
  box-sizing: border-box;
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 7.142%;
  height: 100svh;
  flex-direction: column;

  &.slide-0 {
    .logo {
      opacity: 0;
    }

    // TODO
    .ticks {
      .tick {
        opacity: 0 !important;

        @for $i from 1 through 6 {
          &:nth-child(#{$i}) {
            transition: transform $speed-666 #{($i - 1) * 111}ms ease-in, opacity $speed-666 #{($i - 1) * 111}ms ease-in;
          }
        }
      }
    }

    .mail {
      animation: bounce 2s ease infinite;
    }
  }

  .logo {
    width: 100%;
    aspect-ratio: 1/1;
    flex-grow: 0;
    transition: opacity $speed-666 linear;

    svg {
      width: 100%;
      height: 100%;
      fill: $white;
    }
  }

  .ticks {
    display: flex;
    width: 100%;
    margin-top: -8px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    
    .tick {
      position: relative;
      width: 30px;
      height: 40px;
      opacity: 0.666;

      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 8px;
        left: 12px;
        width: 6px;
        height: 24px;
        background-color: $white;
      }

      &.active,
      &:hover {
        cursor: pointer;

        &:after {
          content: "";
          display: block;
          position: absolute;
          bottom: 14px;
          left: 6px;
          width: 18px;
          height: 6px;
          background-color: $white;
        }
      }

      @for $i from 1 through 6 {
        &:nth-child(#{$i}) {
          transition: transform $speed-666 #{($i - 1) * 111}ms ease-out, opacity $speed-666 #{($i - 1) * 111}ms ease-out;
        }
      }
    }
  }

  .mail {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    flex-grow: 0;
    cursor: pointer;

    &:before {
      content: "";
      display: block;
      position: absolute;
      bottom: 0px;
      left: 50%;
      width: 24px;
      height: 18px;
      border: 3px solid $white;
      transform: translate(-50%, 0);
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: 11px;
      left: 50%;
      width: 16px;
      height: 16px;
      margin-top: -3px;
      border-right: 3px solid $white;
      border-bottom: 3px solid $white;
      transform: translate(-50%, 0) rotate(45deg);
    }
  }

  .down {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    flex-grow: 0;
    cursor: pointer;

    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 12px;
      border-right: 6px solid $white;
      border-bottom: 6px solid $white;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}
</style>
