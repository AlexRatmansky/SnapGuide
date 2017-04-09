<template>
  <div :class="{
        [$style.GuideSizer]: true,
        [$style.vertical]: isVertical,
        [$style.horizontal]: !isVertical
       }"
       :style="{
        [isVertical ? 'left' : 'top']: position + 'px',
        [isVertical ? 'width': 'height']: size + 'px'
       }"
  >

    <div :class=$style.GuideSizerBox></div>

    <div :class=$style.label>{{size}}</div>

  </div>
</template>

<script>
  export default {
    name: 'GuideSizer',
    props: {
      position: Number,
      size: Number,
      isVertical: Boolean
    }
  };
</script>

<style module>
  .GuideSizer {
    position: absolute;
  }

  .GuideSizer.horizontal {
    left: 20px;
    width: 1px;
  }

  .GuideSizer.vertical {
    top: 20px;
    height: 1px;
  }

  .GuideSizerBox {
    z-index: 9998;
    width: 100%;
    height: 100%;
    background-color: magenta;
    position: relative;
  }

  .horizontal .GuideSizerBox {}
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

  .vertical .GuideSizerBox {}
  .vertical .GuideSizerBox::before {
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
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border: 1px solid #BD10E0;
    border-radius: 3px;
    background: white;
    padding: 0 5px;
    z-index: 99999;
  }

  .horizontal .label {}
  .vertical .label {}

</style>