import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    horizontalPoints: [],
    verticalPoints: [],
    count: 0,

    scrollPosition: {
      scrollTop: 0,
      scrollLeft: 0
    },
    windowSize: {
      width: 0,
      height: 0
    }
  },
  mutations: {
    increment: (state) => {
      state.count++
    },

    updateScrollPosition: (state, scrollPosition) => {
      state.scrollPosition.scrollTop = scrollPosition.scrollTop;
      state.scrollPosition.scrollLeft = scrollPosition.scrollLeft;
    },

    updateWindowSize: (state, windowSize) => {
      state.windowSize.width = windowSize.width;
      state.windowSize.height = windowSize.height;
    }
  },
})