<template>
  <section :class="['background', store.slidePrevState, store.slideActiveState, store.slideNextState]">
    <div class="scene">
      <div class="particles">
        <span v-for="(particle, index) in particles" class="particle" :style="{'opacity': particle.opacity, 'transform': `rotateX(${particle.rx}) rotateY(${particle.ry}) rotateZ(${particle.rz}) translate3d(0, 0, ${particle.tz})`}"></span>
      </div>
      <div class="logo">
        <svg v-for="(part, index) in logo" xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="600" viewBox="0 0 600 600" :style="{'transform': `translate3d(${part.tx}, ${part.ty}, ${part.tz}) rotateX(${part.rx}) rotateY(${part.ry}) rotateZ(${part.rz})`}">
          <polygon v-if="index === 0" points="12.31 543.06 63.58 594.27 363.93 294.31 261.37 294.31 12.31 543.06"/>
          <polygon v-if="index === 1" points="72.53 221.88 0 294.31 363.93 294.31 436.46 221.88 72.53 221.88"/>
          <polygon v-if="index === 2" points="340.23 56.94 288.96 5.73 72.53 221.88 175.07 221.88 340.23 56.94"/>
          <polygon v-if="index === 3" points="527.49 336.22 527.49 233.78 166.78 594.02 269.35 594.02 527.49 336.22"/>
          <polygon v-if="index === 4" points="600 521.57 341.89 521.57 269.35 594.02 600 594.02 600 521.57"/>
          <polygon v-if="index === 5" points="527.49 521.57 600 521.57 600 161.37 527.49 233.78 527.49 521.57"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();
const logo = ref([]);
const particles = ref([]);

onMounted(() => {
  window.addEventListener('resize', onResize);
  onResize();
})

function onResize(e) {
  const ww = window.innerWidth,
        wh = window.innerHeight,
        wt = ww > wh ? ww : wh;

  for(let i = 0; i < 152; i++) {
    particles.value[i] = {
      'opacity': Math.random() / 2,
      'tx': `${(Math.random() * (ww * 2)) - ww}px`,
      'ty': `${(Math.random() * (wh * 2)) - wh}px`,
      'tz': `${(Math.random() * (wt * 2)) - wt}px`,
      'rx': `${(Math.random()) * 120 - 60}deg`,
      'ry': `${(Math.random()) * 120 - 60}deg`,
      'rz': `${(Math.random()) * 120 - 60}deg`
    };
  }

  for(let i = 0; i < 6; i++) {
    logo.value[i] = {
      'tx': `${(Math.random() * (ww * 2)) - ww}px`,
      'ty': `${(Math.random() * (wh * 2)) - wh}px`,
      'tz': `${-Math.random() * wt}px`,
      'rx': `${(Math.random()) * 120 - 60}deg`,
      'ry': `${(Math.random()) * 120 - 60}deg`,
      'rz': `${(Math.random()) * 120 - 60}deg`
    };
  }
}
</script>

<style lang='scss'>
@keyframes flicker {
	0% {
		opacity: 0.4;
	}
	5% {
		opacity: 0.5;
	}
	10% {
		opacity: 0.6;
	}
	15% {
		opacity: 0.85;
	}
	25% {
		opacity: 0.5;
	}
	30% {
		opacity: 1;
	}
	35% {
		opacity: 0.1;
	}
	40% {
		opacity: 0.25;
	}
	45% {
		opacity: 0.5;
	}
	60% {
		opacity: 1;
	}
	70% {
		opacity: 0.85;
	}
	80% {
		opacity: 0.4;
	}
	90% {
		opacity: 0.5;
	}
	100% {
		opacity: 1;
	}
}

.background {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  z-index: -1;
  overflow: hidden;

  &.slide-0-next,
  &.slide-0-active {
    .scene {
      transform: rotateY(0deg);

      .particles {
        .particle {
          opacity: 1 !important;
          transform: none !important;
        }
      }

      .logo {
        svg {
          opacity: 1;
          transform: none !important;
          animation: flicker 1s linear;

          @for $i from 1 through 6 {
            &:nth-child(#{$i}) {
              animation: flicker 200ms #{($i * 100) + 666}ms linear;
            }
          }
        }
      }
    }
  }

  &.slide-1-next,
  &.slide-1-active {
    .scene {
      transform: none
    }
  }

  &.slide-2-next,
  &.slide-2-active {
    .scene {
      transform: rotateX(45deg) rotateY(45deg) rotateZ(45deg);
    }
  }

  &.slide-3-next,
  &.slide-3-active {
    .scene {
      transform: rotateX(90deg) rotateY(90deg) rotateZ(90deg);
    }
  }

  &.slide-4-next,
  &.slide-4-active {
    .scene {
      transform: rotateX(45deg) rotateY(45deg) rotateZ(45deg);
    }
  }

  &.slide-5-next,
  &.slide-5-active {
    .scene {
      transform: none
    }
  }

  .scene {
    height: 100%;
    perspective: 1200px;
    transform-style: preserve-3d;
    transition: transform $speed-666 $evil-ease;
    backface-visibility: visible;

    .particles {
      position: absolute;
      bottom: 0%;
      right: $space-64;
      margin-bottom: $space-64;
      width: 33%;
      aspect-ratio: 1/1;
      perspective: 1200px;
      transform-style: preserve-3d;

      .particle {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        margin: -4px 0 0 -6px;
        border-right: 6px solid transparent;
        border-bottom:  6px solid $white;
        border-left: 6px solid transparent;
        transition: transform $speed-666 $evil-ease, opacity $speed-666 $evil-ease;
        backface-visibility: visible;
      }
    }

    .logo {
      position: absolute;
      bottom: 0%;
      right: $space-64;
      margin-bottom: $space-64;
      width: 33%;
      aspect-ratio: 1/1;
      perspective: 1200px;
      transform-style: preserve-3d;

      svg {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        fill: $white;
        opacity: 0.2;
        backface-visibility: visible;
        transition: transform $speed-666 $evil-ease, opacity $speed-666 $evil-ease;
      }
    }
  }

  @include respond-to($tablet) {
    .scene {
      .particles {
        right: $space-96;
        margin-bottom: $space-96;
      }

      .logo {
        right: $space-96;
        margin-bottom: $space-96;
      }
    }
  }

  @include respond-to($macbook) {
    .scene {
      .particles {
        right: $space-128;
        margin-bottom: $space-128;
      }

      .logo {
        right: $space-128;
        margin-bottom: $space-128;
      }
    }
  }
}
</style>
