<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="content">
            <ul class="h3">
              <li>FWA — FOTD <span class="x">&times;</span> <span class="n">23</span></li>
              <li>FWA — FOTM <span class="x">&times;</span> <span class="n">1</span></li>
              <li>Awwwards — SOTD <span class="x">&times;</span> <span class="n">24</span></li>
              <li>Awwwards — SOTM <span class="x">&times;</span> <span class="n">1</span></li>
              <li>Webby Nominations <span class="x">&times;</span> <span class="n">11</span></li>
              <li>Webby People’s Voice Winner <span class="x">&times;</span> <span class="n">1</span></li>
              <li>The One Show Gold Pencil <span class="x">&times;</span> <span class="n">1</span></li>
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
  .slide-4-next &,
  .slide-4-active & {
    .inner {
      .gutter {
        .container {
          .content {
            ul {
              li {
                opacity: 1;
                transform: translateY(0%);

                @for $i from 1 through 7 {
                  &:nth-child(#{$i}) {
                    transition: transform $speed-666 #{333 + ($i * 111)}ms $ease-out, opacity $speed-666 #{333 + ($i * 111)}ms $ease-out;

                    span.n {
                      animation: pop $speed-333 #{666 + ($i * 111)}ms $ease-out forwards;
                    }
                  }
                }

                @keyframes pop {
                  0%, 100% {
                    transform: scale(1);
                  }
                  33.333% {
                    transform: scale(1.333);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .inner {
    .gutter {
      .container {
        .content {
          ul {
            line-height: 1.8em;

            li {
              display: flex;
              align-items: center;
              opacity: 0;
              transform: translateY(50%);

              @for $i from 1 through 7 {
                &:nth-child(#{$i}) {
                  transition: transform $speed-666 $ease-out, opacity $speed-666 $ease-out;
                }
              }

              span.x {
                margin: 0 0.4em;
                display: inline-flex;
                flex-shrink: 0;
              }

              span.n {
                color: $yellow;
                font-weight: 600;
                display: inline-flex;
                flex-shrink: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
