import Vue from 'vue'
import SnapMeasure from './components/SnapMeasure.vue'

let App = new Vue({

  el: '#app',

  data: {
    eventData: '',
    eventName: ''
  },

  template: '<SnapMeasure :event-data=eventData :event-name=eventName />',

  components: { SnapMeasure }
});

document.onmousemove = function (e) {
  passEventData(e);
};

document.onkeypress = function (e) {

  switch (e.keyCode) {
    // v - for vertical
    case 118:
      App.eventName = 'addVerticalRule';
      break;

    // h - for horizontal
    case 104:
      App.eventName = 'addHorizontalRule';
      break;

    default:
      break;
  }

  console.log(e);
};


passEventData = throttle(passEventData, 20);

function passEventData(eventData) {
  App.eventData = eventData;
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