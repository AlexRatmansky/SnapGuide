import Vue from 'vue'
import SnapMeasure from './components/SnapMeasure.vue'
import _ from 'lodash';

let rootEl = document.createElement('div');
rootEl.id = 'app';
document.body.appendChild(rootEl);

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
  e.preventDefault();

  switch (e.code) {
    // v - for vertical
    case 'KeyV':
      App.eventName = {
        name: 'toggleVerticalRule'
      };
      break;

    // h - for horizontal
    case 'KeyH':
      App.eventName = {
        name: 'toggleHorizontalRule'
      };
      break;

    default:
      break;
  }
};

passEventData = _.throttle(passEventData, 50);

function passEventData(eventData) {
  App.eventData = eventData;
}