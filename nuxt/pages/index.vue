<template>
  <div class="page">
    <div :class="['slides', store.slidePrevState, store.slideActiveState, store.slideNextState]" ref="slidesRef">
      <CoverSlide title="Seek and Deploy" />
      <template v-for="(slide, index) in slides">
        <component
          :is="slide.component"
          :id="slide.id"
          :title="`${String(index + 1).padStart(3, '0')} — ${slide.title}`"
        />
      </template>
    </div>
    <div :class="['clones', store.slidePrevState, store.slideActiveState, store.slideNextState]" ref="clonesRef">
      <CoverSlide title="Seek and Deploy" />
      <template v-for="(slide, index) in slides">
        <component
          :is="slide.component"
          :id="slide.id"
          :title="`${String(index + 1).padStart(3, '0')} — ${slide.title}`"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';
import Manifesto from '~/components/Manifesto.vue'
import Team from '~/components/Team.vue'
import Work from '~/components/Work.vue'
import Awards from '~/components/Awards.vue'
import Contact from '~/components/Contact.vue'

const store = useSiteStore();
const slidesRef = ref(null);
const clonesRef = ref(null);
let slideIndex = 0;

const slides = [
  {
    component: Manifesto,
    id: "manifesto",
    title: "Manifesto"
  },
  {
    component: Team,
    id: "team",
    title: "Who We Are"
  },
  {
    component: Work,
    id: "work",
    title: "What We Did"
  },
  {
    component: Awards,
    id: "awards",
    title: "Awards We Won"
  },
  {
    component: Contact,
    id: "contact",
    title: "Here We Are"
  }
];

// Mounted
onMounted(() => {
  document.addEventListener('scrollsnapchanging', onScrollSnapChanging);
  document.addEventListener('scrollsnapchange', onScrollSnapChange);
  document.addEventListener('scrollsnapchange', updateTitleSlideMsg);
});

// Before Unmount
onBeforeUnmount(() => {
  document.removeEventListener('scrollsnapchanging', onScrollSnapChanging);
  document.removeEventListener('scrollsnapchange', onScrollSnapChange);
  document.removeEventListener('scrollsnapchange', updateTitleSlideMsg);
});

// Methods
function scroll(y) {
  // ignore snap events
  document.removeEventListener('scrollsnapchanging', onScrollSnapChanging);
  document.removeEventListener('scrollsnapchange', onScrollSnapChange);

  setTimeout(() => {
    // scroll
    window.scrollTo({
      'top': y,
      'left': 0,
      'behavior': 'instant'
    });

    // listen to snap events
    document.addEventListener('scrollsnapchanging', onScrollSnapChanging);
    document.addEventListener('scrollsnapchange', onScrollSnapChange);
  }, 0);
}

// slide starting to change
function onScrollSnapChanging(e) {
  if (!e.snapTargetBlock) {
    store.setChangingSlides(false);
    return false;
  }

  const p = e.snapTargetBlock.parentElement;
  let nextIndex = 0;

  store.setChangingSlides(true);
  store.setSlideActiveState('');
  store.setSlidePrevState(`slide-${slideIndex}-prev`);

  if(p === slidesRef.value) {
    nextIndex = Array.from(slidesRef.value.children).indexOf(e.snapTargetBlock);
  } else if(p === clonesRef.value) {
    nextIndex = Array.from(clonesRef.value.children).indexOf(e.snapTargetBlock);
  }

  store.setSlideNextState(`slide-${nextIndex}-next`);
}

// slide change
function onScrollSnapChange (e) {
  if (!e.snapTargetBlock) {
    store.setChangingSlides(false);
    return false;
  }

  const p = e.snapTargetBlock.parentElement;

  let top = 0;

  if(p === slidesRef.value) {
    // back at top, set scroll to clone top
    slideIndex = Array.from(slidesRef.value.children).indexOf(e.snapTargetBlock);

    if(slideIndex === 0) {
      top = clonesRef.value.children[0].offsetTop;
      scroll(top);
    }
  } else if(p === clonesRef.value) {
    // in a clone, set scroll to corresponding slide
    slideIndex = Array.from(clonesRef.value.children).indexOf(e.snapTargetBlock);
    top = slideIndex === 0 ? clonesRef.value.children[slideIndex].offsetTop : slidesRef.value.children[slideIndex].offsetTop;
    scroll(top);
  }

  store.setSlidePrevState('');
  store.setSlideNextState('');
  store.setSlideActiveState(`slide-${slideIndex}-active`);
  store.setSlideIndex(slideIndex);

  if (store.introSlide) {
    store.setIntroSlide(false);
  }

  setTimeout(() => {
    store.setChangingSlides(false);
  }, 27);
}

// update cover slide message to contact on 1st slide change
function updateTitleSlideMsg() {
  document.removeEventListener('scrollsnapchange', updateTitleSlideMsg);
  store.setTitleSlideMsg('Pick up the reciever, we\'ll make you a believer.');
}

// Watcher
watch(() => store.slideIndex, (newVal, oldVal) => {
    if (slidesRef.value) {
      const slides = slidesRef.value.querySelectorAll('.slide');
      const slide = slides[newVal]; // offset by 1 for the cover slide...

      if (slide) {
        slide.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
)
</script>

<style lang='scss'>
section.slide {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  .inner {
    height: 100%;
    margin-left: $space-64;
    display: flex;
    flex-grow: 1;

    .gutter {
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      h2 {
        height: $space-64;
        display: flex;
        align-items: center;
      }

      .container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
    }
  }

  @include respond-to($tablet) {
    .inner {
      margin-left: $space-96;

      .gutter {
        h2 {
          height: $space-96;
        }
      }
    }
  }

  @include respond-to($macbook) {
    .inner {
      margin-left: $space-128;

      .gutter {
        h2 {
          height: $space-128;
        }
      }
    }
  }
}
</style>
