<template>
  <div class="guide"
       :class="{ '-v': isVertical, '-h': !isVertical }"
       :style="{ left: xPos + 'px', top: yPos + 'px'}"
  ></div>
</template>

<script>
  export default {
    name: 'GuideItem',
    props: ['isVertical', 'yPos', 'xPos']
  };
</script>