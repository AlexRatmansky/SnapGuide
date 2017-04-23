<template>
  <div :class=$style.snapGuide>

    <GuideItem :is-vertical=true :x-pos=crossPos.x :cross-guide=true :scroll-position=scrollPosition ></GuideItem>
    <GuideItem :is-vertical=false :y-pos=crossPos.y :cross-guide=true :scroll-position=scrollPosition ></GuideItem>

    <template v-for="(guidePos, index) in verticalGuides">
      <GuideItem
        :is-vertical=true
        :x-pos=guidePos
        :previous-guide=verticalGuides[index-1]
        :scroll-position=scrollPosition
      ></GuideItem>

      <template v-if="index > 0">
        <GuideSizer
          :position=verticalGuides[index-1]
          :size=guidePos-verticalGuides[index-1]
          :is-vertical=true
        ></GuideSizer>
      </template>

    </template>

    <template v-for="(guidePos, index) in horizontalGuides">
      <GuideItem
        :is-vertical=false
        :y-pos=guidePos
        :previous-guide=horizontalGuides[index-1]
        :scroll-position=scrollPosition
      ></GuideItem>

      <template v-if="index > 0">
        <GuideSizer
          :position=horizontalGuides[index-1]
          :size=guidePos-horizontalGuides[index-1]
          :is-vertical=false
        ></GuideSizer>
      </template>

    </template>

    <CoordinatesItem :cursor-pos=cursorPos></CoordinatesItem>

    <ViewElement :element-props=elem></ViewElement>

    <Legend v-if="showLegend"></Legend>

  </div>
</template>

<script>
  import GuideItem from './GuideItem.vue';
  import ViewElement from './ViewElement.vue';
  import CoordinatesItem from './CoordinatesItem.vue';
  import GuideSizer from './GuideSizer.vue';
  import Legend from './Legend.vue';
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
        elem: '',
        crossGuides: [
          {isVertical: false,},
          {isVertical: true,}
        ],
        verticalGuides: [263, 278, 1071, 1103],
        horizontalGuides: [64, 244, 409],
        showLegend: true
      }
    },

    components: {GuideItem, ViewElement, CoordinatesItem, GuideSizer, Legend},

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
      },

      toggleVerticalRule: function () {
        this.toggleRule('vertical');
      },

      toggleHorizontalRule: function () {
        this.toggleRule('horizontal');
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
          const snapObj = checkSnap(currElement, data.pageX, data.pageY);

          const bodyRect = document.body.getBoundingClientRect();
          const elemRect = currElement.getBoundingClientRect();

          const elemStyles = window.getComputedStyle(currElement);

          this.cursorPos = {
            x: snapObj.xPos,
            y: snapObj.yPos
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
    font-family: Menlo, Consolas, Courier, monospace;
    font-size: 12px;
  }
</style>