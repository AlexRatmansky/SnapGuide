<template>
  <div :class=$style.coordinatesBoxContainer
       :style=cssStyle
  >
    <div :class=$style.coordinatesBox>
      <div :class=$style.horPosition>{{ cursorPos.x }}</div>
      <div :class=$style.vertPosition>{{ cursorPos.y }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SG_CoordinatesBox',
  props: {
    cursorPos: Object,
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

      styleObject.left =
        this.cursorPos.x - this.scrollPosition.scrollLeft + 'px';
      styleObject.top = this.cursorPos.y - this.scrollPosition.scrollTop + 'px';

      return styleObject;
    }
  }
};
</script>

<style lang="less" module>
.coordinatesBoxContainer {
  position: absolute;
}

.coordinatesBox {
  white-space: nowrap;
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 3px 5px 1px;
  border: 1px solid #bd10e0;
  background: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
  color: #000;
  border-radius: 2px;
  z-index: 999999;
}

.coordinatesBox div {
  padding-left: 16px;
  font-size: 10px;
  line-height: 14px;
}

.horPosition {
  background: url("../../img/sizing-hor.svg") no-repeat left 40%;
}

.vertPosition {
  background: url("../../img/sizing-vert.svg") no-repeat left center;
}
</style>