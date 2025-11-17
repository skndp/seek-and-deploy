<template>
  <section class="placeholder">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm">{{ title }}</h2>
      </div>
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

  .inner {
    margin-left: $space-64;
  }

  h2 {
    color: $gray;
    height: $space-64;
    display: flex;
    align-items: center;
  }

  @include respond-to($tablet) {
    .inner {
      margin-left: $space-96;
    }

    h2 {
      height: $space-96;
    }
  }

  @include respond-to($macbook) {
    .inner {
      margin-left: $space-128;
    }

    h2 {
      height: $space-128;
    }
  }
}

</style>
