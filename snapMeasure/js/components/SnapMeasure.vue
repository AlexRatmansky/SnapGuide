<template>
  <div :class=$style.snapMeasure>
    <div v-for="guide in crossGuides">
      <GuideItem v-if=guide.isVertical :is-vertical=true :x-pos=crossPos.x></GuideItem>
      <GuideItem v-else :is-vertical=false :y-pos=crossPos.y></GuideItem>
    </div>

    <div v-for="guidePos in verticalGuides">
      <GuideItem :is-vertical=true :x-pos=guidePos></GuideItem>
    </div>

    <div v-for="guidePos in horizontalGuides">
      <GuideItem :is-vertical=false :y-pos=guidePos></GuideItem>
    </div>


    <div :class=$style.counter
         :style="{ left: cursorPos.x + 10 + 'px', top: cursorPos.y + 10 + 'px'}"
    >
      <div>x: {{ cursorPos.x }}</div>
      <div>y: {{ cursorPos.y }}</div>
    </div>

    <ViewElement :element-props=elem></ViewElement>
  </div>
</template>

<script>
  import GuideItem from './GuideItem.vue';
  import ViewElement from './ViewElement.vue';
  import _ from 'lodash';

  function checkSnap(obj, xPos, yPos) {

    let bodyRect = document.body.getBoundingClientRect();
    let elemRect = obj.getBoundingClientRect();

    let top = Math.round(elemRect.top - bodyRect.top);
    let left = Math.round(elemRect.left - bodyRect.left);
    let right = left + elemRect.width;
    let bottom = top + elemRect.height;

    let newXPos = xPos;
    let newYPos = yPos;

    let isSnapped = false;
    let snapFactor = 10;

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

    function checkTop(top, y) {
      return y <= top + snapFactor && y >= top
    }
    function checkLeft(left, x) {
      return x <= left + snapFactor && x >= left
    }
    function checkRight(right, x) {
      return x >= right - snapFactor && x <= right
    }
    function checkBottom(bottom, y) {
      return y >= bottom - snapFactor && y <= bottom
    }

    return {
      xPos: newXPos,
      yPos: newYPos,
      isSnapped: isSnapped
    };
  }

  export default {

    name: 'App',

    data: function () {
      return {
        cursorPos: {
          x: '',
          y: ''
        },
        crossPos: {
          x: '',
          y: ''
        },
        elem: '',
        crossGuides: [
          {isVertical: false,},
          {isVertical: true,}
        ],
        verticalGuides: [],
        horizontalGuides: []
      }
    },

    components: {GuideItem, ViewElement},

    props: ['eventData', 'eventName'],

    methods: {
      toggleRule: function (direction) {
        let guidesArr;
        let currGuide;

        switch (direction){
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

          guidesArr.sort(function(a, b) {
            return a - b;
          });
        }


      },

      toggleVerticalRule: function () {
        this.toggleRule('vertical');
      },

      toggleHorizontalRule: function () {
        this.toggleRule('horizontal');
      }
    },

    watch: {
      eventData: function (eventObj) {
        const currElement = eventObj.path[0] || undefined;
        const snapObj = checkSnap(currElement, eventObj.pageX, eventObj.pageY);

        const bodyRect = document.body.getBoundingClientRect();
        const elemRect = currElement.getBoundingClientRect();

        this.cursorPos = {
          x: snapObj.xPos,
          y: snapObj.yPos
        };

        this.crossPos = {
          x: Math.round(this.cursorPos.x + bodyRect.left),
          y: this.cursorPos.y
        };

        let top = Math.round(elemRect.top - bodyRect.top);
        let left = Math.round(elemRect.left - bodyRect.left);

        this.elem = {
          top: top,
          left: left,
          right: left + elemRect.width,
          bottom: top + elemRect.height,
          width: elemRect.width,
          height: elemRect.height
        };

      },

      eventName: function (eventName) {
        if (this[eventName.name]) {
          this[eventName.name]()
        }
      }
    }
  }
</script>

<style module>
  .snapMeasure {
    font-family: Menlo, Consolas, Courier, monospace;
    font-size: 12px;
  }
  .counter {
    position: absolute;
    background: #BD10E0 linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1));
    color: #fff;
    padding: 5px 10px;
    border-radius: 2px;
    pointer-events: none;
    z-index: 9999;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }

  .counter {

  }
</style>