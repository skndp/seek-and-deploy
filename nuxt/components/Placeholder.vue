<template>
  <section class="placeholder">
    <div class="gutter">
      <h2 class="h2">{{ title }}</h2>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  title: {
    type: String,
    required: false
  }
});
</script>

<style lang='scss'>
.placeholder {
  position: relative;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

</style>
