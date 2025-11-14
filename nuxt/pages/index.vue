<template>
  <div class="page">
    <div class="slides" ref="slides">
      <CoverSlide title="Seek and Deploy" />
      <Placeholder title="Manifesto" />
      <Placeholder title="Who We Are" />
      <Placeholder title="What We Did" />
      <Placeholder title="Awards We Won" />
      <Placeholder title="Here We Are" />
    </div>
    <div class="clones" ref="clones">
      <CoverSlide title="Seek and Deploy" />
      <Placeholder title="Manifesto" />
      <Placeholder title="Who We Are" />
      <Placeholder title="What We Did" />
      <Placeholder title="Awards We Won" />
      <Placeholder title="Here We Are" />
    </div>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();
const slides = ref(null);
const clones = ref(null);
let slideIndex = 0;

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
  if(!e.snapTargetBlock) return;

  const p = e.snapTargetBlock.parentElement;
  let nextIndex = 0;

  store.setSlideActiveState('');
  store.setSlidePrevState(`slide-${slideIndex}-prev`);

  if(p === slides.value) {
    nextIndex = Array.from(slides.value.children).indexOf(e.snapTargetBlock);
  } else if(p === clones.value) {
    nextIndex = Array.from(clones.value.children).indexOf(e.snapTargetBlock);
  }

  store.setSlideNextState(`slide-${nextIndex}-next`);
}

// slide change
function onScrollSnapChange (e) {
  if(!e.snapTargetBlock) return;

  const p = e.snapTargetBlock.parentElement;

  let top = 0;

  // back at top, set scroll to clone top
  if(p === slides.value) {
    slideIndex = Array.from(slides.value.children).indexOf(e.snapTargetBlock);

    if(slideIndex === 0) {
      top = clones.value.children[0].offsetTop;
      scroll(top);
    } 
  // in a clone, set scroll to corresponding slide
  } else if(p === clones.value) {
    slideIndex = Array.from(clones.value.children).indexOf(e.snapTargetBlock);
    top = slideIndex === 0 ? clones.value.children[slideIndex].offsetTop : slides.value.children[slideIndex].offsetTop;
    scroll(top);
  }

  store.setSlidePrevState('');
  store.setSlideNextState('');
  store.setSlideActiveState(`slide-${slideIndex}-active`);
}

// update cover slide message to contact on 1st slide change
function updateTitleSlideMsg() {
  document.removeEventListener('scrollsnapchange', updateTitleSlideMsg);
  store.setTitleSlideMsg('Pick up the reciever, we\'ll make you a believer.');
}
</script>