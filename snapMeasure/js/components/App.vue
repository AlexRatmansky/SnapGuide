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
    components: {GuideItem, ViewElement},
    props: ['guides', 'yPos', 'xPos', 'elem']
  }
</script>