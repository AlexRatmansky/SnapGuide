import Vue from 'vue'
import SnapMeasure from './components/SnapMeasure.vue'
import _ from 'lodash';

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

  switch (e.code) {
    // v - for vertical
    case 'KeyV':
      App.eventName = {
        name: 'addVerticalRule'
      };
      break;

    // h - for horizontal
    case 'KeyH':
      App.eventName = {
        name: 'addHorizontalRule'
      };
      break;

    default:
      break;
  }

  console.log(e);
};

passEventData = _.throttle(passEventData, 50);

function passEventData(eventData) {
  App.eventData = eventData;
}