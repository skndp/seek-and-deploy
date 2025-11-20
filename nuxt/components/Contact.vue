<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="map-container">
            <div class="map">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="600" viewBox="0 0 600 600">
                <defs>
                  <radialGradient id="mapRadialGradient">
                    <stop offset="40%" stop-color="white" stop-opacity="1"/>
                    <stop offset="100%" stop-color="white" stop-opacity="0"/>
                  </radialGradient>
                </defs>
                <mask id="mapMask">
                  <circle cx="300" cy="300" r="300" fill="url(#mapRadialGradient)"/>
                </mask>
                <g mask="url(#mapMask)">
                  <rect class="map-base" x="0" y="0" width="600" height="600"></rect>
                  <rect class="map-street" x="420" y="0" width="4" height="600"></rect>
                  <rect class="map-street" x="540" y="0" width="4" height="600"></rect>
                  <rect class="map-street" x="420" y="385" width="180" height="4"></rect>
                  <rect class="map-street" x="195" y="575" width="405" height="4"></rect>
                  <rect class="map-street highlight" x="195" y="0" width="4" height="600"></rect>
                  <rect class="map-street highlight" x="0" y="195" width="600" height="4"></rect>
                </g>
              </svg>
              <div class="marker"></div>
              <div class="label thirteen">13th St</div>
              <div class="label osage">Osage St</div>
            </div>
          </div>
          <div class="content">
            <div class="info">
              <p class="fs-sm">Based at <NuxtLink to="https://www.herman.studio/" target="_blank">Herman</NuxtLink></p>
              <NuxtLink class="h3 address" to="https://maps.app.goo.gl/zP6KGgH9fzgdapjE6" target="_blank">
                <span>1305 Osage St.</span>
                <span>Denver, CO 80204</span>
              </NuxtLink>
            </div>
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
</script>

<style lang='scss'>
section.contact {
  .slide-5-next &,
  .slide-5-active & {
    opacity: 1;
  }
}

section.contact {
  .slide-5-next &,
  .slide-5-active & {
    .map-container {
      .map {
        transform: translate(0%, -50%) rotateX(63deg) rotateZ(-45deg) scale(1);

        .marker {
          opacity: 1;
          transform: translate3d(-50%, -100%, 10px) rotateX(-100deg);
          transition: opacity $speed-666 $evil-ease 1s, transform $speed-666 $evil-ease 1s;
        }
      }
    }
  }

  .map-container {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: $space-64;
    perspective: 1200px;
    transform-style: preserve-3d;

    .map {
      position: absolute;
      top: 50%;
      right: 0px;
      width: 75%;
      max-width: 720px;
      aspect-ratio: 1/1;
      perspective: 1200px;
      transform-style: preserve-3d;
      transform: translate(0%, -50%) rotateX(13deg) rotateZ(-13deg) scale(1.4);
      transition: transform 1s $evil-ease;

      svg {
        width: 100%;
        height: 100%;

        .map-base {
          fill: $black;
        }

        .map-street {
          fill: #333;

          &.highlight {
            fill: $yellow;
          }
        }
      }

      .marker {
        display: block;
        position: absolute;
        top: 32.5%;
        left: 32.8%;
        border-top: 20px solid $yellow;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
        transform-origin: bottom center;
        transform: translate3d(-50%, -100%, 80px) rotateX(-100deg);
        transition: opacity $speed-666 $ease-out, transform $speed-666 $ease-out;
        opacity: 0;
      }

      .label {
        display: block;
        position: absolute;
        white-space: nowrap;

        &.thirteen {
          top: 33.333%;
          right: 43.75%;
          transform: translate(50%, 0);
        }

        &.osage {
          bottom: 43.75%;
          right: 70%;
          transform: translate(50%, 50%) rotate(90deg);
        }
      }
    }
  }

  .inner {
    .gutter {
      .container {
        position: relative;

        .content {
          position: relative;

          .info {
            .fs-sm {
              a {
                text-decoration: underline;
                text-decoration-color: $yellow;
                text-decoration-thickness: 1.5px;
                text-underline-offset: 0.1em;
              }
            }

            a.address {
              margin-top: 0.5em;
              display: inline-flex;
              flex-direction: column;

              span {
                display: flex;
              }
            }
          }
        }
      }
    }
  }

  @include respond-to($macbook) {
    .map-container {
      right: $space-128;
    }
  }
}
</style>
