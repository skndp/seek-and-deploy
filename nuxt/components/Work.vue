<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="poster-wrapper">
            <div class="poster-screen" >
              <img :src="image" :alt="title" />
              <img :src="image" alt="" inert aria-hidden="true" />
            </div>
          </div>
          <div class="content">
            <ul class="h3-lg">
              <template v-if="isTouchDevice">
                <li v-for="(project, index) in work" class="ml" :class="{ '--active': index === activeIndex }" @click="onClickMobileItem(index)">
                  <p>{{ project.title }}</p>
                  <NuxtLink class="fs-sm" :to="project.url" target="_blank">View Site</NuxtLink>
                </li>
              </template>
              <template v-else>
                <li v-for="(project, index) in work" class="dl" @mouseenter="onWorkHover(index)">
                  <NuxtLink :to="project.url" target="_blank">{{ project.title }}</NuxtLink>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { primaryInput } from 'detect-it';

const isTouchDevice = ref(false);
const activeIndex = ref(0);
const image = ref('/images/work/nike-sb.jpg');

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

const work = [
  {
    title: "15 Years of Dunk",
    image: "/images/work/nike-sb.jpg",
    url: "http://fyod.s3-website-us-east-1.amazonaws.com/"
  },
  {
    title: "Domino’s + IFTTT",
    image: "/images/work/dominos-ifttt.jpg",
    url: "http://ifttt-dominos.s3-website-us-east-1.amazonaws.com/"
  },
  {
    title: "Tuck Effect",
    image: "/images/work/tuck-effect.jpg",
    url: "http://tuck-effect.s3-website-us-east-1.amazonaws.com/"
  },
  {
    title: "Clayton Cotterell",
    image: "/images/work/clayton-cotterell.jpg",
    url: "https://claytoncotterell.com/"
  },
  {
    title: "Legwork is Dead",
    image: "/images/work/legwork-is-dead.jpg",
    url: "https://legwork-is-dead.netlify.app/"
  }
];

onMounted(() => {
  isTouchDevice.value =
    primaryInput === 'touch' ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;
});

function onClickMobileItem(index) {
  activeIndex.value = index;
  image.value = work[index].image;
}

function onWorkHover(index) {
  image.value = work[index].image;
}
</script>

<style lang='scss'>
section.work {
  .slide-3-next &,
  .slide-3-active & {
    opacity: 1;

    .inner {
      .gutter {
        .container {
          .poster-wrapper {
            .poster-screen {
              transform: rotateX(0deg) rotateY(-25deg) rotateZ(0deg);
            }
          }

          .content {
            ul {
              li {
                opacity: 1;
                transform: translateY(0%);

                @for $i from 1 through 7 {
                  &:nth-child(#{$i}) {
                    transition: transform $speed-666 #{333 + ($i * 111)}ms $ease-out, opacity $speed-666 #{333 + ($i * 111)}ms $ease-out;
                  }
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
        position: relative;

        .poster-wrapper {
          position: absolute;
          right: 0px;
          top: 62.5%;
          width: 90%;
          max-width: 1000px;
          aspect-ratio: 2/1;
          max-width: 900px;
          perspective: 1200px;
          transform-style: preserve-3d;
          transition: transform 1s $ease-out;

          .poster-screen {
            @include abs-fill;
            transform: rotateX(-65deg) rotateY(27deg) rotateZ(-13deg);
            transition: transform 1s $ease-out;

            &:after {
              content: "";
              display: block;
              position: absolute;
              top: 0px;
              left: 0px;
              width: 100%;
              height: 200%;
              background: linear-gradient(to left, transparent 0%, rgba($black, 0.45) 100%);
            }

            img {
              display: block;
              width: 100%;
              height: 100%;
            }

            img:nth-child(2) {
              transform: rotateX(180deg);
              opacity: 0.35;
              mask-image: linear-gradient(to bottom, transparent 80%, black 100%);
              filter: blur(2px);
            }
          }
        }

        .content {
          ul {
            line-height: 1.8em;

            li {
              font-weight: 600;
              opacity: 0;
              transform: translateY(50%);

              @for $i from 1 through 7 {
                &:nth-child(#{$i}) {
                  transition: transform $speed-666 $ease-out, opacity $speed-666 $ease-out;
                }
              }

              &.ml {
                position: relative;
                display: flex;
                padding-bottom: 12px;
                flex-direction: column;
                color: $white;
                cursor: pointer;
                transition: color $speed-333 $ease-out;

                &:first-child {
                  margin-top: 12px;
                }

                &.--active {
                  color: $yellow;
                  cursor: default;

                  a {
                    opacity: 1;
                    pointer-events: auto;
                    cursor: pointer;
                  }
                }

                a {
                  position: absolute;
                  bottom: 0px;
                  left: 0px;
                  color: $white;
                  opacity: 0;
                  height: 24px;
                  display: flex;
                  align-items: center;
                  pointer-events: none;
                  transition: opacity $speed-333 $ease-out;

                  &:after {
                    content: '';
                    width: 10px;
                    height: 10px;
                    @include down-arrow($white, 2);
                    display: flex;
                    flex-shrink: 0;
                    margin-left: 0.5em;
                    transform-origin: 50% 50%;
                    transform: rotate(-90deg);
                  }
                }
              }

              &.dl {
                align-items: center;

                a {
                  position: relative;
                  padding-right: 0.75em;
                  display: inline-flex;

                  &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: 0px;
                    width: 0.5em;
                    height: 0.5em;
                    margin-top: 0.04em;
                    @include down-arrow($yellow, 5);
                    opacity: 0;
                    transform-origin: 0% 0%;
                    transform: rotate(-90deg) translateX(-50%) translateY(-6px);
                    transition: opacity $speed-333 $ease-out, transform $speed-333 $ease-out;
                  }
                }

                &:hover {
                  a {
                    color: $yellow;

                    &:hover {
                      &:after {
                        opacity: 1;
                        transform: rotate(-90deg) translateX(-50%) translateY(0px);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  @include respond-to($landscape) {
    .inner {
      .gutter {
        .container {
          position: relative;

          .poster-wrapper {
            margin-top: -$space-32;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    @include respond-to($tablet) {
      .inner {
        .gutter {
          .container {
            .poster-wrapper {
              margin-top: -$space-48;
            }
          }
        }
      }
    }

    @include respond-to($macbook) {
      .inner {
        .gutter {
          .container {
            .poster-wrapper {
              margin-top: -$space-64;
            }
          }
        }
      }
    }
  }

  @include respond-to($macbook) {
    .inner {
      .gutter {
        .container {
          .poster-wrapper {
            right: $space-128;
          }
        }
      }
    }
  }
}
</style>
