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
            <ul>
              <li class="fs-sm gray">Case Studies</li>
              <li v-for="project in caseStudies" :key="project.slug" class="h3">
                <NuxtLink :to="project.path" @mouseenter="onWorkHover(project)">{{ project.title }}</NuxtLink>
              </li>
              <li class="fs-sm gray pad-t">Archives</li>
              <li v-for="archive in archives" :key="archive.url">
                <NuxtLink class="external" :href="archive.url" target="_blank" @mouseenter="onWorkHover(archive)">{{ archive.title }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { primaryInput } from 'detect-it';
import { archives, caseStudies } from '~/data/work';

const isTouchDevice = ref(false);
const activeIndex = ref(0);
const image = ref('/images/work/flesh-and-bones.jpg');
const work = [...caseStudies, ...archives];

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

onMounted(() => {
  isTouchDevice.value =
    primaryInput === 'touch' ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;
});

function onClickMobileItem(index) {
  activeIndex.value = index;
  onWorkHover(work[index]);
}

function onWorkHover(project) {
  if(project?.image) {
    image.value = project.image;
  }
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

                @for $i from 1 through 16 {
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
          top: 20%;
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
            line-height: 2em;

            li {
              font-weight: 600;
              align-items: center;
              opacity: 0;
              transform: translateY(50%);

              @for $i from 1 through 7 {
                &:nth-child(#{$i}) {
                  transition: transform $speed-666 $ease-out, opacity $speed-666 $ease-out;
                }
              }

              &.fs-sm {
                margin-bottom: $space-8;
              }

              a {
                position: relative;
                padding-right: 1.25em;
                display: inline-flex;

                &:not(.external) {
                  &:after {
                    display: none;
                  }
                }

                &.external {
                  padding-right: 2em;
                  
                  &:after {
                    width: 1em;
                    height: 1em;
                    @include link($yellow, 1.25);
                    transform: translateY(-50%);

                    @include respond-to($tablet) {
                      @include link($yellow, 2);
                    }
                  }
                }

                &:after {
                  content: '';
                  position: absolute;
                  top: 50%;
                  right: 0px;
                  width: 0.75em;
                  height: 0.75em;
                  margin-top: 0.04em;
                  @include down-arrow($yellow, 3);
                  opacity: 1;
                  transform-origin: 0% 0%;
                  transform: rotate(-90deg) translateX(-50%) translateY(0px);
                }

                @include can-hover {
                  &:not(.external) {
                    &:after {
                      display: flex;
                    }
                  }

                  &.external {
                    &:after {
                      transform: translateX(-6px) translateY(-50%);
                    }
                  }

                  &:after {
                    @include down-arrow($yellow, 3);
                    opacity: 0;
                    transform: rotate(-90deg) translateX(-50%) translateY(-6px);
                    transition: opacity $speed-333 $ease-out, transform $speed-333 $ease-out;
                  }
  
                  &:hover {
                    color: $yellow;

                    &.external {
                      &:after {
                        transform: translateX(0px) translateY(-50%);
                      }
                    }
  
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
