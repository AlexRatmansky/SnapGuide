<template>
  <div>
    <div v-for="guide in guides">
      <GuideItem v-if=guide.isVertical :is-vertical=true :x-pos=xPos></GuideItem>
      <GuideItem v-else :is-vertical=false :y-pos=yPos></GuideItem>
    </div>

    <div class="counter"
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
    data () {
      return {
        xPos: '',
        yPos: '',
        elem: '',
        guides: [
          {isVertical: false,},
          {isVertical: true,}
        ]
      }
    },
    components: {GuideItem, ViewElement},
    props: ['event'],
    watch: {
      event: function (eventObj) {
        const currElement = eventObj.path[0] || undefined;

        this.xPos = eventObj.pageX;
        this.yPos = eventObj.pageY;
        this.elem = {
          top: currElement.offsetTop + 'px',
          left: currElement.offsetLeft + 'px',
          width: currElement.offsetWidth + 'px',
          height: currElement.offsetHeight + 'px'
        }
      }
    }
  }
</script>