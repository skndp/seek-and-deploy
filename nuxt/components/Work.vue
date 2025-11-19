<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="content">
            <ul class="h3-lg">
              <li v-for="(project, index) in work">{{ project.title }}</li>
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

const work = [
  {
    title: "15 Years of Dunk"
  },
  {
    title: "Domino’s + IFTTT"
  },
  {
    title: "Tuck Effect"
  },
  {
    title: "Clayton Cotterell"
  },
  {
    title: "Legwork is Dead"
  }
];
</script>

<style lang='scss'>
section.work {
  .inner {
    .gutter {
      .container {
        .content {
          ul {
            line-height: 1.6em;

            li {
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}
</style>
