<template>
  <div>
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


    <div :class="$style.counter"
         :style="{ left: xPos + 10 + 'px', top: yPos + 10 + 'px'}"
    >
      <div>&nbsp;x: {{ xPos }}</div>
      <div>&nbsp;y: {{ yPos }}</div>
    </div>

    <ViewElement :element-props=elem></ViewElement>
  </div>
</template>

<script>
  import GuideItem from './GuideItem.vue';
  import ViewElement from './ViewElement.vue';

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
      if (yPos <= top + snapFactor && yPos >= top) return true
    }
    function checkLeft(left, xPos) {
      if (xPos <= left + snapFactor && xPos >= left) return true
    }
    function checkRight(right, xPos) {
      if (xPos >= right - snapFactor && xPos <= right) return true
    }
    function checkBottom(bottom, yPos) {
      if (yPos >= bottom - snapFactor && yPos <= bottom) return true
    }

    console.log(isSnapped);

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
      addVerticalRule: function () {
        this.verticalGuides.push(this.xPos)
      },
      addHorizontalRule: function () {
        this.horizontalGuides.push(this.yPos)
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
  .counter {
    position: absolute;
    background-color: green;
    color: yellow;
    padding: 5px 10px;
    transition: all 0.25s cubic-bezier(0, 1.5, 1, 1);
    pointer-events: none;
    z-index: 101;
  }
</style>