<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
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
          <p>Find us with our friends at <a href="#">Herman</a>.<br/>1305 Osage St.<br/>Denver, CO 80204</p>
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
.contact {
  .slide-5-next &,
  .slide-5-active & {
    .container {
      .map {
        opacity: 1;

        .marker {
          opacity: 1;
          transform: translate3d(-50%, -100%, 10px) rotateX(-100deg);
        }
      }

      p {
        opacity: 1;
      }
    }
  }

  .container {
    position: relative;
    perspective: 1200px;
    transform-style: preserve-3d;

    .map {
      position: absolute;
      top: 33%;
      left: 50%;
      width: 80%;
      max-width: 640px;
      aspect-ratio: 1/1;
      perspective: 1200px;
      transform-style: preserve-3d;
      transform: translate(-50%, -50%) rotateX(63deg) rotateZ(-45deg);
      opacity: 0;
      transition: opacity $speed-666 linear;

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
        transform: translate3d(-50%, -100%, 20px) rotateX(-100deg);
        transition: opacity $speed-666 linear $speed-666, transform $speed-666 $evil-ease $speed-666;
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

    p {
      position: absolute;
      bottom: 33%;
      left: 0%;
      width: 100%;
      text-align: center;
      opacity: 0;
      transition: opacity $speed-666 linear;
    }
  }
}
</style>
