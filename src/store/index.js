import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    horizontalPoints: [],
    verticalPoints: [],
    count: 0,

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

    updateScrollPosition: (state, scrollPosition) => {
      state.scrollPosition = Object.assign({}, scrollPosition);
    },

    updateWindowSize: (state, windowSize) => {
      state.windowSize = Object.assign({}, windowSize);
    }
  },
})