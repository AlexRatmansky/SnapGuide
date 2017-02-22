<template>
  <div :class=$style.snapMeasure>
    <div v-for="guide in crossGuides">
      <GuideItem v-if=guide.isVertical :is-vertical=true :x-pos=xPos></GuideItem>
      <GuideItem v-else :is-vertical=false :y-pos=yPos></GuideItem>
    </div>

    <div v-for="guidePos in verticalGuides">
      <GuideItem :is-vertical=true :x-pos=guidePos></GuideItem>
    </div>

    <div v-for="guidePos in horizontalGuides">
      <GuideItem :is-vertical=false :y-pos=guidePos></GuideItem>
    </div>


    <div :class=$style.counter
         :style="{ left: xPos + 10 + 'px', top: yPos + 10 + 'px'}"
    >
      <div>x: {{ xPos }}</div>
      <div>y: {{ yPos }}</div>
    </div>

    <ViewElement :element-props=elem></ViewElement>
  </div>
</template>

<script>
  import GuideItem from './GuideItem.vue';
  import ViewElement from './ViewElement.vue';
  import _ from 'lodash';

  function checkSnap(obj, xPos, yPos) {
    let top = obj.offsetTop;
    let left = obj.offsetLeft;
    let right = left + obj.offsetWidth;
    let bottom = top + obj.offsetHeight;
    let newXPos = xPos;
    let newYPos = yPos;
    let isSnapped = false;
    let snapFactor = 25;

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

    function checkTop(top, yPos) {
      return yPos <= top + snapFactor && yPos >= top
    }
    function checkLeft(left, xPos) {
      return xPos <= left + snapFactor && xPos >= left
    }
    function checkRight(right, xPos) {
      return xPos >= right - snapFactor && xPos <= right
    }
    function checkBottom(bottom, yPos) {
      return yPos >= bottom - snapFactor && yPos <= bottom
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
        xPos: '',
        yPos: '',
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
            currGuide = this.xPos;
            break;
          case 'horizontal':
            guidesArr = this.horizontalGuides;
            currGuide = this.yPos;
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
        let snapObj = checkSnap(currElement, eventObj.pageX, eventObj.pageY);

        // console.log(eventObj.path);

        this.xPos = snapObj.xPos;
        this.yPos = snapObj.yPos;

        this.elem = {
          top: currElement.offsetTop + 'px',
          left: currElement.offsetLeft + 'px',
          width: currElement.offsetWidth + 'px',
          height: currElement.offsetHeight + 'px'
        }
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