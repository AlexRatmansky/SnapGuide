<template>
  <div :class=$style.snapGuide>

    <GuideItem :is-vertical=true :x-pos=crossPos.x :cross-guide=true :scroll-position=scrollPosition />
    <GuideItem :is-vertical=false :y-pos=crossPos.y :cross-guide=true :scroll-position=scrollPosition />

    <template v-for="(guidePos, index) in verticalGuides">
      <GuideItem
        :is-vertical=true
        :x-pos=guidePos
        :previous-guide=verticalGuides[index-1]
        :scroll-position=scrollPosition
      />

      <template v-if="index > 0">
        <GuideSizer
          :position=verticalGuides[index-1]
          :size=guidePos-verticalGuides[index-1]
          :is-vertical=true
        />
      </template>

    </template>

    <template v-for="(guidePos, index) in horizontalGuides">
      <GuideItem
        :is-vertical=false
        :y-pos=guidePos
        :previous-guide=horizontalGuides[index-1]
        :scroll-position=scrollPosition
      />

      <template v-if="index > 0">
        <GuideSizer
          :position=horizontalGuides[index-1]
          :size=guidePos-horizontalGuides[index-1]
          :is-vertical=false
        />
      </template>

    </template>

    <CoordinatesItem :cursor-pos=cursorPos></CoordinatesItem>

    <ViewElement :element-props=elem></ViewElement>

  </div>
</template>

<script>
  import GuideItem from './GuideItem.vue';
  import ViewElement from './ViewElement.vue';
  import CoordinatesItem from './CoordinatesItem.vue';
  import GuideSizer from './GuideSizer.vue';
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
        horizontalGuides: [64, 244, 409]
      }
    },

    components: {GuideItem, ViewElement, CoordinatesItem, GuideSizer},

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

  function checkSnap(element, xPos, yPos) {

    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = element.getBoundingClientRect();
    const elemStyles = window.getComputedStyle(element);

    const paddingTop = parseInt(elemStyles.paddingTop);
    const paddingLeft = parseInt(elemStyles.paddingLeft);
    const paddingRight = parseInt(elemStyles.paddingRight);
    const paddingBottom = parseInt(elemStyles.paddingBottom);

    const top = Math.round(elemRect.top - bodyRect.top);
    const left = Math.round(elemRect.left - bodyRect.left);
    const right = left + elemRect.width;
    const bottom = top + elemRect.height;

    let newXPos = xPos;
    let newYPos = yPos;

    let isSnapped = false;
    const snapFactor = 5;

    if (checkTop(top, yPos)) {
      newYPos = top;
      isSnapped = true;
    }
    if (checkLeft(left, xPos)) {
      newXPos = left;
      isSnapped = true;
    }
    if (checkRight(right, xPos)) {
      newXPos = right;
      isSnapped = true;
    }
    if (checkBottom(bottom, yPos)) {
      newYPos = bottom;
      isSnapped = true;
    }
    if (checkTop(top + paddingTop, yPos)) {
      newYPos = top + paddingTop;
      isSnapped = true;
    }
    if (checkLeft(left + paddingLeft, xPos)) {
      newXPos = left + paddingLeft;
      isSnapped = true;
    }
    if (checkRight(right - paddingRight, xPos)) {
      newXPos = right - paddingRight;
      isSnapped = true;
    }
    if (checkBottom(bottom - paddingBottom, yPos)) {
      newYPos = bottom - paddingBottom;
      isSnapped = true;
    }

    function checkTop(top, y) {
      return y <= top + snapFactor && y >= top - snapFactor
    }

    function checkLeft(left, x) {
      return x <= left + snapFactor && x >= left - snapFactor
    }

    function checkRight(right, x) {
      return x >= right - snapFactor && x <= right + snapFactor
    }

    function checkBottom(bottom, y) {
      return y >= bottom - snapFactor && y <= bottom + snapFactor
    }

    return {
      xPos: newXPos,
      yPos: newYPos,
      isSnapped: isSnapped
    };
  }

</script>

<style module>
  .snapGuide {
    font-family: Menlo, Consolas, Courier, monospace;
    font-size: 12px;
  }
</style>