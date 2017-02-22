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
    background-color: #e62ee6;
    top: 50%;
    left: 50%;
    z-index: 100;
    pointer-events: none;
  }

  .label {
    position: absolute;
    background: #BD10E0 linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1));
    color: #fff;
    border-radius: 2px;
    padding: 5px;
  }

  .guide.vertical {
    width: 1px;
    top: 0;
    height: 100%;
  }

  .vertical .label {
    position: sticky;
    display: inline-block;
    top: 5px;
    left: 0;
    transform: translateX(-50%);
  }

  .guide.horizontal {
    left: 0;
    height: 1px;
    width: 100%;
  }

  .horizontal .label {
    left: 5px;
    top: 0;
    transform: translateY(-50%);
  }
</style>