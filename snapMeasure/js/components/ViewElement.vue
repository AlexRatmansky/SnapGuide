<template>
  <div class="element"
       :style="{
      top: elementProps.top,
      left: elementProps.left,
      width: elementProps.width,
      height: elementProps.height
      }"
  ></div>
</template>

<script>
  export default {
    name: 'ViewElement',
    props: ['elementProps']
  };
</script>

<style>
  .element {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    background: rgba(255, 0, 0, 0.3);
    pointer-events: none;
  }
</style>