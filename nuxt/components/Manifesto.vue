<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="content">
            <h3 ref="textRef" class="h3">We build <span class="u">interfaces</span>, <span class="u">experiences</span> and all of the underlying things that make them work. We believe that what matters the most is attention to <span class="u">detail</span>, building things people <span class="u">enjoy</span> and doing work that <span class="u">stands out</span>. We are <span class="u">fast</span>, <span class="u">efficient</span> and <span class="u">stand by</span> the work we do. In an era where AI can build a website in ten minutes, we're looking for partners that still want something <span class="u">human</span>. If you are looking for something built and maintained by <span class="u">experts</span> who have a <span class="u">deep knowledge</span> of how it works, let's discuss your project.</h3>
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
let resizeHandler = null;
let resizeTimeout = null;
let originalHtml = null;

function wrapLines() {
  const el = textRef.value;
  if (!el) return;

  // Restore original HTML for fresh measurement
  if (originalHtml !== null) {
    el.innerHTML = originalHtml;
  } else {
    originalHtml = el.innerHTML;
  }

  // Clone element for measurement
  const clone = el.cloneNode(true);
  clone.style.visibility = "hidden";
  clone.style.position = "absolute";
  clone.style.pointerEvents = "none";
  clone.style.whiteSpace = "normal";
  clone.style.width = el.offsetWidth + "px";
  clone.style.left = "-9999px";
  clone.style.top = "0";
  document.body.appendChild(clone);

  // Build measurement units
  const units = [];
  clone.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      // split text into words
      node.textContent.split(/\s+/).filter(Boolean).forEach(word => {
        units.push({ type: "text", text: word });
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // <span class="u"> treated as a single unit
      const text = node.textContent.trim();
      if (text.length) units.push({ type: "u", text });
    }
  });

  // Rebuild clone for measurement
  clone.innerHTML = "";
  const measureSpans = units.map(u => {
    const span = document.createElement("span");
    span.textContent = u.text + " "; // trailing space
    span.className = u.type === "u" ? "u measure-word" : "measure-word";
    clone.appendChild(span);
    return { el: span, type: u.type, text: u.text };
  });

  // Detect line breaks
  const lines = [];
  let currentLine = [];
  let lastTop = null;

  measureSpans.forEach(mu => {
    const top = mu.el.offsetTop;
    if (lastTop === null) lastTop = top;
    if (top !== lastTop) {
      lines.push(currentLine);
      currentLine = [];
      lastTop = top;
    }
    currentLine.push(mu);
  });
  if (currentLine.length) lines.push(currentLine);

  // Remove clone
  document.body.removeChild(clone);

  // Build final HTML: simpler, no per-character checks
  const finalHtml = lines
    .map(lineUnits => {
      return `<span class="line">` + lineUnits.map(mu => {
        return mu.type === "u"
          ? `<span class="u">${mu.text}</span>`
          : mu.text;
      }).join(' ') + `</span>`;
    })
    .join('');

  el.innerHTML = finalHtml.replace(/\s+([.,!?;:])/g, '$1');;
}

onMounted(() => {
  wrapLines();

  resizeHandler = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => wrapLines(), 27);
  };
  window.addEventListener("resize", resizeHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
  clearTimeout(resizeTimeout);
});
</script>

<style lang='scss'>
section.manifesto {
  $lines: 20; // arbitrary, just use more than needed to cover enough lines rippling in

  .slide-1-next &,
  .slide-1-active & {
    opacity: 1;

    .inner {
      .gutter {
        .container {
          .content {
            .h3 {
              span.line {
                opacity: 1;
                transform: translateY(0%);

                @for $i from 1 through $lines {
                  &:nth-child(#{$i}) {
                    transition: transform $speed-666 #{333 + ($i * 111)}ms $ease-out, opacity $speed-666 #{333 + ($i * 111)}ms $ease-out;

                    span.n {
                      animation: pop $speed-333 #{666 + ($i * 111)}ms $ease-out forwards;
                    }
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
          .h3 {
            span.line {
              display: block;
              opacity: 0;
              transform: translateY(50%);

              @for $i from 1 through $lines {
                &:nth-child(#{$i}) {
                  transition: transform $speed-666 $ease-out, opacity $speed-666 $ease-out;
                }
              }
            }

            span.measure-word {
              display: inline-block;
              white-space: nowrap;
            }

            span.u {
              position: relative;
              text-decoration: underline;
              text-decoration-color: $yellow;
              text-decoration-thickness: 2px;
              text-underline-offset: 0.1em;
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
