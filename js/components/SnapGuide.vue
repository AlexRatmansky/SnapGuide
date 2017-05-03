<template>
  <div :class=$style.snapGuide>

    <GuideItem :is-vertical=true :x-pos=crossPos.x :cross-guide=true :scroll-position=scrollPosition ></GuideItem>
    <GuideItem :is-vertical=false :y-pos=crossPos.y :cross-guide=true :scroll-position=scrollPosition ></GuideItem>

    <template v-for="guidePos in verticalGuides">
      <GuideItem
        :x-pos=guidePos
        :scroll-position=scrollPosition
        :is-vertical=true
      ></GuideItem>
    </template>
    <template v-for="sizer in verticalGuidesSizer">
      <GuideSizer
          :start=sizer.start
          :end=sizer.end
          :scroll-position=scrollPosition
          :is-vertical=true
        ></GuideSizer>
    </template>

    <template v-for="guidePos in horizontalGuides">
      <GuideItem
        :y-pos=guidePos
        :scroll-position=scrollPosition
        :is-vertical=false
      ></GuideItem>
    </template>
    <template v-for="sizer in horizontalGuidesSizer">
      <GuideSizer
        :start=sizer.start
        :end=sizer.end
        :scroll-position=scrollPosition
        :is-vertical=false
      ></GuideSizer>
    </template>

    <CoordinatesItem :cursor-pos=cursorPos></CoordinatesItem>

    <ViewElement :element-props=elem></ViewElement>

    <LegendBoard v-if=showLegend></LegendBoard>

  </div>
</template>

<script>
  import GuideItem from './GuideItem.vue';
  import ViewElement from './ViewElement.vue';
  import CoordinatesItem from './CoordinatesItem.vue';
  import GuideSizer from './GuideSizer.vue';
  import LegendBoard from './LegendBoard.vue';
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
        horizontalGuidesSizer: [],
        showLegend: true
      }
    },

    components: {GuideItem, GuideSizer, ViewElement, CoordinatesItem, LegendBoard},

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

<style module>
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
  }
  .snapGuide * {
    pointer-events: none;
  }
</style>