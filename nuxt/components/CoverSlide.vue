<template>
  <section class="slide cover-slide">
    <div class="inner">
      <div class="gutter">
        <h1 class="title h1 pad-t">{{ title }}</h1>
        <div class="terminal">
          <Terminal />
        </div>
        <div class="copy-blocks">
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
        </div>
      </div>
    </div>
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
.cover-slide {
  .inner {
    flex-direction: column;

    .gutter {
      justify-content: space-between;

      .terminal {
        flex-grow: 1;
        margin-top: $space-16;
      }

      .copy {
        height: $space-64;
        display: flex;
        align-items: center;

        span {
          margin-top: -0.04em;

          svg {
            display: inline-block;
            width: 18px;
            height: 18px;
            margin-bottom: -4px;

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

  @include respond-to($tablet) {
    .inner {
      .gutter {
        .copy {
          height: $space-96;
        }
      }
    }
  }

  @include respond-to($large-tablet) {
    .inner {
      .gutter {
        .terminal {
          margin-top: $space-32;
        }
      }
    }
  }

  @include respond-to($macbook) {
    .inner {
      .gutter {
        .copy {
          height: $space-128;

          &:first-child {
            margin-bottom: -$space-32;
          }
        }
      }
    }
  }
}
</style>
