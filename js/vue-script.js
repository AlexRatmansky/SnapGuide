Vue.component('view-template', {
  template: '#view-template',
  props: ['xPos', 'yPos', 'guides']
});

Vue.component('guide-item', {
  template: '#guide-item',
  props: ['isVertical', 'yPos', 'xPos']
});

vv = new Vue({
  el: '#app',
  data: {
    event: '',
    xPos: '',
    yPos: '',
    guides: [
      {
        isVertical: false,
      },
      {
        isVertical: true,
      }
    ]
  },
  watch: {
    event: function (eventObj) {
      this.xPos = eventObj.pageX;
      this.yPos = eventObj.pageY;
    }
  }
});

document.onmousemove = function(e){
  vv.event = e;
};