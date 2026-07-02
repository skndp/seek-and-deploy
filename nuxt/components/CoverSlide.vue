<template>
  <section class="slide cover-slide">
    <div class="inner">
      <div class="gutter">
        <h1 class="title h1">{{ title }}</h1>
        <Terminal />
        <footer>
          <p v-if="store.initialSlide" class="copy"><span>We fight for the user.</span></p>
          <p v-else class="copy"><span>Pick up the reciever, we’ll make you a believer.</span></p>
          <p v-if="store.initialSlide" class="copy fs-sm gray"><span>Go ahead. Scroll down.</span></p>
          <p v-else class="copy fs-sm gray">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <line x1="12" y1="0" x2="6" y2="24" />
                <line x1="12" y1="0" x2="18" y2="24" />
                <line x1="0" y1="12" x2="24" y2="11" />
              </svg>
              No terms. No polices. Stay metal.
            </span>
          </p>
        </footer>
      </div>
    </div>
    <News />
    <News class="news-reflection" inert="true" aria-hidden="true" />
  </section>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

// Props
const props = defineProps({
  title: {
    type: String,
    required: false
  }
});
</script>

<style lang='scss'>
section.cover-slide {
  .slide-0-next &,
  .slide-0-active & {
    opacity: 1;
  }
}

.cover-slide {
  .inner {
    flex-direction: column;

    .gutter {
      justify-content: space-between;

      .title {
        height: $space-64;
        line-height: $space-64;
      }

      .flex-content {
        flex-grow: 1;
        margin-bottom: $space-128;
        display: flex;
        align-items: center;
      }

      footer {
        &:after {
          content: '';
          width: 100%;
          height: $space-16;
          display: flex;
        }
        
        .copy {
          height: $space-32;
          display: flex;
          align-items: center;
  
          span {
            margin-top: -0.04em;
            display: inline-flex;
            align-items: center;
  
            svg {
              width: 16px;
              height: 16px;
              margin: -3px 7px 0 0;
              display: flex;
              flex-shrink: 0;
  
              circle, line {
                stroke-width: 2px;
                stroke: $gray;
                fill: none;
              }
            }
          }
        }
      }

    }
  }

  .news-reflection {
    pointer-events: none;
    opacity: 0.35;
    mask-image: linear-gradient(to bottom, transparent 80%, black 100%);
    filter: blur(2px);
    transform: translate(-50%, 50%) rotateX(180deg);
    z-index: -1;
  }

  @include respond-to($tablet) {
    .inner {
      .gutter {
        .title {
          height: $space-96;
          line-height: $space-96;
        }

        .flex-content {
          margin-bottom: 200px;
        }

        footer {
          &:after {
            height: $space-24;
          }
          
          .copy {
            height: $space-48;
  
            span {
              svg {
                width: 18px;
                height: 18px;
                margin: -3px 10px 0 0;
              }
            }
          }
        }
      }
    }
  }

  @include respond-to($large-tablet) {
    .inner {
      .gutter {
        .flex-content {
          margin-bottom: auto;
        }
      }
    }

    .news-reflection {
      transform: translate(0%, 50%) rotateX(180deg);
    }
  }
}
</style>
