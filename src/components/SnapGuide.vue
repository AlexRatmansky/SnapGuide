<template>
  <div inert v-if=showApp :class=$style.snapGuide>

    <SG_Guide :is-vertical=true :position=crossPos.x :cross-guide=true />
    <SG_Guide :is-vertical=false :position=crossPos.y :cross-guide=true />

    <transition-group name="list_vert" tag="div">
      <SG_Guide v-for="guidePos in verticalGuides"
                :key=guidePos.position
                :position=guidePos.position
                :is-vertical=true
      />
    </transition-group>

    <template v-for="sizer in verticalGuidesSizer">
      <SG_GuideSizer
        :key=sizer.id
        :start=sizer.start
        :end=sizer.end
        :is-vertical=true
        :cursor-position=crossPos.x
      />
    </template>

    <transition-group name="list_hor" tag="div">
      <SG_Guide v-for="guidePos in horizontalGuides"
                :key=guidePos.position
                :position=guidePos.position
                :is-vertical=false
      />
    </transition-group>
    <template v-for="sizer in horizontalGuidesSizer">
      <SG_GuideSizer
        :key=sizer.id
        :start=sizer.start
        :end=sizer.end
        :is-vertical=false
        :cursor-position=crossPos.y
      />
    </template>

    <SG_CoordinatesBox :cursor-pos=cursorPos />

    <SG_ElementHighlighter :element-props=elem />

    <SG_Legend v-if=showLegend />
  </div>
</template>

<script>
  import SG_Guide from './SG_Guide.vue';
  import SG_ElementHighlighter from './SG_ElementHighlighter.vue';
  import SG_CoordinatesBox from './SG_CoordinatesBox.vue';
  import SG_GuideSizer from './SG_GuideSizer.vue';
  import SG_Legend from './SG_Legend.vue';
  import { generateGuideMeasures } from '../helpers/guides';
  import { CONFIG } from '../config';
  import _ from 'lodash';

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
      }

    },

    data: function () {
      return {
        showApp: true,
        crossGuides: [ { isVertical: false }, { isVertical: true } ],
        verticalGuides: (DEV_MODE && CONFIG.VERTICAL_GUIDES) || [],
        horizontalGuides: (DEV_MODE && CONFIG.HORIZONTAL_GUIDES) || [],
        verticalGuidesSizer: (DEV_MODE && CONFIG.VERTICAL_GUIDES_SIZER) || [],
        horizontalGuidesSizer: (DEV_MODE && CONFIG.HORIZONTAL_GUIDES_SIZER) || []
      };
    },

    components: {
      SG_Guide,
      SG_GuideSizer,
      SG_ElementHighlighter,
      SG_CoordinatesBox,
      SG_Legend
    },

    props: [ 'eventName' ],

    methods: {
      toggleRule: function (direction) {
        let guidesArr;
        let currGuidePosition;

        switch (direction) {
          case 'vertical':
            guidesArr = this.verticalGuides;
            currGuidePosition = this.cursorPos.x;
            break;
          case 'horizontal':
            guidesArr = this.horizontalGuides;
            currGuidePosition = this.cursorPos.y;
            break;
        }

        let currGuidePositionInArray = _.findIndex(guidesArr, function (guide) {
          return guide.position === currGuidePosition;
        });

        if (currGuidePositionInArray >= 0) {
          _.pullAt(guidesArr, currGuidePositionInArray);
        } else {
          guidesArr.push({
            position: currGuidePosition,
            isNew: true
          });

          switch (direction) {
            case 'vertical':
              this.verticalGuides = _.sortBy(guidesArr, [ 'position' ]);
              break;
            case 'horizontal':
              this.horizontalGuides = _.sortBy(guidesArr, [ 'position' ]);
              break;
          }
        }

        this.generateGuideMeasures(direction);
      },

      toggleVerticalRule: function () {
        this.toggleRule('vertical');
      },

      toggleHorizontalRule: function () {
        this.toggleRule('horizontal');
      },

      generateGuideMeasures: function (direction) {
        switch (direction) {
          case 'vertical':
            this.verticalGuidesSizer = generateGuideMeasures(this.verticalGuides);
            break;
          case 'horizontal':
            this.horizontalGuidesSizer = generateGuideMeasures(this.horizontalGuides);
            break;
        }
      },

      clearGuides: function () {
        this.verticalGuides = [];
        this.horizontalGuides = [];
        this.verticalGuidesSizer = [];
        this.horizontalGuidesSizer = [];
      },

      toggleLegend: function () {
        this.showLegend = !this.showLegend;
      },

      toggleActive: function () {
        this.showApp = !this.showApp;
      },

      arrowPositioning: function (data) {
        let step = data.shiftKey ? 10 : 1;

        switch (data.direction) {
          case 'up':
            this.crossPos.y -= step;
            this.cursorPos.y -= step;
            break;
          case 'down':
            this.crossPos.y += step;
            this.cursorPos.y += step;
            break;
          case 'left':
            this.crossPos.x -= step;
            this.cursorPos.x -= step;
            break;
          case 'right':
            this.crossPos.x += step;
            this.cursorPos.x += step;
            break;
        }
      }
    },

    watch: {
      eventName: function (data) {
        if (this[ data.name ]) {
          this[ data.name ](data);
        }
      }
    }
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