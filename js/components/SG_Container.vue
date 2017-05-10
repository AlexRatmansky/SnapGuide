<template>
  <div :class=$style.snapGuide>

    <SG_Guide :is-vertical=true :x-pos=crossPos.x :cross-guide=true :scroll-position=scrollPosition ></SG_Guide>
    <SG_Guide :is-vertical=false :y-pos=crossPos.y :cross-guide=true :scroll-position=scrollPosition ></SG_Guide>

    <template v-for="guidePos in verticalGuides">
      <SG_Guide
        :x-pos=guidePos
        :scroll-position=scrollPosition
        :is-vertical=true
      ></SG_Guide>
    </template>
    <template v-for="sizer in verticalGuidesSizer">
      <SG_GuideSizer
          :start=sizer.start
          :end=sizer.end
          :scroll-position=scrollPosition
          :is-vertical=true
        ></SG_GuideSizer>
    </template>

    <template v-for="guidePos in horizontalGuides">
      <SG_Guide
        :y-pos=guidePos
        :scroll-position=scrollPosition
        :is-vertical=false
      ></SG_Guide>
    </template>
    <template v-for="sizer in horizontalGuidesSizer">
      <SG_GuideSizer
        :start=sizer.start
        :end=sizer.end
        :scroll-position=scrollPosition
        :is-vertical=false
      ></SG_GuideSizer>
    </template>

    <SG_CoordinatesBox :cursor-pos=cursorPos></SG_CoordinatesBox>

    <SG_ElementHighlighter :element-props=elem></SG_ElementHighlighter>

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
  import _ from 'lodash';

  export default {

    name: 'App',

    data: function () {
      return {
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
        verticalGuides: [263, 278, 1071, 1103],
        horizontalGuides: [64, 244, 409],
        verticalGuidesSizer: [{start: 300, end: 555}],
        horizontalGuidesSizer: [{start: 300, end: 555}],
        showLegend: true
      }
    },

    components: {SG_Guide, SG_GuideSizer, SG_ElementHighlighter, SG_CoordinatesBox, SG_Legend},

    props: ['eventData', 'eventName', 'scrollPosition', 'windowSize'],

    methods: {
      toggleRule: function (direction) {
        let guidesArr;
        let currGuide;

        switch (direction) {
          case 'vertical':
            guidesArr = this.verticalGuides;
            currGuide = this.cursorPos.x;
            break;
          case 'horizontal':
            guidesArr = this.horizontalGuides;
            currGuide = this.cursorPos.y;
            break;
        }

        if (guidesArr.indexOf(currGuide) >= 0) {
          _.pull(guidesArr, currGuide)
        } else {
          guidesArr.push(currGuide);

          guidesArr.sort(function (a, b) {
            return a - b;
          });
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
            start: guidesArr[i],
            end: guidesArr[i + 1]
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
    pointer-events: none;
    font-family: Menlo, Consolas, Courier, monospace;
    font-size: 12px;
    will-change: transform;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
  }
  .snapGuide * {
    pointer-events: none;
  }
</style>