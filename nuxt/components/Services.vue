<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="content">
            <div
              ref="servicesRef"
              class="services"
              :class="{ 'is-dragging': isDragging }"
              @pointerdown="onPointerDown"
              @pointermove="onPointerMove"
              @pointerup="endDrag"
              @pointercancel="endDrag"
              @lostpointercapture="endDrag"
            >
              <ul ref="listRef" class="services-list">
                <li
                  v-for="(service, index) in ringServices"
                  :key="`${service}-${index}`"
                  class="service"
                  :data-index="index"
                  tabindex="0"
                  :style="{ transform: getServiceTransform(index) }"
                >
                  {{ service }}
                </li>
              </ul>
            </div>
            <p class="value fs-sm gray">We deploy forward-thinking, creative technology that drives revenue, sets brands apart and defines what's next.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const servicesRef = ref(null);
const listRef = ref(null);
const isDragging = ref(false);
const ringRadius = ref(500);
const ringRotation = ref(0);

const services = ['Websites', 'Applications', 'Interactive Kiosks', 'Digital Installations', 'AI Experiences', 'Augmented Reality', 'Virtual Reality', 'Spatial Computing', 'Gamification', 'Retail & Event Technology'];
const ringServices = [...services];
const ringStep = 360 / ringServices.length;

let rafId = 0;
let resizeObserver;
let velocity = 0;
let pointerId = null;
let lastPointerX = 0;
let lastPointerTime = 0;
let lastFrameTime = 0;

