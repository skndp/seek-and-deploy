<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="content">
            <h3 class="h3">We build pristine <span class="u">interfaces</span> and <span class="u">experiences</span>. In an era where AI can generate a website in ten minutes, we’re working with partners that still want something <span class="u">human</span>. Something built and maintained by experts that pay attention to <span class="u">details</span> and have a deep knowledge of <span class="u">how it works</span>. For those looking to build salient touch points for their brand, let's build something <span class="u">meaningful</span>!</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});
</script>

<style lang='scss'>
section.manifesto {
  .slide-1-next &,
  .slide-1-active & {
    opacity: 1;
  }
}
</style>
