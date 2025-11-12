<template>
  <div class="page">
    <div class="slides" ref="slides">
      <Placeholder title="LOGO EXPLOSION (intro/contact)" />
      <Placeholder title="Who We Are" />
      <Placeholder title="What We Did" />
      <Placeholder title="Awards We Won" />
      <Placeholder title="Here We Are" />
    </div>
    <div class="clones" ref="clones">
      <Placeholder title="LOGO EXPLOSION (intro/contact)" />
      <Placeholder title="Who We Are" />
      <Placeholder title="What We Did" />
      <Placeholder title="Awards We Won" />
      <Placeholder title="Here We Are" />
    </div>
  </div>
</template>

<script setup>
const slides = ref(null);
const clones = ref(null);

// Mounted
onMounted(() => {
  document.addEventListener('scrollsnapchange', onScrollSnapChange);
});

// Before Unmount
onBeforeUnmount(() => {
  window.removeEventListener('scrollsnapchange', onScrollSnapChange);
});

// Methods
function scroll(y) {
  window.scrollTo({
    'top': y,
    'left': 0,
    'behavior': 'instant'
  });
}

function onScrollSnapChange (e) {
  const p = e.snapTargetBlock.parentElement;

  if(p === slides.value) {
    const index = Array.from(slides.value.children).indexOf(e.snapTargetBlock);

    if(index === 0) {
      const top = clones.value.children[0].offsetTop;

      // back at top, set scroll to clone top
      scroll(top);
    } 
  } else if(p === clones.value) {
    const index = Array.from(clones.value.children).indexOf(e.snapTargetBlock),
          top = index === 0 ? clones.value.children[index].offsetTop : slides.value.children[index].offsetTop;

    // in a clone, set scroll to corresponding slide
    scroll(top);
  }
}
</script>