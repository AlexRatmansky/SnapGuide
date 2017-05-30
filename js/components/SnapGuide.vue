<template>
  <div v-if=showApp :class=$style.snapGuide>

    <SG_Guide :is-vertical=true :position=crossPos.x :cross-guide=true :scroll-position=scrollPosition></SG_Guide>
    <SG_Guide :is-vertical=false :position=crossPos.y :cross-guide=true :scroll-position=scrollPosition></SG_Guide>

    <transition-group name="list_vert" tag="div">
      <SG_Guide v-for="guidePos in verticalGuides"
                :key=guidePos.position
                :position=guidePos.position
                :scroll-position=scrollPosition
                :is-vertical=true
      ></SG_Guide>
    </transition-group>
    <template v-for="sizer in verticalGuidesSizer">
      <SG_GuideSizer
        :start=sizer.start
        :end=sizer.end
        :scroll-position=scrollPosition
        :is-vertical=true
      ></SG_GuideSizer>
    </template>

    <transition-group name="list_hor" tag="div">
      <SG_Guide v-for="guidePos in horizontalGuides"
                :key=guidePos.position
                :position=guidePos.position
                :scroll-position=scrollPosition
                :is-vertical=false
      ></SG_Guide>
    </transition-group>
    <template v-for="sizer in horizontalGuidesSizer">
      <SG_GuideSizer
        :start=sizer.start
        :end=sizer.end
        :scroll-position=scrollPosition
        :is-vertical=false
      ></SG_GuideSizer>
    </template>

    <SG_CoordinatesBox
      :cursor-pos=cursorPos
      :scroll-position=scrollPosition
    ></SG_CoordinatesBox>

    <SG_ElementHighlighter :element-props=elem :scroll-position=scrollPosition></SG_ElementHighlighter>

    <SG_Legend v-if=showLegend></SG_Legend>

  </div>
</template>

<script>
  import SG_Guide from './SG_Guide.vue';
  import SG_ElementHighlighter from './SG_ElementHighlighter.vue';
  import SG_CoordinatesBox from './SG_CoordinatesBox.vue';
  import SG_GuideSizer from './SG_GuideSizer.vue';
  import SG_Legend from './SG_Legend.vue';
  import {checkSnap} from '../helpers/snapping'
  import {CONFIG} from "../config";
  import _ from 'lodash';

  export default {

    name: 'App',

    data: function () {
      return {
        showApp: true,
        cursorPos: {
          x: 0,
          y: 0
        },
        crossPos: {
          x: 0,
          y: 0
        },
        elem: {},
        crossGuides: [
          {isVertical: false},
          {isVertical: true}
        ],
        verticalGuides: CONFIG.VERTICAL_GUIDES || [],
        horizontalGuides: CONFIG.HORIZONTAL_GUIDES || [],
        verticalGuidesSizer: CONFIG.VERTICAL_GUIDES_SIZER || [],
        horizontalGuidesSizer: CONFIG.HORIZONTAL_GUIDES_SIZER || [],
        showLegend: true
      }
    },

    components: {SG_Guide, SG_GuideSizer, SG_ElementHighlighter, SG_CoordinatesBox, SG_Legend},

    props: ['eventData', 'eventName', 'scrollPosition', 'windowSize'],

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
              this.verticalGuides = _.sortBy(guidesArr, ['position']);
              break;
            case 'horizontal':
              this.horizontalGuides = _.sortBy(guidesArr, ['position']);
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
        let guidesArr;
        let guidesMeasuresArr = [];
        let i = 0;

        switch (direction) {
          case 'vertical':
            guidesArr = this.verticalGuides;
            break;
          case 'horizontal':
            guidesArr = this.horizontalGuides;
            break;
        }

        while (i + 1 < guidesArr.length) {
          guidesMeasuresArr.push({
            start: guidesArr[i].position,
            end: guidesArr[i + 1].position
          });
          i++;
        }

        switch (direction) {
          case 'vertical':
            this.verticalGuidesSizer = guidesMeasuresArr;
            break;
          case 'horizontal':
            this.horizontalGuidesSizer = guidesMeasuresArr;
            break;
        }

      },

      cleanGuides: function () {
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
      eventData: function (data) {

        if (data !== undefined) {
          const currElement = data.path[0] || undefined;
          const bodyRect = document.body.getBoundingClientRect();
          const elemRect = currElement.getBoundingClientRect();
          const elemStyles = window.getComputedStyle(currElement);

          const snapObj = checkSnap({
            elem: currElement,
            elemRect: elemRect,
            bodyRect: bodyRect,
            cursorPosX: data.pageX,
            cursorPosY: data.pageY,
            elemStyles: elemStyles
          });


          this.cursorPos = {
            x: Math.round(snapObj.xPos),
            y: Math.round(snapObj.yPos)
          };

          this.crossPos = {
            x: Math.round(this.cursorPos.x + bodyRect.left),
            y: Math.round(this.cursorPos.y + bodyRect.top),
          };

          let left = Math.round(elemRect.left - bodyRect.left);
          let top = Math.round(elemRect.top - bodyRect.top);

          this.elem = {
            top: top,
            left: left,
            right: left + elemRect.width,
            bottom: top + elemRect.height,
            width: elemRect.width,
            height: elemRect.height,
            style: {
              paddingTop: elemStyles.paddingTop,
              paddingLeft: elemStyles.paddingLeft,
              paddingRight: elemStyles.paddingRight,
              paddingBottom: elemStyles.paddingBottom
            }
          };
        }
      },

      scrollPosition: function (data) {
        console.log('scroll', data);
      },

      windowSize: function (data) {
        console.log('resize', data);
      },

      eventName: function (data) {
        if (this[data.name]) {
          this[data.name](data)
        }
      }
    }
  }
</script>

<style lang="stylus" module>
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
    z-index: 9999;
  }

  .snapGuide * {
    pointer-events: none !important;
  }
</style>