onMounted(() => {
  nextTick(() => {
    measure();

    window.addEventListener('resize', measure, { passive: true });
    resizeObserver = new ResizeObserver(measure);

    if (servicesRef.value) {
      resizeObserver.observe(servicesRef.value);
    }

    if (listRef.value) {
      resizeObserver.observe(listRef.value);
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    rafId = requestAnimationFrame(tick);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', measure);
  resizeObserver?.disconnect();
  cancelAnimationFrame(rafId);
});

function measure() {
  if (!servicesRef.value || !listRef.value) {
    return;
  }

  const mq = window.matchMedia('(min-width: 1024px)');

  ringRadius.value = mq.matches ? 500 : 320;
  ringRotation.value = wrap(ringRotation.value, 360);
  applyTransform();
}

function tick(now) {
  const dt = Math.min(32, lastFrameTime ? now - lastFrameTime : 16.67);
  lastFrameTime = now;

  if (!isDragging.value) {
    velocity += (getBaseVelocity() - velocity) * Math.min(1, dt * 0.0015);
    velocity *= Math.pow(0.995, dt / 16.67);
    ringRotation.value = wrap(ringRotation.value + (velocity * dt), 360);
    applyTransform();
  }

  rafId = requestAnimationFrame(tick);
}

function getBaseVelocity() {
  const slide = servicesRef.value?.closest('.slides');

  if (slide?.classList.contains('slide-4-next')) {
    return 0.06;
  }

  if (slide?.classList.contains('slide-4-active')) {
    return 0.007;
  }

  return 0.01;
}

function wrap(value, limit) {
  return limit > 0 ? ((value % limit) + limit) % limit : value;
}

function applyTransform() {
  if (listRef.value) {
    listRef.value.style.transform = `rotateZ(-10deg) rotateY(${ringRotation.value}deg)`;
  }
}

function onPointerDown(e) {
  if (e.button !== 0 || !servicesRef.value) {
    return;
  }

  pointerId = e.pointerId;
  isDragging.value = true;
  lastPointerX = e.clientX;
  lastPointerTime = performance.now();
  velocity = 0;

  servicesRef.value.setPointerCapture(pointerId);
}

function onPointerMove(e) {
  if (!isDragging.value || e.pointerId !== pointerId) {
    return;
  }

  const now = performance.now();
  const deltaX = e.clientX - lastPointerX;
  const dt = Math.max(8, now - lastPointerTime);
  const dragFactor = 0.11;

  ringRotation.value = wrap(ringRotation.value + (deltaX * dragFactor), 360);
  velocity = (deltaX * dragFactor) / dt;

  lastPointerX = e.clientX;
  lastPointerTime = now;

  applyTransform();
}

function endDrag(e) {
  if (e?.pointerId !== undefined && e.pointerId !== pointerId) {
    return;
  }

  isDragging.value = false;

  if (servicesRef.value && pointerId !== null && servicesRef.value.hasPointerCapture(pointerId)) {
    servicesRef.value.releasePointerCapture(pointerId);
  }

  pointerId = null;
}

function getServiceTransform(index) {
  const angle = index * ringStep;

  return `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${ringRadius.value}px)`;
}
</script>

<style lang='scss'>
section.slide.services {
  .slide-4-next &,
  .slide-4-active & {
    opacity: 1;

    .inner {
      .gutter {
        .container {
          .content {
            .services, .value {
              opacity: 1;
            }

            .services {
              .services-list {
                &:before {
                  transform: translate(-50%, -50%) scale(1, 1);
                  transition: transform 5s $ease-out;
                }
              }
            }
          }
        }
      }
    }
  }

  .inner {
    .gutter {
      .container {
        .content {
          display: flex;
          flex-direction: column;
          margin: $space-64 * 3 0 $space-64 * 3;

          .services {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
            transform-style: preserve-3d;
            perspective: 1200px;
            perspective-origin: center center;
            cursor: grab;
            touch-action: none;
            opacity: 0;
            transition: opacity $speed-666 $ease-out;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            margin-top: -64px;

            &.is-dragging {
              cursor: grabbing;
            }

            .services-list {
              position: absolute;
              inset: 50% auto auto 50%;
              width: 0;
              height: 0;
              margin: 0;
              padding: 0;
              list-style: none;
              transform-style: preserve-3d;
              transform-origin: center center;
              will-change: transform;

              &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 2px;
                height: 105vh;
                background-color: $yellow;
                transform: translate(-50%, -50%) scale(1, 0);
                box-shadow: 0 0 20px 5px rgba($yellow, 0.7);
                backface-visibility: visible;
                animation: flicker 100ms linear infinite;
                transition: transform 1s $ease-out;
              }

              .service {
                position: absolute;
                top: 0;
                left: 0;
                width: 160px;
                font: normal normal bold 12px/12px $lexend;
                background-color: rgba(255, 255, 255, 0.07);
                border: 1px solid rgba(255, 255, 255, 0.12);
                backdrop-filter: blur(2px);
                text-align: center;
                padding: 10px;
                transform-origin: center center;
                transform-style: preserve-3d;
                will-change: transform;
                text-align: center;
                outline: 0;
                transform: translate(-50%, -50%);
              }
            }
          }

          .value {
            text-wrap: pretty;
            flex-grow: 0;
            text-align: center;
            line-height: 1.2em;
            opacity: 0;
            transition: opacity $speed-666 $ease-out;
          }
        }
      }
    }
  }

  @include respond-to($large-tablet) {
    .inner {
      .gutter {
        .container {
          .content {
            margin: $space-64 * 1.5 auto $space-64 * 1.5;

            .services {
              .services-list {
                .service {
                  width: 250px;
                  font: normal normal bold 18px/18px $lexend;
                  padding: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
}

@keyframes flicker {
  0% {
    opacity: 0.49;
  }
  5% {
    opacity: 0.54;
  }
  10% {
    opacity: 0.59;
  }
  15% {
    opacity: 0.72;
  }
  25% {
    opacity: 0.54;
  }
  30% {
    opacity: 0.8;
  }
  35% {
    opacity: 0.33;
  }
  40% {
    opacity: 0.41;
  }
  45% {
    opacity: 0.54;
  }
  60% {
    opacity: 0.8;
  }
  70% {
    opacity: 0.72;
  }
  80% {
    opacity: 0.49;
  }
  90% {
    opacity: 0.54;
  }
  100% {
    opacity: 0.8;
  }
}
</style>
