<template>
  <div
    :class="$style.element"
    :style="{
      top: elementProps.top + 'px',
      left: elementProps.left + 'px',
      width: elementProps.width + 'px',
      height: elementProps.height + 'px'
    }"
  >
    <div
      :class="$style.paddingBox"
      :style="{
        top: elementProps.style.paddingTop || 0,
        left: elementProps.style.paddingLeft || 0,
        right: elementProps.style.paddingRight || 0,
        bottom: elementProps.style.paddingBottom || 0
      }"
    ></div>
  </div>
</template>

<script>
  export default {
    name: 'ViewElement',
    props: ['elementProps']
  };
</script>

<style module>
  .element {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    background: rgba(255, 0, 0, 0.1);
    pointer-events: none;
  }

  .paddingBox {
    position: absolute;
    background: green;
    opacity: 0.3;
    pointer-events: none;
  }
</style>