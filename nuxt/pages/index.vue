<template>
  <div :class="['page home-page', {'snap': snap}]" ref="pageRef">
    <ClientOnly>
      <div :class="['clones', 'clones-before', store.slidePrevState, store.slideActiveState, store.slideNextState]" ref="beforeClonesRef" aria-hidden="true">
        <component
          :is="lastSlide.component"
          :id="lastSlide.id"
          :title="formatSlideTitle(slides.length - 1)"
        />
      </div>
    </ClientOnly>
    <div :class="['slides', store.slidePrevState, store.slideActiveState, store.slideNextState]" ref="slidesRef">
      <CoverSlide :title="coverTitle" />
      <template v-for="(slide, index) in slides">
        <component
          :is="slide.component"
          :id="slide.id"
          :title="formatSlideTitle(index)"
        />
      </template>
    </div>
    <ClientOnly>
      <div :class="['clones', 'clones-after', store.slidePrevState, store.slideActiveState, store.slideNextState]" ref="afterClonesRef" aria-hidden="true">
        <CoverSlide :title="coverTitle" />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { disableBodyScroll } from 'body-scroll-lock';
import { useSiteStore } from '~/stores/store';
import Manifesto from '~/components/Manifesto.vue'
import Team from '~/components/Team.vue'
import Work from '~/components/Work.vue'
import Services from '~/components/Services.vue'
import Awards from '~/components/Awards.vue'
import Contact from '~/components/Contact.vue'

const siteUrl = 'https://seekanddeploy.com';
const pageTitle = 'Seek and Deploy | Interactive Studio in Denver, CO';
const pageDescription = 'Seek and Deploy is a Denver-based interactive studio creating thoughtfully crafted websites, interfaces, and digital experiences with strong creative and technical execution.';
const ogImage = `${siteUrl}/images/seek-and-deploy.jpg`;

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: siteUrl,
  ogImage,
  ogType: 'website',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: ogImage,
  twitterCard: 'summary_large_image'
});

useHead({
  link: [
    {
      rel: 'canonical',
      href: siteUrl
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/#organization`,
        name: 'Seek and Deploy',
        url: siteUrl,
        image: ogImage,
        description: pageDescription,
        telephone: '+1-720-219-7096',
        email: 'hello@seekanddeploy.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1305 Osage St.',
          addressLocality: 'Denver',
          addressRegion: 'CO',
          postalCode: '80204',
          addressCountry: 'US'
        },
        areaServed: 'Denver, CO',
        sameAs: [
          'https://www.linkedin.com/company/seek-and-deploy/'
        ]
      })
    }
  ]
});

const store = useSiteStore();
const pageRef = ref(null);
const slidesRef = ref(null);
const beforeClonesRef = ref(null);
const afterClonesRef = ref(null);
const snap = ref(false);
let slideElements;
let slideOffsets = [];
let slideIndex = 0;
let scrollTimeout;
let scrollSnapInitialized = false;
let restoreScrollFrame;
const coverTitle = 'Seek and Deploy';

const slides = [
  {
    component: Manifesto,
    id: "manifesto",
    title: "We're here for it"
  },
  {
    component: Team,
    id: "team",
    title: "Juuust the two of us (and an intern)"
  },
  {
    component: Work,
    id: "work",
    title: "Dropping rows of 1 and 0s"
  },
  {
    component: Services,
    id: "services",
    title: "What would you say ... ya do here?"
  },
  {
    component: Awards,
    id: "awards",
    title: "The Results"
  },
  {
    component: Contact,
    id: "contact",
    title: "39.737376, -105.005511"
  }
];
const lastSlide = slides[slides.length - 1];
const lastSlideIndex = slides.length;

// Mounted
onMounted(() => {
  if (pageRef.value) {
    disableBodyScroll(pageRef.value);
  }

  window.addEventListener('app-ready', initScrollSnap, { once: true });
  initScrollSnap();
});

// Before Unmount
onBeforeUnmount(() => {
  clearTimeout(scrollTimeout);
  cancelAnimationFrame(restoreScrollFrame);
  window.removeEventListener('app-ready', initScrollSnap);
  pageRef.value?.removeEventListener('scroll', onPageScroll);
  window.removeEventListener('resize', onResize);
  window.removeEventListener('menu-slide-change', onMenuSlideChange);
  store.setChangingSlides(false);
});

