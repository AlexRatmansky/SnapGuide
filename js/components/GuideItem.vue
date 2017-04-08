<template>
  <div :class="{
          [$style.guide]: true,
          [$style.vertical]: isVertical,
          [$style.horizontal]: !isVertical
       }"
       :style="{
          left: xPos - (!crossGuide && scrollPosition.scrollLeft) + 'px',
          top: yPos - (!crossGuide && scrollPosition.scrollTop) + 'px'
       }"
  >
    <div :class=$style.label>
      <template v-if=isVertical>{{xPos + (crossGuide && scrollPosition.scrollLeft)}}</template>
      <template v-else>{{yPos + (crossGuide && scrollPosition.scrollTop)}}</template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GuideItem',
    props: {
      isVertical: Boolean,
      yPos: Number,
      xPos: Number,
      previousGuide: {
        type: Number,
        default: -1,
      },
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
      fromPrevious: function () {
        if (this.isVertical) {
          return this.xPos - this.previousGuide;
        } else {
          return this.yPos - this.previousGuide;
        }
      }
    }
  };
</script>

<style module>
  .guide {
    position: fixed;
    display: block;
    top: 50%;
    left: 50%;
    background-color: #e62ee6;
    pointer-events: none;
    z-index: 9998;
  }

  .label {
    position: absolute;
    display: inline-block;
    padding: 1px 3px 0;
    border: 1px solid #BD10E0;
    background: #fff;
    box-shadow: 0 5px 5px -4px rgba(0, 0, 0, 0.25);
    color: #000;
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
    border-radius: 0 0 3px 3px;
    transform: translateX(-50%);
  }

  .guide.horizontal {
    left: 0;
    width: 100%;
    height: 1px;
  }

  .horizontal .label {
    top: 0;
    left: 0;
    border-left-width: 0;
    border-radius: 0 3px 3px 0;
    transform: translateY(-50%);
  }
</style>