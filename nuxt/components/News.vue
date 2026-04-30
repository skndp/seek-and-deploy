<template>
  <div class="news-wrapper">
    <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" style="position:absolute">
      <clipPath id="tvClip" clipPathUnits="objectBoundingBox">
        <path d="
          M 0 0
          L 1 0
          L 1 1
          C 0.72 0.96, 0.28 0.96, 0 1
          Z
        " />
      </clipPath>
    </svg>
    <div class="news-screen">
      <div class="news-content" :class="{ loaded: tvLoaded }">        
        <div class="news-picture">
          <a href="https://wearefleshandbones.com"><img src="/images/flesh-and-bones.webp" alt="We launched Flesh & Bones." /></a>
        </div>
        <div class="marquee fs-sm" aria-label="BREAKING NEWS">
          <div class="marquee-track">
            <span>BREAKING NEWS - WE LAUNCHED FLESH & BONES!</span>
            <span aria-hidden="true">BREAKING NEWS - WE LAUNCHED FLESH & BONES!</span>
          </div>
        </div>
      </div>
    </div>
    <div class="news-foreground">
      <img
        ref="tvImage"
        src="/images/tv.png"
        alt="A TV from the ancient times displaying our latest news."
        @load="handleTvLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tvLoaded: false,
    };
  },

  mounted() {
    this.handleTvLoad();
  },

  methods: {
    handleTvLoad() {
      if (this.tvLoaded) {
        return;
      }

      const tvImage = this.$refs.tvImage;

      if (tvImage && tvImage.complete) {
        this.tvLoaded = true;
      }
    },
  },
};
</script>

<style lang="scss">
@keyframes flicker {
  0% {
    opacity: 0.27861;
  }
  5% {
    opacity: 0.34769;
  }
  10% {
    opacity: 0.23604;
  }
  15% {
    opacity: 0.90626;
  }
  20% {
    opacity: 0.18128;
  }
  25% {
    opacity: 0.83891;
  }
  30% {
    opacity: 0.55583;
  }
  35% {
    opacity: 0.2881;
  }
  40% {
    opacity: 0.67807;
  }
  45% {
    opacity: 0.23604;
  }
  50% {
    opacity: 0.42336;
  }
  55% {
    opacity: 0.57495;
  }
  60% {
    opacity: 0.14157;
  }
  65% {
    opacity: 0.90434;
  }
  70% {
    opacity: 0.17802;
  }
  75% {
    opacity: 0.62892;
  }
  80% {
    opacity: 0.22953;
  }
  85% {
    opacity: 0.79255;
  }
  90% {
    opacity: 0.35412;
  }
  95% {
    opacity: 0.45087;
  }
  100% {
    opacity: 0.25;
  }
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

.news-wrapper {
  position: relative;
  aspect-ratio: 1/1;
  width: 50%;
  margin-left: -10%;

  .news-screen {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 42%;
    aspect-ratio: 11/9;
    overflow: hidden;
    background: #121010;
    perspective: 2000px;
    transform-style: preserve-3d;
    transform: translate(-50%, -50%);

    &:after {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 50%;
      background: linear-gradient(210deg,rgba(255, 255, 255, 0.18) 0%, rgba(0, 0, 0, 0) 100%);
      transform: rotate(3deg);
      clip-path: url("#tvClip");
      pointer-events: none;
    }

    .news-content {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: $black;
      transform: rotateX(-3deg) rotateY(-9deg) rotateZ(3.5deg) scale(1, 0);
      transition: transform 333ms $ease-out;

      .slide-0-active &.loaded {
        transform: rotateX(-3deg) rotateY(-9deg) rotateZ(3.5deg) scale(1, 1);
        transition: transform 333ms $ease-out 333ms;
      }

      &:before {
        content: " ";
        display: block;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                    linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
        z-index: 2;
        background-size: 100% 2px, 3px 100%;
        pointer-events: none;
      }

      &:after {
        content: " ";
        display: block;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        background: rgba(18, 16, 16, 0.1);
        opacity: 0;
        z-index: 2;
        pointer-events: none;
        animation: flicker 0.15s infinite;
      }

      .news-picture {
        width: 100%;
        height: 100%;
        opacity: 0.65;
        
        a {
          display: block;
          width: 100%;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }

      .marquee {
        position: absolute;
        bottom: 20%;
        left: 0px;
        width: 100%;
        line-height: 1.5em;
        color: $white;
        background-color: rgba($black, 0.65);
        overflow: hidden;

        .marquee-track {
          display: flex;
          width: max-content;
          white-space: nowrap;
          animation: marquee 16s linear infinite;

          span {
            flex: 0 0 auto;
            padding-right: 2rem;
            text-shadow:
              -1px 0 0 rgba(255, 0, 72, 0.85),
              1px 0 0 rgba(0, 170, 255, 0.85),
              0 0 6px rgba(255, 255, 255, 0.08);
          }
        }
      }
    }
  }

  .news-foreground {
    position: relative;
    pointer-events: none;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