// Methods
async function initScrollSnap() {
  if(scrollSnapInitialized || !pageRef.value) {
    return;
  }

  scrollSnapInitialized = true;

  await nextTick();

  if(!pageRef.value) {
    return;
  }

  slideElements = pageRef.value.querySelectorAll('.slide');

  window.addEventListener('resize', onResize);
  onResize();
  disableCloneTabStops();
  slideIndex = getStoredSlideIndex();
  snap.value = false;
  restoreRealSlidePosition(slideIndex);
  await waitForFrames(2);

  if(!pageRef.value) {
    return;
  }

  store.setChangingSlides(false);
  store.setSlideNextState('');
  store.setSlideActiveState(`slide-${slideIndex}-active`);
  snap.value = true;

  pageRef.value.addEventListener('scroll', onPageScroll);

  window.addEventListener('menu-slide-change', onMenuSlideChange);
}

function formatSlideTitle(index) {
  return `${String(index + 1).padStart(3, '0')} — ${slides[index].title}`;
}

function onResize(e) {
  slideElements.forEach((slide, index) => {
    slideOffsets[index] = slide.offsetTop;
  });
}

function disableCloneTabStops() {
  [beforeClonesRef.value, afterClonesRef.value].forEach((clone) => {
    clone?.querySelectorAll('a, button, input, select, textarea, summary, [tabindex]').forEach((el) => {
      el.setAttribute('tabindex', '-1');
    });
  });
}

function getStoredSlideIndex() {
  const match = (store.slideActiveState || store.slideNextState).match(/slide-(\d+)-(active|next)/);
  const nextIndex = match ? Number(match[1]) : 0;

  return Math.min(Math.max(nextIndex, 0), lastSlideIndex);
}

function getLogicalSlideIndex(slide) {
  const parent = slide.parentElement;

  if(parent === beforeClonesRef.value) {
    return lastSlideIndex;
  }

  if(parent === afterClonesRef.value) {
    return 0;
  }

  return Array.from(slidesRef.value.children).indexOf(slide);
}

function restoreRealSlidePosition(index) {
  const slide = slidesRef.value?.children[index];

  if(slide) {
    pageRef.value.scrollTop = slide.offsetTop;
    pageRef.value.scrollLeft = 0;
  }
}

function waitForFrames(count) {
  return new Promise((resolve) => {
    const tick = () => {
      count--;

      if(count <= 0) {
        resolve();
        return;
      }

      restoreScrollFrame = requestAnimationFrame(tick);
    };

    restoreScrollFrame = requestAnimationFrame(tick);
  });
}

function unsetInitialSlideAfterCover() {
  if(store.initialSlide && slideIndex !== 0) {
    store.setInitialSlide(false);
  }
}

function onPageScroll(e) {
  store.setChangingSlides(true);

  slideElements.forEach((slide, index) => {
    const wh = window.innerHeight,
          b = slide.getBoundingClientRect();

    if(b.top > 10 && b.top < wh - 10 || b.bottom > 10 && b.bottom < wh - 10) {
      const nextIndex = getLogicalSlideIndex(slide);

      if(nextIndex !== slideIndex) {
        store.setSlideActiveState('');
        if(store.slideNextState !== `slide-${nextIndex}-next`) store.setSlideNextState(`slide-${nextIndex}-next`);
      }
    }
  });

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(onScrollComplete, 127);
}

function onScrollComplete() {
  const currentScroll = Math.round(pageRef.value.scrollTop);

  if(slideOffsets.includes(currentScroll)) {
    const t = slideElements[slideOffsets.indexOf(currentScroll)],
          p = t.parentElement;

    slideIndex = getLogicalSlideIndex(t);

    if(p === beforeClonesRef.value || p === afterClonesRef.value) {
      scroll(slidesRef.value.children[slideIndex].offsetTop);
    }

    store.setSlideNextState('');
    store.setSlideActiveState(`slide-${slideIndex}-active`);
    

    unsetInitialSlideAfterCover();

    setTimeout(() => {
      store.setChangingSlides(false);
    }, 0);
  }
}

function scroll(y) {
  // ignore scroll
  pageRef.value.removeEventListener('scroll', onPageScroll);

  setTimeout(() => {
    // scroll
    pageRef.value.scrollTo({
      'top': y,
      'left': 0,
      'behavior': 'instant'
    });

    // listen to page scroll
    setTimeout(() => {
      pageRef.value.addEventListener('scroll', onPageScroll);
    }, 27);
  }, 27);
}

function onMenuSlideChange(e) {
  let slide;

  if(e.detail.slide === 'next') {
    if(slideIndex === lastSlideIndex) {
      slide = afterClonesRef.value.children[0];
    } else {
      slide = slidesRef.value.children[slideIndex + 1];
    }
  } else {
    slide = slidesRef.value.children[e.detail.slide];
  }

  slide.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<style lang='scss'>
.home-page {
  position: relative;
  overflow-y: auto;
  height: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  &.snap {
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }
}

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
}
</style>
