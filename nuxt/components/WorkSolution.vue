<template>
  <section class="project-solution detail-slide">
    <h2 class="section-title h3-mid">The Solution</h2>
    <div class="media-block">
      <div class="media-holder">
        <img
          v-if="project.solution?.image"
          :src="project.solution.image"
          :alt="`Solution for ${project.title}`"
        />
        <video
          v-if="project.solution?.video"
          :src="project.solution.video"
          ref="video"
          autoplay
          muted
          loop
          playsinline
          @timeupdate="updateChapter"
        />
      </div>
      <div v-if="project.solution?.video && currentChapter" class="video-chapter-title">
        <span>{{ String(currentChapterIndex + 1).padStart(2, '0') }}.</span>
        {{ currentChapter.title }}
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const currentChapterIndex = ref(0)

const updateChapter = (e) => {
  const time = e.target.currentTime;
  const chapters = props.project.solution?.chapters ?? [];

  for (let i = chapters.length - 1; i >= 0; i--) {
    if (time >= chapters[i].start) {
      currentChapterIndex.value = i;
      return;
    }
  }

  currentChapterIndex.value = 0;
}

const currentChapter = computed(() =>
  props.project.solution?.chapters?.[currentChapterIndex.value]
)
</script>

<style lang="scss">
section.project-solution {
  position: relative;
  height: 100%;
  @include work-section-width(1);
  display: flex;
  flex-direction: column;
  justify-content: center;

  .section-title {
    margin: 0 span(2) span(1);
    text-align: center;
  }

  .media-block {
    position: relative;
    margin: 0 span(1);
    display: flex;
    flex-direction: column;
    
    .media-holder {
      position: relative;
      width: 100%;
      aspect-ratio: 1/1;
      overflow: hidden;
  
      img,
      video {
        @include abs-fill;
        object-fit: cover;
        object-position: 50% 50%;
      }
    }

    .video-chapter-title {
      position: relative;
      text-align: center;
      margin-top: $space-16;

      span {
        font-weight: 700;
        color: $yellow;
      }
    }
  }

  @include respond-to($landscape) {
    justify-content: space-between;

    .section-title {
      margin: span(1) span(2) 0;
    }

    .media-block {
      margin: span(0.5) span(1) span(1);
      display: flex;
      flex-grow: 1;

      .media-holder {
        height: 100%;
        aspect-ratio: auto;
      }
    }

    @include respond-to($macbook) {
      .media-block {
        margin: span(0.5) span(2) span(1);
      }
    }
  }
}
</style>
