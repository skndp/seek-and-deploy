<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="content">
            <h3 class="h3">We build pristine interfaces and experiences. In an era where AI can generate a website in ten minutes, we’re working with partners that still want something human. Something built and maintained by experts that pay attention to details and have a deep knowledge of how it works. For those looking to build salient touch points for their brand, let's build something meaningful!</h3>
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
