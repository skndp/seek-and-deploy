<template>
  <div id="news">
    <div id="news-foreground">
      <!-- <img src="/images/tv.png" alt="A TV from the ancient times displaying our latest news." /> -->
    </div>
  </div>
</template>

<script setup>
onMounted(() => {
});
</script>

<style lang="scss">
#news {
  aspect-ratio: 16/9;

  #news-foreground {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
