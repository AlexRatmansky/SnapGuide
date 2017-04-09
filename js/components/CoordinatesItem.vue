<template>
  <div :class=$style.coordinatesContainer
       :style="{
           left: cursorPos.x + 10 + 'px',
           top: cursorPos.y + 10 + 'px'
         }"
  >
    <div :class=$style.coordinatesBox>
      <div>x: {{ cursorPos.x }}</div>
      <div>y: {{ cursorPos.y }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CoordinatesItem',
    props: ['cursorPos']
  };
</script>

<style module>
  .coordinatesContainer {
    position: absolute;
    pointer-events: none;
  }

  .coordinatesBox {
    white-space: nowrap;
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 1px 5px 0;
    border: 2px solid #BD10E0;
    background: #fff;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
    color: #000;
    border-radius: 4px;
    z-index: 9999;
  }
</style>