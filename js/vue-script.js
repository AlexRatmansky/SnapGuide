document.body.addEventListener('touchmove', e => e.preventDefault());

Vue.component('view-template', {
  template: '#view-template',
  props: ['xPos', 'yPos', 'guides']
});

Vue.component('guide-item', {
  template: '#view-guide',
  props: ['isVertical', 'isHorisontal', 'yPos', 'xPos']
});

new Vue({
  el: '#app',
  data: {
    xPos: '0',
    yPos: '0',
    guides: [
      {
        isVertical: false,
        isHorisontal: true
      },
      {
        isVertical: true,
        isHorisontal: false
      }
    ]
  },
  methods: {
    onDrag: function (e) {
      this.xPos = e.pageX;
      this.yPos = e.pageY;
    },
  }

});