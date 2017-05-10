<template>
  <div
    :class="$style.element"
    :style="{
      top: elementProps.top - this.scrollPosition.scrollTop + 'px',
      left: elementProps.left - this.scrollPosition.scrollLeft + 'px',
      width: elementProps.width + 'px',
      height: elementProps.height + 'px'
    }"
  >
    <div
      :class="$style.paddingBox"
      :style="{
        top: elementProps.style && elementProps.style.paddingTop || 0,
        left: elementProps.style && elementProps.style.paddingLeft || 0,
        right: elementProps.style && elementProps.style.paddingRight || 0,
        bottom: elementProps.style && elementProps.style.paddingBottom || 0
      }"
    ></div>
  </div>
</template>

<script>
  export default {
    name: 'SG_ElementHighlighter',
    props: {
      elementProps: Object,
      scrollPosition: Object
    }
  };
</script>

<style lang="stylus" module>
  .element {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    background: rgba(255, 0, 0, 0.1);
  }

  .paddingBox {
    position: absolute;
    background: green;
    opacity: 0.3;
  }
</style>