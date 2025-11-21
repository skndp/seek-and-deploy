<template>
  <div :class="['page', {'snap': snap}]" ref="pageRef">
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
const pageRef = ref(null);
const slidesRef = ref(null);
const clonesRef = ref(null);
const snap = ref(false);
let slideElements;
let slideOffsets = [];
let slideIndex = 0;
let scrollTimeout;

const slides = [
  {
    component: Manifesto,
    id: "manifesto",
    title: "Hello World"
  },
  {
    component: Team,
    id: "team",
    title: "Reunited And It Feels So Good"
  },
  {
    component: Work,
    id: "work",
    title: "What Would You Say Ya Do Here?"
  },
  {
    component: Awards,
    id: "awards",
    title: "Winner, Winner, Chicken Dinner"
  },
  {
    component: Contact,
    id: "contact",
    title: "39.737376, -105.005511"
  }
];

// Mounted
onMounted(() => {
  window.addEventListener('app-ready', initScrollSnap, { once: true });
});

// Before Unmount
onBeforeUnmount(() => {
  pageRef.value.addEventListener('scroll', onPageScroll);
});

// Methods
function initScrollSnap() {
  slideElements = pageRef.value.querySelectorAll('.slide');
  snap.value = true;

  window.addEventListener('resize', onResize);
  onResize();

  pageRef.value.addEventListener('scroll', onPageScroll);

  window.addEventListener('menu-slide-change', onMenuSlideChange);
}

function onResize(e) {
  slideElements.forEach((slide, index) => {
    slideOffsets[index] = slide.offsetTop;
  });
}

function onPageScroll(e) {
  store.setChangingSlides(true);

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(onScrollComplete, 50);
}

function onScrollComplete() {
  const currentScroll = pageRef.value.scrollTop;

  if(slideOffsets.includes(currentScroll)) {
    const t = slideElements[slideOffsets.indexOf(currentScroll)],
          p = t.parentElement;

    let newScroll = 0;

    if(p === slidesRef.value) {
      // back at top, set scroll to clone top
      slideIndex = Array.from(slidesRef.value.children).indexOf(t);

      if(slideIndex === 0) {
        newScroll = clonesRef.value.children[0].offsetTop;
        scroll(newScroll);
      }
    } else if(p === clonesRef.value) {
      // in a clone, set scroll to corresponding slide
      slideIndex = Array.from(clonesRef.value.children).indexOf(t);
      newScroll = slideIndex === 0 ? clonesRef.value.children[slideIndex].offsetTop : slidesRef.value.children[slideIndex].offsetTop;
      scroll(newScroll);
    }

    store.setSlidePrevState('');
    store.setSlideNextState('');
    store.setSlideActiveState(`slide-${slideIndex}-active`);
    

    if (store.initialSlide) {
      store.setInitialSlide(false);
    }

    setTimeout(() => {
      store.setChangingSlides(false);
    }, 0);
  }
}

function scroll(y) {
  // ignore scroll
  pageRef.value.addEventListener('scroll', onPageScroll);

  setTimeout(() => {
    // scroll
    pageRef.value.scrollTo({
      'top': y,
      'left': 0,
      'behavior': 'instant'
    });

    // listen to page scroll
    pageRef.value.addEventListener('scroll', onPageScroll);
  }, 0);
}

function onMenuSlideChange(e) {
  let slide;

  if(e.detail.slide === 'next') {
    if(slideIndex === 0 && store.initialSlide !== true) {
      slide = slideElements[7];
    } else {
      slide = slideElements[slideIndex + 1];
    }
  } else {
    slide = slideElements[e.detail.slide];
  }

  slide.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// slide starting to change
function onScrollSnapChanging(e) {
  if (!e.detail.target) {
    store.setChangingSlides(false);
    return false;
  }

  const t = e.detail.target,
        p = t.parentElement;

  let nextIndex = 0;

  store.setChangingSlides(true);
  store.setSlideActiveState('');
  store.setSlidePrevState(`slide-${slideIndex}-prev`);

  if(p === slidesRef.value) {
    nextIndex = Array.from(slidesRef.value.children).indexOf(t);
  } else if(p === clonesRef.value) {
    nextIndex = Array.from(clonesRef.value.children).indexOf(t);
  }

  store.setSlideNextState(`slide-${nextIndex}-next`);
}
</script>

<style lang='scss'>

section.slide {
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  opacity: 0;
  transition: opacity 1s $evil-ease;

  .inner {
    height: 100%;
    margin-left: $space-64;
    display: flex;
    flex-grow: 1;

    .gutter {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      h2.fs-sm {
        height: $space-64;
        display: flex;
        align-items: center;
      }

      .container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .content {
          width: 100%;
          margin: 0 0 $space-64;
          display: flex;
          justify-content: center;
          flex-direction: column;
          flex-grow: 1;
        }
      }
    }
  }

  @include respond-to($tablet) {
    .inner {
      margin-left: $space-96;

      .gutter {
        h2.fs-sm {
          height: $space-96;
        }

        .container {
          .content {
            margin: 0 auto $space-96;
          }
        }
      }
    }
  }

  @include respond-to($desktop) {
    .inner {
      .gutter {
        .container {
          .content {
            max-width: 900px;
            margin: 0 auto $space-96;
          }
        }
      }
    }
  }

  @include respond-to($macbook) {
    .inner {
      margin-left: $space-128;

      .gutter {
        h2.fs-sm {
          height: $space-128;
        }

        .container {
          .content {
            margin: 0 auto $space-128;
          }
        }
      }
    }
  }
}
</style>
