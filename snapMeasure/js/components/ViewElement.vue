<template>
  <div class="element"
       :style="{
      top: elementProps.top,
      left: elementProps.left,
      width: elementProps.width,
      height: elementProps.height
      }"
  ></div>
</template>

<script>
  export default {
    name: 'ViewElement',
    props: ['elementProps']
  };
</script>