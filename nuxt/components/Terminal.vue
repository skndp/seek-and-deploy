<template>
  <div id="terminal">
    <span id="line-0">&gt; <span id="text">{{ text }}</span><span id="cursor">_</span></span>
  </div>
</template>

<script setup>
const text = ref('');
const messages = [
        'seek and deploy',
        '',
        'reach out, we can help'
      ];
const quotes = [
        "initializing v1.0 / new horizon",
        "setec astronomy ... too many secrets",
        "follow the white rabbit",
        "don't solve with more, solve with less",
        "spot, you are disrupting my ability to work",
        "i will design the perfect system",
        "the matrix has got you",
        "what will your first sequence of the day be?"
      ];
let delay = 120;
let step = 0;
let message = 0;
let letters = messages.map((el) => el.split(''));

onMounted(() => {
  go();
})

function go() {
  text.value = letters[message].slice(0, step).join('');

  if(step <= letters[message].length) {
    delay = 120;
    step += 1;
  } else {
    step = 0;
    delay = 2000;
    letters[1] = quotes[Math.floor(Math.random() * quotes.length)].split('');

    if(message < messages.length - 1) message += 1;
    else message = 0;
  }

  setTimeout(() => {
    go();
  }, delay);
}
</script>

<style lang="scss">
#terminal {
  height: 100%;
  #line-0 {
    font: normal normal bold 12px/12px Courier, monospace;
    color: rgba($white, 0.33);

    #cursor {
      animation: cursor 1s step-start 0s infinite;
    }
  }

  @include respond-to($large-tablet) {
    #line-0 {
      font: normal normal bold 14px/14px Courier, monospace;
    }
  }
}

@keyframes cursor {
  50% {
    opacity: 0;
  }
}
</style>
