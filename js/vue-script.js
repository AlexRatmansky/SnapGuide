document.body.addEventListener('touchmove', e => e.preventDefault());

Vue.component('guide-item', {
  template: '#view-template',
  props: ['xPos', 'yPos']
});

new Vue({
  el: '#app',
  data: {
    xPos: "0",
    yPos: "0"
  },
  methods: {
    onDrag: function (e) {
      this.xPos = e.pageX;
      this.yPos = e.pageY;
    },
  }

});