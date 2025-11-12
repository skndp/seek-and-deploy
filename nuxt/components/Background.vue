<template>
  <section class="placeholder">
    <div class="card">
      <p>{{ title }}</p>
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
  display: flex;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  .card {
    position: relative;
    margin: span(1);
    box-shadow: 0px 0px 0px 1px $gray;
    margin: span(1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }
}

</style>
