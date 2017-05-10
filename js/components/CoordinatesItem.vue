<template>
  <div :class=$style.coordinatesContainer
       :style="{
           left: cursorPos.x + 10 + 'px',
           top: cursorPos.y + 10 + 'px'
         }"
  >
    <div :class=$style.coordinatesBox>
      <div :class=$style.horPosition>{{ cursorPos.x }}</div>
      <div :class=$style.vertPosition>{{ cursorPos.y }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CoordinatesItem',
    props: ['cursorPos']
  };
</script>

<style lang="stylus" module>
  .coordinatesContainer {
    position: absolute;
  }

  .coordinatesBox {
    white-space: nowrap;
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 1px 5px 0;
    border: 1px solid #BD10E0;
    background: #fff;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
    color: #000;
    border-radius: 2px;
    z-index: 9999;
  }

  .coordinatesBox div {
    padding-left: 16px;
    font-size: 10px;
  }

  .horPosition {
    background: url(../../img/sizing-hor.svg) no-repeat left center;
  }
  .vertPosition {
    background: url(../../img/sizing-vert.svg) no-repeat left center;
  }

</style>