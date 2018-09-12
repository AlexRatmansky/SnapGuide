import Vue from 'vue'
import Vuex from 'vuex'
import { checkSnap } from "../helpers/snapping";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    horizontalPoints: [],
    verticalPoints: [],
    count: 0,

    cursorPos: {
      x: 0,
      y: 0
    },
    crossPos: {
      x: 0,
      y: 0
    },
    elem: undefined,

    scrollPosition: {
      scrollTop: window.pageYOffset,
      scrollLeft: window.pageXOffset
    },
    windowSize: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  mutations: {
    increment: (state) => {
      state.count++
    },

    updateMousePosition: (state, eventData) => {
        if (eventData === undefined) return;

        console.dir(eventData);

        const currElement = eventData.path[ 0 ] || undefined;
        const bodyRect = document.body.getBoundingClientRect();
        const elemRect = currElement.getBoundingClientRect();
        const elemStyles = window.getComputedStyle(currElement);

        const snapObj = checkSnap({
          elem: currElement,
          elemRect: elemRect,
          bodyRect: bodyRect,
          cursorPosX: eventData.pageX,
          cursorPosY: eventData.pageY,
          elemStyles: elemStyles
        });

        state.cursorPos = {
          x: Math.round(snapObj.xPos),
          y: Math.round(snapObj.yPos)
        };

        state.crossPos = {
          x: Math.round(Math.round(snapObj.xPos) + bodyRect.left),
          y: Math.round(Math.round(snapObj.yPos) + bodyRect.top)
        };

        let left = Math.round(elemRect.left - bodyRect.left);
        let top = Math.round(elemRect.top - bodyRect.top);

        state.elem = {
          top: top,
          left: left,
          right: left + elemRect.width,
          bottom: top + elemRect.height,
          width: elemRect.width,
          height: elemRect.height,
          style: {
            paddingTop: elemStyles.paddingTop,
            paddingLeft: elemStyles.paddingLeft,
            paddingRight: elemStyles.paddingRight,
            paddingBottom: elemStyles.paddingBottom
          }
        };
    },

    updateScrollPosition: (state, scrollPosition) => {
      state.scrollPosition = Object.assign({}, scrollPosition);
    },

    updateWindowSize: (state, windowSize) => {
      state.windowSize = Object.assign({}, windowSize);
    }
  },
})