<template>
  <div :class="{[$style.guide]: true, [$style.vertical]: isVertical, [$style.horizontal]: !isVertical }"
       :style="{ left: xPos + 'px', top: yPos + 'px'}"
  ></div>
</template>

<script>
  export default {
    name: 'GuideItem',
    props: ['isVertical', 'yPos', 'xPos']
  };
</script>

<style module>
  .guide {
    display: block;
    position: absolute;
    background-color: green;
    top: 50%;
    left: 50%;
    z-index: 100;
    pointer-events: none;
  }

  .guide.vertical {
    width: 1px;
    top: 0;
    height: 100%;
  }

  .guide.horizontal {
    left: 0;
    height: 1px;
    width: 100%;
  }
</style>