<template>
  <div class="news-wrapper" :class="{ loaded: tvLoaded }">
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
    <div class="news-screens">
      <div class="news-screen news-screen-1">
        <div class="news-content">        
          <div class="news-picture">
            <a
              :href="screenData[1].href"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img :src="screenData[1].imageSrc" :alt="screenData[1].imageAlt" />
            </a>
          </div>
          <div class="marquee fs-sm" aria-label="BREAKING NEWS">
            <div class="marquee-track">
              <span>{{ screenData[1].headline }}</span>
              <span aria-hidden="true">{{ screenData[1].headline }}</span>
            </div>
          </div>
        </div>
        <div class="news-screen-reflection"></div>
      </div>
      <div class="news-screen news-screen-2">
        <div class="news-content">        
          <div class="news-picture">
            <img :src="screenData[2].imageSrc" :alt="screenData[2].imageAlt" />
          </div>
          <div class="marquee fs-sm" aria-label="BREAKING NEWS">
            <div class="marquee-track">
              <span>{{ screenData[2].headline }}</span>
              <span aria-hidden="true">{{ screenData[2].headline }}</span>
            </div>
          </div>
        </div>
        <div class="news-screen-reflection"></div>
      </div>
      <div class="news-screen news-screen-3">
        <div class="news-content">        
          <div class="news-picture">
            <a
              :href="screenData[3].href"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img :src="screenData[3].imageSrc" :alt="screenData[3].imageAlt" />
            </a>
          </div>
          <div class="marquee fs-sm" aria-label="BREAKING NEWS">
            <div class="marquee-track">
              <span>{{ screenData[3].headline }}</span>
              <span aria-hidden="true">{{ screenData[3].headline }}</span>
            </div>
          </div>
        </div>
        <div class="news-screen-reflection"></div>
      </div>
      <div class="news-screen news-screen-4">
        <div class="news-content">        
          <div class="news-picture">
            <a
              :href="screenData[4].href"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img :src="screenData[4].imageSrc" :alt="screenData[4].imageAlt" />
            </a>
          </div>
          <div class="marquee fs-sm" aria-label="BREAKING NEWS">
            <div class="marquee-track">
              <span>{{ screenData[4].headline }}</span>
              <span aria-hidden="true">{{ screenData[4].headline }}</span>
            </div>
          </div>
        </div>
        <div class="news-screen-reflection"></div>
      </div>
    </div>
    <div class="news-foreground">
      <img
        ref="tvImage"
        src="/images/tv-pile.png"
        alt="A pile of TVs from the ancient times displaying our latest news."
        fetchpriority="high"
        loading="eager"
        @load="handleTvLoad"
      />
    </div>
  </div>
</template>

<script>
const fleshAndBonesScreen = {
  href: 'https://wearefleshandbones.com',
  imageSrc: '/images/flesh-and-bones.webp',
  imageAlt: 'We launched Flesh & Bones.',
  headline: 'BREAKING NEWS - WE LAUNCHED FLESH & BONES!',
};

const marvScreen = {
  href: null,
  imageSrc: '/images/marv.webp',
  imageAlt: 'Marv.',
  headline: 'BZZZZZZ AAARRRGGGHOOOOOOOHHHHHHEEEEEEEEEE!',
};

export default {
  data() {
    return {
      tvLoaded: false,
      screenData: {
        1: { ...fleshAndBonesScreen },
        2: { ...marvScreen },
        3: { ...fleshAndBonesScreen },
        4: { ...fleshAndBonesScreen },
      },
    };
  },

  mounted() {
    // TODO: random screen assignment should be passed in as a prop an calculated a level higher in @CoverSlide.vue
    //this.assignRandomScreenData();
    this.handleTvLoad();
  },

  methods: {
    // assignRandomScreenData() {
    //   const screenChoices = [1, 3, 4];
    //   const randomScreen = screenChoices[Math.floor(Math.random() * screenChoices.length)];

    //   const screenTwoData = this.screenData[2];
    //   this.screenData[2] = this.screenData[randomScreen];
    //   this.screenData[randomScreen] = screenTwoData;
    // },

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
  position: absolute;
  top: 36%;
  left: 50%;
  width: 80%;
  aspect-ratio: 1/1;
  transform: translate(-50%, -50%);

  &.loaded {
    .news-screens {
      .news-screen {
        visibility: visible;
      }
    }
  }

  .slide-0-active &.loaded {
    .news-screens {
      .news-screen-1 {
        .news-content {
          transform: scale(1, 1);
          transition: transform 333ms $ease-out 333ms;
        }
      }

      .news-screen-2 {
        .news-content {
          transform: scale(1, 1);
          transition: transform 333ms $ease-out 666ms;
        }
      }

      .news-screen-3 {
        .news-content {
          transform: scale(1, 1);
          transition: transform 333ms $ease-out 444ms;
        }
      }

      .news-screen-4 {
        .news-content {
          transform: scale(1, 1);
          transition: transform 333ms $ease-out 999ms;
        }
      }
    }
  }

  .news-screens {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    perspective: 1500px;
    transform-style: preserve-3d;
    pointer-events: none;

    .news-screen {
      position: absolute;
      overflow: hidden;
      background: #121010;
      visibility: hidden;
      backface-visibility: hidden;
      will-change: visibility;
      pointer-events: all;

      &.news-screen-1 {
        top: 10.75%;
        left: 46.2%;
        width: 16.75%;
        aspect-ratio: 5/4;
        transform-origin: 0px 0px;
        transform: rotateY(37deg) rotateZ(5deg);

        .marquee {
          font-size: 0.25em;
        }
      }

      &.news-screen-2 {
        top: 33.083%;
        left: 31.25%;
        width: 29.917%;
        aspect-ratio: 359/268;

        .marquee {
          font-size: 0.45em;
        }
      }

      &.news-screen-3 {
        top: 69%;
        left: 4.583%;
        width: 23.5%;
        aspect-ratio: 14 / 15;
        transform-origin: 0px 0px;
        transform: rotateX(20deg) rotateY(-16deg) rotateZ(-2.4deg);

        .marquee {
          font-size: 0.56em;
        }
      }

      &.news-screen-4 {
        top: 62%;
        left: 54.583%;
        width: 37%;
        aspect-ratio: 4 / 3;
        transform-origin: 0px 0px;
        transform: rotateX(7deg) rotateY(15deg) rotateZ(3deg);

        .marquee {
          font-size: 0.66em;
        }
      }

      .news-content {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: $black;
        transform: scale(1, 0);
        transition: transform 333ms $ease-out;
        will-change: transform;

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
          opacity: 0.85;
          
          a {
            display: block;
            width: 100%;
            height: 100%;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
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

      .news-screen-reflection {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 50%;
        background: linear-gradient(210deg,rgba(255, 255, 255, 0.18) 0%, rgba(0, 0, 0, 0) 100%);
        clip-path: url("#tvClip");
        pointer-events: none;
      }
    }
  }

  .news-foreground {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    pointer-events: none;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  @include respond-to($tablet) {
    top: 33%;
    width: 55%;
  }

  @include respond-to($large-tablet) {
    top: 50%;
    left: 128px;
    width: 42%;
    transform: translate(0, -50%);
  }

  @include respond-to($average-desktop) {
    top: 50%;
    width: 40%;
  }
}
</style>
