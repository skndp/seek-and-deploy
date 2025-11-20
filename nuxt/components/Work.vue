<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="poster-wrapper">
            <div class="poster-screen">
              <!-- Do reflective stuff here? Or somewhere around here. -->
            </div>
          </div>
          <div class="content">
            <ul class="h3-lg">
              <li v-for="(project, index) in work">{{ project.title }}</li>
            </ul>
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

const work = [
  {
    title: "15 Years of Dunk"
  },
  {
    title: "Domino’s + IFTTT"
  },
  {
    title: "Tuck Effect"
  },
  {
    title: "Clayton Cotterell"
  },
  {
    title: "Legwork is Dead"
  }
];
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
              transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
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
          transform: translateY(-50%);

          .poster-screen {
            @include abs-fill;
            background-color: $yellow;
            perspective: 1200px;
            transform: rotateX(-65deg) rotateY(27deg) rotateZ(-13deg);
            transition: transform 1s $ease-out;
          }
        }

        .content {
          ul {
            line-height: 1.6em;

            li {
              font-weight: 600;
              display: flex;
              align-items: center;
              opacity: 0;
              transform: translateY(50%);

              @for $i from 1 through 7 {
                &:nth-child(#{$i}) {
                  transition: transform $speed-666 $ease-out, opacity $speed-666 $ease-out;
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
