<template>
  <div :class=$style.legendBoard>
    <div :class=$style.textLine><code>V</code> - add vertical rule</div>
    <div :class=$style.textLine><code>H</code> - add horisontal rule</div>
    <div :class=$style.textLine><code>Q</code> - remove all guides</div>
    <div :class=$style.textLine><code>←</code>,<code>↑</code>,<code>→</code>,<code>↓</code>
      - move cursor 1px (+<code>Shift</code> 10px)
    </div>
    <div :class=$style.textLine><code>ESC</code> - toggle visibility</div>
    <div :class=$style.textLine><code>Space</code> - toggle help</div>
  </div>
</template>

<script>
  export default {
    name: 'SG_Legend'
  };
</script>

<style lang="stylus" module>
  .legendBoard {
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

  .legendBoard code {
    background: #fff;
    color: #000;
    border-radius: 2px;
    margin: 0 2px;
    padding: 3px 6px 2px !important;
  }
</style>