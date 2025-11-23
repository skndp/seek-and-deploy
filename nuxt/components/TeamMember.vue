<template>
  <div ref="memberRef" class="team-member">
    <div class="box" :class="{ '--show-bio': show_bio }">
      <div
        class="images"
        :class="{ 'is-dragging': isDragging }"
        @click="clickImages"
        @touchstart="initTouchMove"
        @touchmove="handleMove"
        @touchend="reset"
        @mousemove="handleMove"
        @mouseleave="reset"
      >
        <img v-for="(image, index) in bio.images" :src="image" :alt="name" draggable="false" :class="{ '--active': index === activeImageIndex }" />
      </div>
      <div class="bio-wrapper">
        <div class="bio-mask">
          <div class="bio-card">
            <div class="bio-content">
              <p v-for="(item, index) in bio.copy" v-html="item" />
            </div>
          </div>
        </div>
      </div>
      <button class="info-close-btn" @click="clickInfoCloseBtn" />
    </div>
    <div class="meta">
      <h3 class="h3">{{ name }}</h3>
      <p class="fs-sm" v-html="position" />
      <SocialLinks :socials="socials" />
    </div>
  </div>
</template>

<script setup>
import { primaryInput } from 'detect-it';

// Props
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  socials: {
    type: Array,
    required: true
  },
  bio: {
    type: Object,
    required: true
  }
});

const isDragging = ref(false);
const isTouchDevice = ref(false);
const memberRef = ref(null);
const show_bio = ref(false);
const activeImageIndex = ref(0);
const totalImages = props.bio.images.length;

onMounted(() => {
  isTouchDevice.value =
    primaryInput === 'touch' ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;
});

function clickInfoCloseBtn() {
  if (memberRef.value) {
    if (show_bio.value) {
      show_bio.value = false;
      activeImageIndex.value = 0;
    } else {
      show_bio.value = true;
    }
  }
};

function clickImages() {
  if (memberRef.value) {
    show_bio.value = true;
  }
};

function initTouchMove(e) {
  if (memberRef.value) {
    handleMove(e);
  }
};

function touchEnd() {
  if (memberRef.value) {
    isDragging.value = false;
  }
}

function handleMove(e) {
  if (memberRef.value) {
    isDragging.value = true;

    const imagesDiv = e.currentTarget;
    const rect = imagesDiv.getBoundingClientRect();
    const totalImages = props.bio.images.length;
    const clientX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
    const relativeX = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(relativeX, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    const segmentSize = 100 / totalImages;
    const index = Math.floor(percentage / segmentSize);

    activeImageIndex.value = index;
  }
};

function reset() {
  if (!show_bio.value) {
    activeImageIndex.value = 0;
  }
};
</script>

<style lang='scss'>
.team-member {
  display: flex;
  flex-direction: column;

  .box {
    position: relative;
    width: 100%;
    aspect-ratio: 5/7;
    display: flex;
    flex-shrink: 0;
    transform: skewY(-13deg);
    transition: transform 1s $ease-out;

    &.--show-bio {
      .bio-wrapper {
        visibility: visible;
        transform: translateY(0%);
        transition: transform $speed-666 $evil-ease;

        .bio-mask {
          transform: translateY(0%);
        }
      }

      .info-close-btn {
        &:before,
        &:after {
          background-color: $black;
          transform: rotate(135deg) translateX(-50%) translateY(-50%);
        }
      }
    }

    .images {
      @include abs-fill;
      overflow: hidden;
      background-color: #272727;
      cursor: pointer;

      &.is-dragging {
        touch-action: none;
      }

      img {
        @include abs-fill;
        object-fit: cover;
        object-position: 50% 50%;
        pointer-events: none;

        &:not(:first-child) {
          opacity: 0;

          &.--active {
            opacity: 1;
          }
        }
      }
    }

    .bio-wrapper {
      @include abs-fill;
      overflow: hidden;
      transform: translateY(-100%);
      visibility: hidden;
      will-change: transform;
      backface-visibility: hidden;
      transform-style: preserve-3d;
      transition: visibility 0ms linear $speed-666, transform $speed-666 $evil-ease;

      .bio-mask {
        @include abs-fill;
        overflow: hidden;
        transform: translateY(100%);
        transition: transform $speed-666 $evil-ease;
        will-change: transform;
        backface-visibility: hidden;
        transform-style: preserve-3d;

        .bio-card {
          @include abs-fill;
          overflow: hidden;
          background-color: $yellow;

          .bio-content {
            margin: $space-24 $space-8 $space-8;

            p {
              color: $black;
              font-size: 9px;
              line-height: 1.2em;

              &:not(:first-child) {
                margin-top: 1em;
              }
            }

            a {
              text-decoration: underline;
            }
          }
        }
      }
    }

    .info-close-btn {
      position: absolute;
      top: 0px;
      left: 0px;
      width: $space-24;
      height: $space-24;
      display: flex;
      cursor: pointer;

      &:before,
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 2px;
        background-color: $yellow;
        transform-origin: 0% 0%;
        transform: rotate(0deg) translateX(-50%) translateY(-50%);
        transition: background-color $speed-666 $evil-ease, transform $speed-666 $evil-ease;
      }

      &:after {
        width: 2px;
        height: 10px;
      }
    }
  }

  .meta {
    position: relative;
    opacity: 0;
    transform: skewY(-13deg) translateY(50%);
    transition: opacity $speed-666 $ease-out, transform 1s $ease-out;

    .h3 {
      padding: $space-8 0 $space-8;
      line-height: 1em;
    }
  }

  @include respond-to($landscape) {
    .box {
      aspect-ratio: 8/9;
    }
  }

  @include respond-to($small-tablet) {
    .box {
      .bio-wrapper {
        .bio-mask {
          .bio-card {
            .bio-content {
              p {
                font-size: inherit;
                line-height: inherit;
              }
            }
          }
        }
      }
    }
  }

  @include respond-to($tablet) {
    .box {
      .bio-wrapper {
        .bio-mask {
          .bio-card {
            .bio-content {
              margin: $space-56 $space-16 $space-16;
            }
          }
        }
      }

      .info-close-btn {
        width: $space-48;
        height: $space-48;

        &:before,
        &:after {
          width: $space-16;
          height: 2px;
        }

        &:after {
          width: 2px;
          height: $space-16;
        }
      }
    }

    .meta {
      margin: 0 $space-16;

      .h3 {
        padding: $space-16 0 $space-8;
      }
    }
  }
}
</style>
