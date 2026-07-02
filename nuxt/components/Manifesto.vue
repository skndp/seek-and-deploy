<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="content">
            <h3 class="h3" ref="textRef">
              We’re former members of the <span class="u">Legwork</span> interactive team specializing in <span class="u">innovative</span> web design, development, and digital experiences. With over <span class="u">25 years</span> of experience building notable websites for global brands like <span class="u">Google</span>, <span class="u">Nike</span>, and <span class="u">Coca-Cola</span>, we have a diverse skill set that can match almost <span class="u">any challenge</span>. Leveraging AI, we work <span class="u">faster</span> and <span class="u">more efficient</span> than ever to design and develop immersive digital experiences that demand <span class="u">creativity</span>, <span class="u">precision</span>, and <span class="u">serious</span> technical firepower. If your brand needs more than a template, we’re the Denver-based creative technology partner that can bring it to life.
            </h3>
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

const textRef = ref(null);

function setUnderlineDelays() {
  textRef.value?.querySelectorAll('span.u').forEach((span, index) => {
    span.style.setProperty('--u-delay', `${333 + ((index + 1) * 111)}ms`);
  });
}

onMounted(() => {
  setUnderlineDelays();
});
</script>

<style lang='scss'>
section.manifesto {
  .slide-1-next &,
  .slide-1-active & {
    opacity: 1;

    .inner {
      .gutter {
        .container {
          .content {
            .h3 {
              span.u {
                text-decoration-color: rgba($yellow, 1);
                text-underline-offset: 0.1em;
                transition-delay: var(--u-delay);
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
          .h3 {
            span.u {
              --u-delay: 0ms;
              position: relative;
              text-decoration: underline;
              text-decoration-color: rgba($yellow, 0);
              text-decoration-thickness: 2px;
              text-underline-offset: 0.4em;
              transition: text-decoration-color $speed-666 $ease-out, text-underline-offset $speed-666 $ease-out;
              transition-delay: 0ms;
            }
          }
        }
      }
    }
  }

  @include respond-to($large-tablet) {
    .inner {
      .gutter {
        .container {
          .content {
            .h3 {
              span.u {
                text-decoration-thickness: 3px;
              }
            }
          }
        }
      }
    }
  }

}
</style>
