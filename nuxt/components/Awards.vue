<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="content">
            <ul class="h3">
              <li>FWA — FOTD &times; <span class="h3-alt">23</span></li>
              <li>FWA — FOTM &times; <span class="h3-alt">1</span></li>
              <li>Awwwards — SOTD &times; <span class="h3-alt">24</span></li>
              <li>Awwwards — SOTM &times; <span class="h3-alt">1</span></li>
              <li>Webby Nominations &times; <span class="h3-alt">11</span></li>
              <li>Webby People’s Voice Winner &times; <span class="h3-alt">1</span></li>
              <li>The One Show Gold Pencil &times; <span class="h3-alt">1</span></li>
            </ul>
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
section.awards {
  .inner {
    .gutter {
      .container {
        .content {
          ul {
            line-height: 1.2em;

            li {
              .h3-alt {
                color: $yellow;
              }
            }
          }
        }
      }
    }
  }
}
</style>
