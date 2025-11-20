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
              <p class="fs-sm gray l1">Located at <NuxtLink to="https://maps.app.goo.gl/zP6KGgH9fzgdapjE6" target="_blank">Herman</NuxtLink></p>
              <div class="h3 address">
                <span class="l2">1305 Osage St.</span>
                <span class="l3">Denver, CO 80204</span>
              </div>
              <ul>
                <li class="fs-sm gray l4">Reach out to Matt</li>
                <li class="l5"><span class="fs-sm">P:</span> <NuxtLink to="tel:720-219-7096" target="_blank">(720) 219-7096</NuxtLink></li>
                <li class="l6"><span class="fs-sm">E:</span> <NuxtLink to="mailto:hello@seekanddeploy.com" target="_blank">hello@seekanddeploy.com</NuxtLink></li>
              </ul>
              <SocialLinks class="l7" :socials="[ 'https://www.linkedin.com/company/seek-and-deploy/' ]" />
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

    .map-container {
      .map {
        transform: translate(0%, -50%) rotateX(63deg) rotateZ(-45deg) scale(1);

        .marker {
          opacity: 0;
          animation: drop $speed-666 1s cubic-bezier(0.333, 0.666, 0.333, 1.333) forwards;
        }
      }
    }

    .inner {
      .gutter {
        .container {
          .content {
            .info {
              .l1, .l2, .l3, .l4, .l5, .l6, .l7 {
                opacity: 1;
                transform: translateY(0%);
              }

              .l1 {
                transition: transform $speed-666 #{333 + (1 * 111)}ms $ease-out, opacity $speed-666 #{333 + (1 * 111)}ms $ease-out;
              }
              .l2 {
                transition: transform $speed-666 #{333 + (2 * 111)}ms $ease-out, opacity $speed-666 #{333 + (2 * 111)}ms $ease-out;
              }
              .l3 {
                transition: transform $speed-666 #{333 + (3 * 111)}ms $ease-out, opacity $speed-666 #{333 + (3 * 111)}ms $ease-out;
              }
              .l4 {
                transition: transform $speed-666 #{333 + (4 * 111)}ms $ease-out, opacity $speed-666 #{333 + (4 * 111)}ms $ease-out;
              }
              .l5 {
                transition: transform $speed-666 #{333 + (5 * 111)}ms $ease-out, opacity $speed-666 #{333 + (5 * 111)}ms $ease-out;
              }
              .l6 {
                transition: transform $speed-666 #{333 + (6 * 111)}ms $ease-out, opacity $speed-666 #{333 + (6 * 111)}ms $ease-out;
              }
              .l7 {
                transition: transform $speed-666 #{333 + (7 * 111)}ms $ease-out, opacity $speed-666 #{333 + (7 * 111)}ms $ease-out;
              }
            }
          }
        }
      }
    }
  }

  @keyframes drop {
    0% {
      opacity: 0;
      transform: translate3d(-50%, -100%, 90px) rotateX(-100deg);
    }
    20% {
      transform: translate3d(-50%, -100%, 10px) rotateX(-100deg);
    }
    40% {
      transform: translate3d(-50%, -100%, 50px) rotateX(-100deg);
    }
    60% {
      transform: translate3d(-50%, -100%, 10px) rotateX(-100deg);
    }
    80% {
      transform: translate3d(-50%, -100%, 30px) rotateX(-100deg);
    }
    100% {
      opacity: 1;
      transform: translate3d(-50%, -100%, 10px) rotateX(-100deg);
    }
  }

  .map-container {
    position: absolute;
    top: 0px;
    right: -50%;
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
      transition: transform 1s $ease-out;

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
        opacity: 0;
        transform: translate3d(-50%, -100%, 60px) rotateX(-100deg);
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
            display: flex;
            flex-direction: column;

            .l1, .l2, .l3, .l4, .l5, .l6, .l7 {
              opacity: 0;
              transform: translateY(50%);
              transition: transform $speed-666 $ease-out, opacity $speed-666 $ease-out;
            }

            .fs-sm {
              a {
                color: $white;
                text-decoration: underline;
                text-decoration-color: $yellow;
                text-decoration-thickness: 1px;
                text-underline-offset: 0.1em;
              }
            }

            .address {
              margin: $space-8 0 $space-32;

              span {
                display: flex;
              }
            }

            ul:not(.social-links) {
              padding-bottom: $space-16;

              li {
                &:not(:last-child) {
                  margin-bottom: $space-8;
                }

                a[href^=mailto] {
                  text-decoration: underline;
                  text-decoration-color: $yellow;
                  text-decoration-thickness: 1.5px;
                  text-underline-offset: 0.1em;
                }
              }
            }
          }
        }
      }
    }
  }

  @include respond-to($tablet) {
    .map-container {
      right: -192px;
    }

    .inner {
      .gutter {
        .container {
          .content {
            .info {
              margin-top: $space-56;
            }
          }
        }
      }
    }
  }

  @include respond-to($average-desktop) {
    .map-container {
      right: 0px;
    }
  }

  @include respond-to($macbook) {
    .map-container {
      right: $space-128;
    }
  }
}
</style>
