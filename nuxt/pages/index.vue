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

// Mounted
onMounted(() => {
  document.addEventListener('scrollsnapchange', onScrollSnapChange);
});

// Before Unmount
onBeforeUnmount(() => {
  document.removeEventListener('scrollsnapchange', onScrollSnapChange);
});

// Methods
function scroll(y) {
  // ignore snap change
  document.removeEventListener('scrollsnapchange', onScrollSnapChange);
  
  // scroll
  window.scrollTo({
    'top': y,
    'left': 0,
    'behavior': 'instant'
  });

  // listen to snap change
  setTimeout(() => {
    document.addEventListener('scrollsnapchange', onScrollSnapChange);
  }, 0);
}

function onScrollSnapChange (e) {
  if(!e.snapTargetBlock) return;

  const p = e.snapTargetBlock.parentElement;

  let index = 0,
      top = 0;

  // back at top, set scroll to clone top
  if(p === slides.value) {
    index = Array.from(slides.value.children).indexOf(e.snapTargetBlock);

    if(index === 0) {
      top = clones.value.children[0].offsetTop;
      scroll(top);
    } 
  // in a clone, set scroll to corresponding slide
  } else if(p === clones.value) {
    index = Array.from(clones.value.children).indexOf(e.snapTargetBlock);
    top = index === 0 ? clones.value.children[index].offsetTop : slides.value.children[index].offsetTop;
    scroll(top);
  }

  store.setSlideNum(index);
}
</script>