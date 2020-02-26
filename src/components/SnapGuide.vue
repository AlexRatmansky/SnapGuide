<template>
  <div inert v-if="showApp" :class="$style.snapGuide">
    <SG_Guide :is-vertical="true" :position="crossPos.x" :cross-guide="true" />
    <SG_Guide :is-vertical="false" :position="crossPos.y" :cross-guide="true" />

    <transition-group name="list_vert" tag="div">
      <SG_Guide
        v-for="guidePos in verticalGuides"
        :key="guidePos.position"
        :position="guidePos.position"
        :is-vertical="true"
      />
    </transition-group>

    <transition-group name="list_hor" tag="div">
      <SG_Guide
        v-for="guidePos in horizontalGuides"
        :key="guidePos.position"
        :position="guidePos.position"
        :is-vertical="false"
      />
    </transition-group>

    <SG_CoordinatesBox />

    <SG_ElementHighlighter :element-props="elem" />

    <SG_Legend v-if="showLegend" />
  </div>
</template>

<script>
import SG_Guide from './SG_Guide.vue';
import SG_ElementHighlighter from './SG_ElementHighlighter.vue';
import SG_CoordinatesBox from './SG_CoordinatesBox.vue';
import SG_Legend from './SG_Legend.vue';

export default {
  name: 'App',

  computed: {
    cursorPos() {
      return this.$store.state.cursorPos;
    },
    crossPos() {
      return this.$store.state.crossPos;
    },
    elem() {
      return this.$store.state.elem;
    },
    showLegend() {
      return this.$store.state.legendVisible;
    },
    verticalGuides() {
      return this.$store.state.verticalGuides;
    },
    horizontalGuides() {
      return this.$store.state.horizontalGuides;
    },
    showApp() {
      return this.$store.state.showApp;
    },
  },

  components: {
    SG_Guide,
    SG_ElementHighlighter,
    SG_CoordinatesBox,
    SG_Legend,
  },
};
</script>

<style lang="less" module>
.snapGuide {
  pointer-events: none !important;
  font-family: Menlo, Consolas, Courier, monospace !important;
  font-size: 12px !important;
  will-change: transform;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
}

.snapGuide * {
  pointer-events: none !important;
}
</style>
