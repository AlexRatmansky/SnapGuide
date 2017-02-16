<template>
  <div :class="{[$style.guide]: true, [$style.vertical]: isVertical, [$style.horizontal]: !isVertical }"
       :style="{ left: xPos + 'px', top: yPos + 'px'}"
  >
    <div :class=$style.label>
      <template v-if=isVertical>{{xPos}}</template>
      <template v-else>{{yPos}}</template>
    </div>
  </div>
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

  .label {
    position: absolute;
    background: green;
    padding: 5px;
    color: yellow;
  }

  .guide.vertical {
    width: 1px;
    top: 0;
    height: 100%;
  }

  .vertical .label {
    top: 0;
    left: 1px;
  }

  .guide.horizontal {
    left: 0;
    height: 1px;
    width: 100%;
  }

  .horizontal .label {
    left: 0;
    top: 1px;
  }
</style>