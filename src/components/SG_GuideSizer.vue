<template>
  <div :class="{
        [$style.GuideSizer]: true,
        [$style.vertical]: isVertical,
        [$style.horizontal]: !isVertical,
        [$style.active]: isActive
       }"
       :style=cssStyle
  >

    <div :class=$style.GuideSizerBox></div>

    <div :class=$style.inlineLabel>{{size}}</div>
    <div :class=$style.label>{{size}}</div>

  </div>
</template>

<script>
export default {
  name: 'SG_GuideSizer',
  props: {
    start: Number,
    end: Number,
    isVertical: Boolean,
    cursorPosition: Number,
    scrollPosition: {
      type: Object,
      default: function() {
        return {
          scrollTop: 0,
          scrollLeft: 0
        };
      }
    }
  },
  computed: {
    cssStyle: function() {
      let styleObject = {};

      if (this.isVertical) {
        styleObject['left'] =
          this.start - this.scrollPosition.scrollLeft + 'px';
        styleObject['width'] = this.end - this.start + 'px';
      } else {
        styleObject['top'] = this.start - this.scrollPosition.scrollTop + 'px';
        styleObject['height'] = this.end - this.start + 'px';
      }

      return styleObject;
    },

    isActive: function() {
      const cursorPos = this.isVertical
        ? this.cursorPosition + this.scrollPosition.scrollLeft
        : this.cursorPosition + this.scrollPosition.scrollTop;

      return this.start <= cursorPos && this.end > cursorPos;
    },

    size: function() {
      return this.end - this.start;
    }
  }
};
</script>

<style lang="less" module>
@size: 8px;

.GuideSizer {
  position: absolute;
  z-index: 999998;
  opacity: 0.3;

  &.active {
    opacity: 1;
  }

  &.horizontal {
    left: 0;
    width: @size;
  }

  &.vertical {
    top: 0;
    height: @size;
  }
}

.GuideSizerBox {
  z-index: 9997;
  width: 100%;
  height: 100%;
  background-color: magenta;
  position: relative;

  .horizontal & {
  }

  .vertical & {
  }
}

.label {
  position: absolute;
  font-size: 10px;
  line-height: 10px;
  top: 50%;
  left: 50%;
  border: 1px solid #bd10e0;
  border-radius: 3px;
  background: white;
  padding: 2px 3px 1px;
  z-index: 99999;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;

  .horizontal & {
    left: 0;
    opacity: 0;
    transform: translateX(0) translateY(-50%);
  }

  .horizontal.active & {
    transform: translateX(10px) translateY(-50%);
    opacity: 1;
  }

  .vertical & {
    top: 0;
    opacity: 0;
    transform: translateX(-50%) translateY(0);
  }

  .vertical.active & {
    transform: translateX(-50%) translateY(10px);
    opacity: 1;
  }
}

.inlineLabel {
  position: absolute;
  font-size: 6px;
  line-height: 1;
  top: 50%;
  left: 50%;
  color: #fff;
  z-index: 99999;

  .horizontal & {
    left: 0;
    transform: translateY(-50%) rotate(-90deg);
  }

  .vertical & {
    top: 0;
    transform: translateX(-50%);
  }
}
</style>