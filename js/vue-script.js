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

document.onmousemove = function (e) {
  passEventData(e);
};

passEventData = throttle(passEventData, 20);

function passEventData(eventData) {
  vv.event = eventData;
}

function throttle(func, ms) {

  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {

    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}