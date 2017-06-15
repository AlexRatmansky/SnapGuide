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
        default: function () {
          return {
            scrollTop: 0,
            scrollLeft: 0
          }
        },
      }
    },
    computed: {

      cssStyle: function () {
        let styleObject = {};
        let startPointProperty = this.isVertical ? 'left' : 'top';
        let sizeProperty = this.isVertical ? 'width' : 'height';

        if (this.isVertical) {
          styleObject[startPointProperty] = this.start - this.scrollPosition.scrollLeft + 'px';
          styleObject[sizeProperty] = this.end - this.start + 'px';
        } else {
          styleObject[startPointProperty] = this.start - this.scrollPosition.scrollTop + 'px';
          styleObject[sizeProperty] = this.end - this.start + 'px';
        }

        return styleObject
      },

      isActive: function () {
        return this.start <= this.cursorPosition && this.end > this.cursorPosition;
      },

      size: function () {
        return this.end - this.start
      }
    }
  };
</script>

<style lang="stylus" module>
  $size = 5px

  .GuideSizer {
    position: absolute;
    z-index: 9998;
    opacity: 0.3;
  }

  .GuideSizer.horizontal {
    left: 0;
    width: $size;
  }

  .GuideSizer.vertical {
    top: 0;
    height: $size;
  }

  .GuideSizerBox {
    z-index: 9997;
    width: 100%;
    height: 100%;
    background-color: magenta;
    position: relative;
  }

  .horizontal .GuideSizerBox {
  }

  .horizontal .GuideSizerBox::before {
    content: '';
    display: block;
    position: absolute;
    width: 7px;
    height: 10px;
    top: 0;
    left: -3px;
    background: url(../../img/sizing-arrow-vert.svg);
  }

  .horizontal .GuideSizerBox::after {
    content: '';
    display: block;
    position: absolute;
    width: 7px;
    height: 10px;
    bottom: 0;
    left: -3px;
    background: url(../../img/sizing-arrow-vert.svg);
    transform: scaleY(-1);
  }

  .vertical .GuideSizerBox {
  }

  .vertical .GuideSizerBox::before {
    z-index: 9998;
    content: '';
    display: block;
    position: absolute;
    width: 10px;
    height: 7px;
    left: 0;
    top: -3px;
    background: url(../../img/sizing-arrow-hor.svg);
  }

  .vertical .GuideSizerBox::after {
    content: '';
    display: block;
    position: absolute;
    width: 10px;
    height: 7px;
    right: 0;
    top: -3px;
    background: url(../../img/sizing-arrow-hor.svg);
    transform: scaleX(-1);
  }

  .label {
    position: absolute;
    font-size: 10px;
    line-height: 10px;
    top: 50%;
    left: 50%;
    border: 1px solid #BD10E0;
    border-radius: 3px;
    background: white;
    padding: 2px 3px 1px;
    z-index: 99999;
  }

  .horizontal .label {
    left: 0;
    transform: translateY(-50%);
  }

  .vertical .label {
    top: 0;
    transform: translateX(-50%) translateY(-50%);
  }

  .active {
    opacity: 1;
  }

</style>