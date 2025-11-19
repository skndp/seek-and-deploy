<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="content">
            <ul class="h3">
              <li>FWA — FOTD &times; <span>23</span></li>
              <li>FWA — FOTM &times; <span>1</span></li>
              <li>Awwwards — SOTD &times; <span>24</span></li>
              <li>Awwwards — SOTM &times; <span>1</span></li>
              <li>Webby Nominations &times; <span>11</span></li>
              <li>Webby People’s Voice Winner &times; <span>1</span></li>
              <li>The One Show Gold Pencil &times; <span>1</span></li>
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
            line-height: 1.8em;

            li {
              span {
                color: $yellow;
                font-weight: 800;
              }
            }
          }
        }
      }
    }
  }
}
</style>
