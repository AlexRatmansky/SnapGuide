<template>
  <div
    :class='$style.element'
    :style=borderBox >
    <div
      :class='$style.paddingBox'
      :style=paddingBox
    ></div>
  </div>
</template>

<script>
  export default {
    name: 'SG_ElementHighlighter',
    props: {
      elementProps: Object,
      scrollPosition: Object
    },
    computed: {
      borderBox: function () {
        return {
          top: this.elementProps.top - this.scrollPosition.scrollTop + 'px',
          left: this.elementProps.left - this.scrollPosition.scrollLeft + 'px',
          width: this.elementProps.width + 'px',
          height: this.elementProps.height + 'px'
        };
      },
      paddingBox: function () {
        return this.elementProps.style && {
            top: this.elementProps.style.paddingTop || 0,
            left: this.elementProps.style.paddingLeft || 0,
            right: this.elementProps.style.paddingRight || 0,
            bottom: this.elementProps.style.paddingBottom || 0
          };
      }
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