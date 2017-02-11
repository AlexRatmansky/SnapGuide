import Vue from 'vue'
import App from './components/App.vue'

let vv = new Vue({
  el: '#app',
  data: {
    event: ''
  },
  template: '<App :event=event />',
  components: { App }
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