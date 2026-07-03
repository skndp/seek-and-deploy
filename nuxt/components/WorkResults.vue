<template>
  <section class="project-results detail-slide">
    <div class="detail-snap detail-snap-half" aria-hidden="true" />
    <div class="results-block">
      <div
        v-for="(result, index) in project.results.resultsStats"
        :key="result.label || index"
        class="results-stat-block"
      >
        <span class="result-icon" aria-hidden="true">
          <template v-if="result.icon === 'fortune'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Fortune-Telling-Sphere--Streamline-Sharp" height="24" width="24">
              <desc>
                Fortune Telling Sphere Streamline Icon: https://streamlinehq.com
              </desc>
              <g id="fortune-telling-sphere--religion-fortune-telling-sphere-culture">
                <path id="Ellipse 903" stroke="#fff" d="m21 22 -1.9056 -5 -14.18877 0L3 22l18 0Z" stroke-width="1.5"></path>
                <path id="Ellipse 891" stroke="#fff" d="M7.24837 16.6216C5.27777 15.1458 4 12.7753 4 10.1025 4 5.62762 7.58172 2 12 2c4.4183 0 8 3.62762 8 8.1025 0 2.6888 -1.2931 5.0716 -3.2837 6.5455" stroke-width="1.5"></path>
                <path id="Vector 2812" stroke="#fff" d="M12 10.75v-1.5" stroke-width="1.5"></path>
                <path id="Intersect" stroke="#fff" d="M12 6.50635c-2.22094 0 -3.33333 1.75 -5 3.49995 1.66667 1.75 2.77906 3.5 5 3.5 2.2209 0 3.3333 -1.75 5 -3.5 -1.6667 -1.74995 -2.7791 -3.49995 -5 -3.49995Z" stroke-width="1.5"></path>
              </g>
            </svg>
          </template>
          <template v-else-if="result.icon === 'share'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Share-Code--Streamline-Sharp" height="24" width="24">
              <desc>
                Share Code Streamline Icon: https://streamlinehq.com
              </desc>
              <g id="share-code--code-angle-programming-share">
                <path id="Vector 1863" stroke="#fff" d="M1.165 21.304h10.5l9.5 -3v-0.392a2.61 2.61 0 0 0 -3.375 -2.493l-6.125 1.885m-5 0 5 0m0 0v-3l-6.29 -0.968a3.003 3.003 0 0 0 -3.46 2.968" stroke-width="1.5"></path>
                <path id="Vector" stroke="#fff" d="M10.949 4.117 8.105 6.96l2.844 2.844" stroke-width="1.5"></path>
                <path id="Vector_2" stroke="#fff" d="m19.111 4.117 2.844 2.844 -2.844 2.844" stroke-width="1.5"></path>
                <path id="Vector_3" stroke="#fff" d="m13.733 10.42 2.594 -7.783" stroke-width="1.5"></path>
              </g>
            </svg>
          </template>
          <template v-else-if="result.icon === 'startup'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Startup--Streamline-Sharp" height="24" width="24">
              <desc>
                Startup Streamline Icon: https://streamlinehq.com
              </desc>
              <g id="startup--shop-rocket-launch-startup">
                <path id="Vector 48" stroke="#fff" d="M5.00001 12 15 2.00001l7 0L22 9 12 19l-6.99999 -7Z" stroke-width="1.5"></path>
                <path id="Vector 184" stroke="#fff" d="M5 6 2 9l3 3 6 -6H5Z" stroke-width="1.5"></path>
                <path id="Vector 185" stroke="#fff" d="m18 19 -3 3 -3 -3 6 -6 0 6Z" stroke-width="1.5"></path>
                <path id="Vector 186" stroke="#fff" d="m7 17 -5 5" stroke-width="1.5"></path>
                <path id="Vector 187" stroke="#fff" d="m10 20 -2 2" stroke-width="1.5"></path>
                <path id="Vector 188" stroke="#fff" d="m4 14 -2 2" stroke-width="1.5"></path>
                <path id="Vector 2949" stroke="#fff" d="m16.5156 7.48438 -2.0312 2.03124" stroke-width="1.5"></path>
              </g>
            </svg>
          </template>
          <img v-else-if="result.icon === 'fwa'" src="/images/fwa.png" alt="FWA" />
          <img v-else-if="result.icon === 'awwwards'" src="/images/awwwards.png" alt="Awwwards" />
        </span>
        <span>{{ result.label }}</span>
      </div>
    </div>
    <div class="title-block">
      <h2 class="section-title h3-mid">The Results</h2>
      <p class="fs-sm">
        Next:
        <NuxtLink v-if="nextProject" class="next-project" :to="nextProject.path">{{ nextProject.title }}</NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  nextProject: {
    type: Object,
    default: null
  }
});
</script>

<style lang="scss">
section.project-results {
  position: relative;
  height: 100%;
  @include work-section-width(2);
  display: flex;
  flex-direction: column;
  justify-content: center;

  .detail-snap-half {
    position: absolute;
    top: 0px;
    left: 50%;
    width: 0px;
    height: 100%;
    pointer-events: none;
  }

  .results-block {
    position: relative;
    margin: 0 span(1);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: span(1);
    
    .results-stat-block {
      position: relative;
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0.75rem;
      text-align: center;
      padding: 1rem;
    }

    .result-icon {
      display: flex;
      align-items: center;
      justify-content: center;

      svg,
      img {
        width: 24px;
        height: 24px;
        flex: 0 0 auto;
      }

      img {
        object-fit: contain;
      }
    }
  }

  .title-block {
    position: absolute;
    bottom: span(1);
    left: span(1);
    right: span(1);
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    p {
      display: inline-flex;

      a {
        margin-left: 1ch;
        text-decoration: underline;
        text-decoration-color: $yellow;
        text-decoration-thickness: 1px;
        text-underline-offset: 0.2em;
        display: flex;
      }
    }
  }

  @include respond-to($landscape) {
    @include respond-to($desktop) {
      .results-block {
        margin: 0 span(2) 0 span(1);
      }
    }

    @include respond-to($macbook) {
      .title-block {
        bottom: span(0.5);
      }
    }
  }
}
</style>
