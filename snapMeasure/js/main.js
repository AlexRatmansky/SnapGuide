import Vue from 'vue'
import SnapMeasure from './components/SnapMeasure.vue'
import _throttle from 'lodash/throttle'

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
      App.eventName = {
        name: 'addVerticalRule'
      };
      break;

    // h - for horizontal
    case 104:
      App.eventName = {
        name: 'addHorizontalRule'
      };
      break;

    default:
      break;
  }

  console.log(e);
};

passEventData = _throttle(passEventData, 50);

function passEventData(eventData) {
  App.eventData = eventData;
}