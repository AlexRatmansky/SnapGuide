<template>
  <div :class=$style.legend>
    <div :class=$style.textLine><code>V</code> - add vertical rule</div>
    <div :class=$style.textLine><code>H</code> - add horisontal rule</div>
    <div :class=$style.textLine><code>←</code>,<code>↑</code>,<code>→</code>,<code>↓</code> - move cursor 1px direction (+<code>Shift</code> 10px)</div>
  </div>
</template>

<script>
  export default {
    name: 'Legend'
  };
</script>

<style module>
  .legend {
    pointer-events: none;
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 10px 20px;
    border-radius: 3px 0 0 0;
    background: #000000;
    color: #ffffff;
    max-width: 300px;
  }

  .textLine {
    line-height: 2;
  }

  .legend code {
    background: #ffffff;
    color: #000000;
    border-radius: 2px;
    margin: 0 2px;
  }
</style>