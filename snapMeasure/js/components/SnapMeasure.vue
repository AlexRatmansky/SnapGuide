<template>
  <div>
    <div v-for="guide in crossGuides">
      <GuideItem v-if=guide.isVertical :is-vertical=true :x-pos=xPos></GuideItem>
      <GuideItem v-else :is-vertical=false :y-pos=yPos></GuideItem>
    </div>

    <div v-for="guide in guides">
      <GuideItem v-if=guide.isVertical :is-vertical=true :x-pos=guide.xPos></GuideItem>
      <GuideItem v-else :is-vertical=false :y-pos=guide.yPos></GuideItem>
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
        guides: []
      }
    },

    components: {GuideItem, ViewElement},

    props: ['eventData', 'eventName'],

    methods: {
      addVerticalRule: function () {
        this.guides.push({
          isVertical: true,
          xPos: this.xPos
        })
      },
      addHorizontalRule: function () {
        this.guides.push({
          isVertical: false,
          yPos: this.yPos
        })
      }
    },

    watch: {
      eventData: function (eventObj) {
        const currElement = eventObj.path[0] || undefined;

        this.xPos = eventObj.pageX;
        this.yPos = eventObj.pageY;
        this.elem = {
          top: currElement.offsetTop + 'px',
          left: currElement.offsetLeft + 'px',
          width: currElement.offsetWidth + 'px',
          height: currElement.offsetHeight + 'px'
        }
      },
      eventName: function (eventName) {
        if (this[eventName]) {
          this[eventName]()
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