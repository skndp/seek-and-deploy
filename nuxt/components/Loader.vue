<template>
  <div id="loader" />
</template>

<style lang='scss'>
#loader {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: $black;
  overflow: hidden;
  z-index: 27;

  &.loading-enter-active,
  &.loading-leave-active {
    transition: opacity 1s $evil-ease;
  }

  &.loading-enter-from,
  &.loading-leave-to {
    opacity: 0;
  }
}
</style>
