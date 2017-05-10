<template>
  <div :class="{
          [$style.guide]: true,
          [$style.vertical]: isVertical,
          [$style.horizontal]: !isVertical,
          [$style.crossGuide]: crossGuide
       }"
       :style=styleObj
  >
    <div :class=$style.label>
      <template v-if=isVertical>{{position + (crossGuide && scrollPosition.scrollLeft)}}</template>
      <template v-else>{{position + (crossGuide && scrollPosition.scrollTop)}}</template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SG_Guide',
    props: {
      isVertical: Boolean,
      position: Number,
      crossGuide: {
        type: Boolean,
        default: false,
      },
      scrollPosition: {
        type: Object,
        default: function () {
          return {
            scrollTop: 0,
            scrollLeft: 0
          }
        },
      }
    },
    computed: {
      styleObj: function () {
        let styleObject = {};

        if (this.isVertical) {
          styleObject.left = this.position - (!this.crossGuide && this.scrollPosition.scrollLeft) + 'px';

        } else {
          styleObject.top = this.position - (!this.crossGuide && this.scrollPosition.scrollTop) + 'px';
        }

        return styleObject;
      }
    }

  };
</script>

<style lang="stylus" module>
  .guide {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    background-color: #e62ee6;
    z-index: 9998;
  }

  .crossGuide {
    opacity: 0.5;
    background-color: #ff0000;
  }

  .label {
    position: absolute;
    display: inline-block;
    padding: 1px 3px 0;
    background: #BD10E0;
    box-shadow: 0 5px 5px -4px rgba(0, 0, 0, 0.25);
    color: #ffffff;
    font-size: 8px;
    line-height: 11px;
  }

  .guide.vertical {
    top: 0;
    width: 1px;
    height: 100%;
  }

  .vertical .label {
    top: 0;
    left: 0;
    border-top-width: 0;
    border-radius: 0 0 2px 2px;
    transform: translateX(-50%);
  }

  .guide.horizontal {
    left: 0;
    width: 100%;
    height: 1px;
  }

  .horizontal .label {
    top: 0;
    left: 10px;
    border-left-width: 0;
    border-radius: 0 2px 2px 0;
    /*transform: translateY(50%);*/
  }
</style>