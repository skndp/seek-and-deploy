<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="content">
            <div class="cols">
              <div class="col">
                <div class="image-holder">
                  <img :src="'/images/matt-wiggins-profile.jpg'" alt="Matt Wiggins - Profile Photo" />
                </div>
                <h3 class="h3">Matt Wiggins</h3>
                <p class="fs-sm">Founder / Director. Worked with Laika, Coca-Cola, Dominos, Diesel, Airwalk, Weiden + Kennedy, and so much more. 15+ years of crushin’ code and slammin’ beers.</p>
              </div>
              <div class="col">
                <div class="image-holder">
                  <img :src="'/images/keith-driessen-profile.jpg'" alt="Keith Driessen - Profile Photo" />
                </div>
                <h3 class="h3">Keith Driessen</h3>
                <p class="fs-sm">Worked at BKWLD, Legwork Studio, freelanced for 7 years, Consume & Create, and now Seek and Deploy. 15+ years of code and a lifetime horror fanatic.</p>
              </div>
            </div>
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
section.team {
  .inner {
    .gutter {
      .container {
        .content {
          .cols {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: $space-16;

            .col {
              display: flex;
              flex-direction: column;

              .image-holder {
                position: relative;
                width: 100%;
                aspect-ratio: 5/7;
                background-color: #272727;
                overflow: hidden;
                display: flex;
                flex-shrink: 0;

                img {
                  @include abs-fill;
                  object-fit: cover;
                  object-position: 50% 50%;
                }
              }

              .h3 {
                margin-top: $space-16;
                line-height: 1em;
              }

              .fs-sm {
                margin-top: $space-16;
                line-height: 1.4em;
              }
            }
          }
        }
      }
    }
  }

  @include respond-to($tablet) {
    .inner {
      .gutter {
        .container {
          .content {
            .cols {
              column-gap: $space-32;

              .col {
                .image-holder {
                  position: relative;
                  width: 100%;
                  aspect-ratio: 1/1;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
