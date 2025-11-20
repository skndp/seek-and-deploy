<template>
  <ul class="social-links">
    <li v-for="(link, index) in socials">
      <NuxtLink :to="link" target="_blank" />
    </li>
  </ul>
</template>

<script setup>
// Props
const props = defineProps({
  socials: {
    type: Array,
    required: true
  }
});
</script>

<style lang='scss'>
ul.social-links {
  margin-left: -5px;
  margin-top: 12px;
  display: inline-flex;
  align-items: center;

  li {
    display: inline-flex;
    align-items: center;

    a {
      position: relative;
      width: $space-24;
      height: $space-24;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;

      &[href*='linkedin'] {
        @include linkedin($yellow);
        background-size: 12px 12px;
      }

      &[href*='instagram'] {
        @include instagram($yellow);
        background-size: 14px 14px;
      }
    }
  }

  @include respond-to($tablet) {
    margin-left: -4px;
    margin-top: $space-16;

    li {
      margin-right: $space-8;

      a {
        width: $space-24;
        height: $space-24;

        &[href*='linkedin'] {
          background-size: 14px 14px;
        }

        &[href*='instagram'] {
          background-size: 16px 16px;
        }
      }
    }
  }
}
</style>
