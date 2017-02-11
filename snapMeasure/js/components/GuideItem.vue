<template>
  <div class="guide"
       :class="{ '-v': isVertical, '-h': !isVertical }"
       :style="{ left: xPos + 'px', top: yPos + 'px'}"
  ></div>
</template>

<script>
  export default {
    name: 'GuideItem',
    props: ['isVertical', 'yPos', 'xPos']
  };
</script>

<style>
  .guide {
    display: block;
    position: absolute;
    background-color: green;
    top: 50%;
    left: 50%;
    z-index: 100;
    pointer-events: none;
  }

  .guide.-v {
    width: 1px;
    top: 0;
    height: 100%;
  }

  .guide.-h {
    left: 0;
    height: 1px;
    width: 100%;
  }
</style>