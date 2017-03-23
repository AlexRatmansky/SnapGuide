<template>
  <div :class=$style.GuideSizer
       :style="{
         left: position + 'px',
         width: width + 'px'
       }"
  >

    <div :class=$style.GuideSizerBox ></div>
    <div :class=$style.label>
      {{width}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GuideSizer',
    props: {
      position: Number,
      width: Number
    }
  };
</script>

<style module>
  .GuideSizer {
    position: absolute;
    height: 1px;
    top: 100px;
  }

  .GuideSizerBox {
    z-index: 9998;
    width: 100%;
    height: 100%;
    background-color: magenta;
    position: relative;
  }

  .label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translatey(-50%);
    border: 1px solid red;
    border-radius: 3px;
    background: white;
    padding: 0 5px;
    z-index: 99999;
  }
</style>